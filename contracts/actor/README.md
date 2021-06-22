# Actor

A tiny contract to manage account avatar images

#### Initialization

This happens upon contract deploy.

1. 

### Commands & Usage

Requires [near cli]()

```bash
# Init
near deploy --wasmFile res/actor.wasm --initFunction new --initArgs '{}' --accountId actor.in.testnet

# New avatar
near call actor.in.testnet avatar '{"data":[0,1,2,3]}' --accountId your_account.testnet --amount 1

# Get avatar
near view actor.in.testnet get_avatar '{"id":"your_account.testnet"}'
```