import {
  useGlobalCounterCount,
  useGlobalCounterGetCountFor,
  usePrepareGlobalCounterIncrement,
  useGlobalCounterIncrement,
  usePrepareGlobalCounterIncrementOnChain,
  useGlobalCounterIncrementOnChain,
} from '../generated'
import { omni } from '../chains'
import { devnet } from '../addresses'

function GlobalCounter({ address }: { address: `0x${string}` }) {
  const chainId = omni.id

  const count = useGlobalCounterCount({
    watch: true,
    chainId,
    address,
  })

  const chainACount = useGlobalCounterGetCountFor({
    watch: true,
    chainId,
    address,
    args: ['chain-a'],
  })

  const chainBCount = useGlobalCounterGetCountFor({
    watch: true,
    chainId,
    address,
    args: ['chain-b'],
  })

  const omniCount = useGlobalCounterGetCountFor({
    watch: true,
    chainId,
    address,
    args: ['omni'],
  })

  const incr = usePrepareGlobalCounterIncrement({
    chainId,
    address,
  })

  const increment = useGlobalCounterIncrement(incr.config)

  const incrChainA = usePrepareGlobalCounterIncrementOnChain({
    chainId,
    address,
    args: ['chain-a', devnet.localCounter],
  })

  const incrementChainA = useGlobalCounterIncrementOnChain(incrChainA.config)

  const incrChainB = usePrepareGlobalCounterIncrementOnChain({
    chainId,
    address,
    args: ['chain-b', devnet.localCounter],
  })

  const incrementChainB = useGlobalCounterIncrementOnChain(incrChainB.config)

  return (
    <div className="count">
      <h2>Global Count</h2>
      <p>{count.data?.toString()}</p>
      <p style={{ color: 'red' }}>{count.error?.message}</p>
      <h4>From Chain A</h4>
      <p>{chainACount.data?.toString()}</p>
      <p style={{ color: 'red' }}>{chainACount.error?.message}</p>
      <h4>From Chain B</h4>
      <p>{chainBCount.data?.toString()}</p>
      <p style={{ color: 'red' }}>{chainBCount.error?.message}</p>
      <h4>From Omni</h4>
      <p>{omniCount.data?.toString()}</p>
      <p style={{ color: 'red' }}>{omniCount.error?.message}</p>
      <button disabled={!increment.write} onClick={() => increment.write?.()}>
        Increment
      </button>
      <button
        disabled={!incrementChainA.write}
        onClick={() => incrementChainA.write?.()}
      >
        Increment Chain A
      </button>
      <button
        disabled={!incrementChainB.write}
        onClick={() => incrementChainB.write?.()}
      >
        Increment Chain B
      </button>
      <p style={{ color: 'red' }}>{increment.error?.message}</p>
    </div>
  )
}

export default GlobalCounter
