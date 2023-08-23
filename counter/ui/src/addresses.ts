export const devnet = {
  omniPortal: '0x7965Bb94fD6129B4Ac9028243BeFA0fACe1d7286' as const,
  globalCounter: '0x0bA5e92F111717a87dda93a3892A73448fB0d0aB' as const,
  localCounter: '0x3b8f562222d5f8f0345772766fd35E58B0665413' as const,
} as const

export const testnet = {
  omniPortal: '0x26FdfC1A37C4Ba9e73Df27DD67eC34852140B94d' as const,
  globalCounter: '0x0bA5e92F111717a87dda93a3892A73448fB0d0aB' as const,
  localCounter: '0x96a9E320263F50166Bbd6c02e26Ff42bDF3f41E4' as const,
} as const

export const addrs = {
  devnet,
  testnet,
} as const
