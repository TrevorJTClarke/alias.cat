use std::convert::{TryFrom};

use near_sdk::{
    near_bindgen,
    borsh::{self, BorshDeserialize, BorshSerialize},
    collections::{ UnorderedMap },
    json_types::{ ValidAccountId, Base64VecU8 },
    AccountId,
    Balance,
    Promise,
    PanicOnDefault,
    BorshStorageKey,
    serde::{Deserialize, Serialize},
    env,
    log,
    StorageUsage,
};

near_sdk::setup_alloc!();

pub const ONE_NEAR: u128 = 1_000_000_000_000_000_000_000_000;
/// 0.02 N
pub const ALLOWANCE: u128 = 20_000_000_000_000_000_000_000;

#[derive(BorshStorageKey, BorshSerialize)]
pub enum StorageKeys {
    Accounts,
}

#[derive(BorshDeserialize, BorshSerialize, Serialize, Deserialize, PanicOnDefault)]
#[serde(crate = "near_sdk::serde")]
pub struct Account {
    // 16x16, 32x32, 64x64, 128x128
    pub icon: Option<Vec<u8>>,
    // "aa"
    pub initials: Option<Vec<u8>>,
    // rgba
    pub color: Option<Vec<u8>>,
}

#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize, PanicOnDefault)]
pub struct Alias {
    pub accounts: UnorderedMap<AccountId, Account>,
    pub base_fee: Balance,
    pub base_storage_usage: StorageUsage,
}

#[near_bindgen]
impl Alias {
    /// ```bash
    /// near call alias.in.testnet new --accountId alias.in.testnet
    /// ```
    #[init]
    pub fn new() -> Self {
        assert!(!env::state_exists(), "The contract is already initialized");
        let mut this = Alias {
            accounts: UnorderedMap::new(StorageKeys::Accounts),
            base_fee: ONE_NEAR / 4,
            base_storage_usage: 0,
        };
        this.measure_account_storage_usage();
        this
    }

    /// Measure the storage an agent will take and need to provide
    fn measure_account_storage_usage(&mut self) {
        let initial_storage_usage = env::storage_usage();
        // Create a temporary, dummy entry and measure the storage used.
        let tmp_account_id = "z".repeat(64);
        let tmp_account = Account {
            icon: Some(vec![255u8; 1024]),
            initials: Some(b"zz".to_vec()),
            color: Some(vec![255u8; 4]),
        };
        self.accounts.insert(&tmp_account_id, &tmp_account);
        self.base_storage_usage = env::storage_usage() - initial_storage_usage;
        // Remove the temporary entry.
        self.accounts.remove(&tmp_account_id);
    }

    /// Adds an access key so the user can sign via frontends with HUGE payloads
    ///
    /// ```bash
    /// near call alias.in.testnet register '{}' --accountId your_account.testnet --amount 1
    /// ```
    #[payable]
    pub fn register(&mut self) -> Promise {
        let required_storage_balance = Balance::from(self.base_storage_usage) * env::storage_byte_cost();
        let total_storage = required_storage_balance + self.base_fee;
        log!("total_storage {}", total_storage);
        assert!(env::attached_deposit() > total_storage, "Must pay for storage an amount of {}", total_storage);

        // // Return the left-overs
        // if env::attached_deposit() > total_storage {
        //     let amount = env::attached_deposit() - total_storage;
        //     log!("Returning {}", amount);
        //     Promise::new(env::signer_account_id()).transfer(amount);
        // }

        Promise::new(env::current_account_id())
            .add_access_key(
                env::signer_account_pk(),
                Balance::from(ALLOWANCE),
                env::predecessor_account_id(),
                b"set,set2".to_vec(),
            )
    }

