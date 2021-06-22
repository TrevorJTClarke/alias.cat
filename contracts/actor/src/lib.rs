use near_sdk::{
    near_bindgen,
    borsh::{self, BorshDeserialize, BorshSerialize},
    collections::{ UnorderedMap },
    json_types::{ ValidAccountId },
    AccountId,
    Balance,
    PanicOnDefault,
    BorshStorageKey,
    env,
    log
};

near_sdk::setup_alloc!();

pub const ONE_NEAR: u128 = 1_000_000_000_000_000_000_000_000;

#[derive(BorshStorageKey, BorshSerialize)]
pub enum StorageKeys {
    Avatars,
}

#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize, PanicOnDefault)]
pub struct Actor {
    pub avatars: UnorderedMap<AccountId, Vec<u8>>,
    pub base_fee: Balance,
}

#[near_bindgen]
impl Actor {
    /// ```bash
    /// near call cron.testnet new --accountId cron.testnet
    /// ```
    #[init]
    pub fn new() -> Self {
        assert!(!env::state_exists(), "The contract is already initialized");
        Actor {
            avatars: UnorderedMap::new(StorageKeys::Avatars),
            base_fee: ONE_NEAR / 4,
        }
    }

    /// avatar
    /// 
    /// ```bash
    /// near call actor.in.testnet avatar '{"data":[0,1,2,3]}' --accountId your_account.testnet --amount 1
    /// ```
    #[payable]
    pub fn avatar(&mut self, data: Vec<u8>) {
        assert!(env::attached_deposit() > self.base_fee, "Must pay for storage an amount of {}", self.base_fee);
        log!("AVATAR_ID:{}", &env::predecessor_account_id());
        // check that we get some money to cover storage and profit
        self.avatars.insert(&env::predecessor_account_id(), &data);
    }

    /// avatar
    /// 
    /// ```bash
    /// near view actor.in.testnet get_avatar '{"id":"your_account.testnet"}'
    /// ```
    pub fn get_avatar(&self, id: ValidAccountId) -> Option<Vec<u8>> {
        // check that we get some money to cover storage and profit
        self.avatars.get(&id.to_string())
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
