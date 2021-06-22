import ContractAbis from './contract-abi.json'

export function getContractIds(env) {
  let id = 'testnet'

  switch (env) {
    case 'development':
      id = 'testnet'
      break
    case 'production':
      id = 'mainnet'
      break
  }

  return ContractAbis[id]
}

// Get contract ABIs
export function getContractAbi(key) {
  return ContractAbis.abis[key]
}