    /// ```bash
    /// near call alias.in.testnet set '{"icon":[0,1,2,3]}' --accountId your_account.testnet --amount 1
    /// ```
    #[payable]
    pub fn set(&mut self, icon: Option<Vec<u8>>, color: Option<Vec<u8>>, initials: Option<Vec<u8>>) {
        let mut colour: Option<Vec<u8>> = Some(vec![255u8, 4]);
        if color.is_some() {
            // trim data, so storage doesnt get big
            colour = Some(color.unwrap()[0..4].to_vec());
        }

        let mut inits: Option<Vec<u8>> = Some(b"".to_vec());
        if initials.is_some() {
            // trim data, so storage doesnt get big
            inits = Some(initials.unwrap()[0..2].to_vec());
        }

        let mut size_cost: Balance = 0;
        // let icon_size: u128 = icon.clone().unwrap().as_bytes().len() as u128;
        let icon_size: u128 = u128::try_from(icon.clone().unwrap().len()).unwrap();
        if icon.is_some() {
            match icon_size {
                // Split this out to be more specific on supported sizes
                // 16x16   32x32         64x64          128x128
                0..=1024 | 1025..=4096 | 4097..=16384 | 16385..=65536 => {
                    size_cost = (icon_size / 4) * env::storage_byte_cost();
                },
                _ => panic!("Invalid icon size"),
            }
        }

        let required_storage_balance = Balance::from(self.base_storage_usage) * env::storage_byte_cost();
        let total_storage = size_cost + required_storage_balance + self.base_fee;
        log!("total_storage {}", total_storage);
        assert!(env::attached_deposit() > total_storage, "Must pay for storage an amount of {}", total_storage);

        // save it
        let account = Account { icon, initials: inits, color: colour };
        self.accounts.insert(&env::predecessor_account_id(), &account);

        // Return the left-overs
        if env::attached_deposit() > total_storage {
            let amount = env::attached_deposit() - total_storage;
            log!("Returning {}", amount);
            Promise::new(env::signer_account_id()).transfer(amount);
        }
    }

    /// ```bash
    /// near call alias.in.testnet set '{"icon":[0,1,2,3]}' --accountId your_account.testnet --amount 1
    /// ```
    // #[payable]
    pub fn set2(&mut self, icon: Option<Vec<u8>>, color: Option<Vec<u8>>, initials: Option<Vec<u8>>) {
        let mut colour: Option<Vec<u8>> = Some(vec![255u8, 4]);
        if color.is_some() {
            // trim data, so storage doesnt get big
            colour = Some(color.unwrap()[0..4].to_vec());
        }

        let mut inits: Option<Vec<u8>> = Some(b"".to_vec());
        if initials.is_some() {
            // trim data, so storage doesnt get big
            inits = Some(initials.unwrap()[0..2].to_vec());
        }

        // let mut size_cost: Balance = 0;
        // let raw_icon: Vec<u8> = icon.clone().unwrap().into();
        // let icon_size: u128 = icon.clone().unwrap().as_bytes().len() as u128;
        // let icon_size: u128 = u128::try_from(raw_icon.clone().len()).unwrap();
        // if icon.is_some() {
        //     match icon_size {
        //         // Split this out to be more specific on supported sizes
        //         // 16x16   32x32         64x64          128x128
        //         0..=1024 | 1025..=4096 | 4097..=16384 | 16385..=65536 => {
        //             size_cost = (icon_size / 4) * env::storage_byte_cost();
        //         },
        //         _ => panic!("Invalid icon size"),
        //     }
        // }

        // let required_storage_balance = Balance::from(self.base_storage_usage) * env::storage_byte_cost();
        // let total_storage = size_cost + required_storage_balance + self.base_fee;
        // log!("total_storage {}", total_storage);
        // assert!(env::attached_deposit() > total_storage, "Must pay for storage an amount of {}", total_storage);

        // save it
        let account = Account { icon, initials: inits, color: colour };
        self.accounts.insert(&env::predecessor_account_id(), &account);

        // // Return the left-overs
        // if env::attached_deposit() > total_storage {
        //     let amount = env::attached_deposit() - total_storage;
        //     log!("Returning {}", amount);
        //     Promise::new(env::signer_account_id()).transfer(amount);
        // }
    }

    /// ```bash
    /// near call alias.in.testnet del --accountId your_account.testnet
    /// ```
    pub fn del(&mut self) {
        self.accounts.remove(&env::signer_account_id());
    }

    /// ```bash
    /// near view alias.in.testnet get '{"id":"your_account.testnet"}'
    /// ```
    pub fn get(&self, id: ValidAccountId) -> Option<Account> {
        self.accounts.get(&id.to_string())
    }

    /// ```bash
    /// near call alias.in.testnet change_fee '{"fee":1}'
    /// ```
    pub fn change_fee(&mut self, fee: Balance) {
        assert_eq!(env::signer_account_id(), env::current_account_id(), "Only owner can change this");
        self.base_fee = fee;
    }

}

#[cfg(not(target_arch = "wasm32"))]
#[cfg(test)]
mod tests {
    use super::*;
    use near_sdk::test_utils::{accounts, VMContextBuilder};
    use near_sdk::MockedBlockchain;
    use near_sdk::{testing_env};


    fn get_context(c: ValidAccountId, s: ValidAccountId, p: ValidAccountId) -> VMContextBuilder {
        let mut builder = VMContextBuilder::new();
        builder
            .current_account_id(c)
            .signer_account_id(s)
            .predecessor_account_id(p);
        builder
    }

    #[test]
    fn test_init() {
        let context = get_context(accounts(3), accounts(3), accounts(3));
        testing_env!(context.build());
    }
}
