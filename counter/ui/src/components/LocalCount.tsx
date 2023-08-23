import {
  useLocalCounterCount,
  useLocalCounterIncrement,
  usePrepareLocalCounterIncrement,
  useLocalCounterIncrementOnChain,
  usePrepareLocalCounterIncrementOnChain,
} from '../generated'
import GlobalCountViaPortal from './GlobalCountViaPortal'
import { SupportedChainId, chainA, chainB } from '../chains'
import { addrs } from '../addresses'

function LocalCounter({
  chainName,
  chainId,
}: {
  chainName: string
  chainId: SupportedChainId
}) {
  const count = useLocalCounterCount({
    watch: true,
    chainId,
  })

  const { config } = usePrepareLocalCounterIncrement({
    chainId,
  })

  const increment = useLocalCounterIncrement(config)

  const other = chainId == chainA.id ? chainB : chainA

  const { config: configOnChain } = usePrepareLocalCounterIncrementOnChain({
    chainId,
    args: [other.name, addrs.devnet.localCounter],
  })

  const incrementOnChain = useLocalCounterIncrementOnChain(configOnChain)

  return (
    <div className="count">
      <h2>Local count on "{chainName}"</h2>
      <p>{count.data?.toString()}</p>
      <p style={{ color: 'red' }}>{count.error?.message}</p>
      <button disabled={!increment.write} onClick={() => increment.write?.()}>
        Increment
      </button>
      <p style={{ color: 'red' }}>{increment.error?.message}</p>
      <button
        disabled={!incrementOnChain.write}
        onClick={() => incrementOnChain.write?.()}
      >
        Increment on {other.name}
      </button>
      <p style={{ color: 'red' }}>{incrementOnChain.error?.message}</p>
      <GlobalCountViaPortal chainId={chainId} />
    </div>
  )
}

export default LocalCounter
