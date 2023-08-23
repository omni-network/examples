import { defineConfig } from '@wagmi/cli'
import { react } from '@wagmi/cli/plugins'
import { Abi } from 'abitype'

import { abis } from '@omni/contracts'
import LocalCounter from '../contracts/out/LocalCounter.sol/LocalCounter.json'
import GlobalCounter from '../contracts/out/GlobalCounter.sol/GlobalCounter.json'
import { chainA, chainB, arbitrumGoerli, optimismGoerli } from './src/chains'
import { addrs } from './src/addresses'

export default defineConfig({
  out: 'src/generated.ts',
  contracts: [
    {
      name: 'GlobalCounter',
      abi: GlobalCounter.abi as Abi,
    },
    {
      name: 'LocalCounter',
      abi: LocalCounter.abi as Abi,
      address: {
        [optimismGoerli.id]: addrs.testnet.localCounter,
        [arbitrumGoerli.id]: addrs.testnet.localCounter,
        [chainA.id]: addrs.devnet.localCounter,
        [chainB.id]: addrs.devnet.localCounter,
      }
    },
    {
      name: 'OmniPortal',
      abi: abis.OmniPortal.abi as Abi,
      address: {
        [optimismGoerli.id]: addrs.testnet.omniPortal,
        [arbitrumGoerli.id]: addrs.testnet.omniPortal,
        [chainA.id]: addrs.devnet.omniPortal,
        [chainB.id]: addrs.devnet.omniPortal,
      }
    },
  ],
  plugins: [react()],
})
