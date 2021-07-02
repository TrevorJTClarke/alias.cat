# Alias

A tiny contract to manage account avatar images

### Commands & Usage

Requires [near cli]()

```bash
# Create sub-account
near delete alias.in.testnet in.testnet && near create-account alias.in.testnet --masterAccount in.testnet

# Init
near deploy --wasmFile res/alias.wasm --initFunction new --initArgs '{}' --accountId alias.in.testnet

# Set
near call alias.in.testnet set '{"icon":[0,1,2,3]}' --accountId your_account.testnet --amount 1

# Get
near view alias.in.testnet get '{"id":"your_account.testnet"}'

# Change fee
near call alias.in.testnet change_fee '{"fee":1}'
```