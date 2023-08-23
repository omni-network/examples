import { useAccount, useConnect, useDisconnect, useChainId } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'

function Profile() {
  const { address, isConnected } = useAccount()
  const chainId = useChainId()
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  })
  const { disconnect } = useDisconnect()

  if (isConnected)
    return (
      <div>
        Connected to {address}
        <button onClick={() => disconnect()}>Disconnect</button>
        <div>Chain ID: {chainId}</div>
      </div>
    )
  return <button onClick={() => connect()}>Connect Wallet</button>
}

export default Profile
