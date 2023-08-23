import { arbitrumGoerli, optimismGoerli } from 'wagmi/chains'

const localRpc = (port: number) => `http://localhost:${port}`
const localWsRpc = (port: number) => `ws://localhost:${port}`

const createChain = <ChainId extends number>(
  id: ChainId,
  name: string,
  network: string,
  httpRpc: string,
  wsRpc: string,
  currencyName: string,
  currencySymbol: string,
) =>
  ({
    id,
    name,
    network,
    nativeCurrency: {
      decimals: 18,
      name: currencyName,
      symbol: currencySymbol,
    },
    rpcUrls: {
      public: { http: [httpRpc], webSocket: [wsRpc] },
      default: { http: [httpRpc], webSocket: [wsRpc] },
    },
  } as const)

export const localOmniRpc = localRpc(8545)
export const localOmniWsRpc = localWsRpc(8546)

export const omni = createChain(
  165,
  'omni',
  'localhost',
  localOmniRpc,
  localOmniWsRpc,
  'Omni',
  'OMNI',
)
export const chainA = createChain(
  2730,
  'chain-a',
  'localhost',
  localRpc(6545),
  localWsRpc(6546),
  'Ether',
  'ETH',
)
export const chainB = createChain(
  3003,
  'chain-b',
  'localhost',
  localRpc(7545),
  localWsRpc(7546),
  'Ether',
  'ETH',
)

export { arbitrumGoerli, optimismGoerli }

export const isDevnet = (chainId: number) =>
  chainId === chainA.id || chainId === chainB.id

export const isTestnet = (chainId: number) =>
  chainId === arbitrumGoerli.id || chainId === optimismGoerli.id

export type SupportedChainId =
  | typeof chainA.id
  | typeof chainB.id
  | typeof arbitrumGoerli.id
  | typeof optimismGoerli.id
