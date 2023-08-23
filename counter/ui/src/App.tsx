import { WagmiConfig, createClient, configureChains } from 'wagmi'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'
import { InjectedConnector } from 'wagmi/connectors/injected'
import ConnectWallet from './components/ConnectWallet'
import GlobalCount from './components/GlobalCount'
import LocalCount from './components/LocalCount'
import { chainA, chainB, omni, arbitrumGoerli, optimismGoerli } from './chains'
import { addrs } from './addresses'

const { chains, provider } = configureChains(
  [chainA, chainB, omni, arbitrumGoerli, optimismGoerli],
  [
    jsonRpcProvider({
      rpc: chain => ({
        http: chain.rpcUrls.default.http[0],
      }),
    }),
  ],
)

const client = createClient({
  autoConnect: true,
  connectors: [new InjectedConnector({ chains })],
  provider,
})

function App() {
  return (
    <WagmiConfig client={client}>
      <div className="app">
        <ConnectWallet />
        <div className="counts">
          <LocalCount chainId={chainA.id} chainName={chainA.name} />
          <GlobalCount address={addrs.devnet.globalCounter} />
          <LocalCount chainId={chainB.id} chainName={chainB.name} />
        </div>
      </div>
    </WagmiConfig>
  )
}

export default App
