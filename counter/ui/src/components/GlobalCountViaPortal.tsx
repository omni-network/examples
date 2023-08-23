import { ethers } from 'ethers'
import { useQuery } from 'wagmi'
import {
  useOmniPortalLatestOmniBlock,
  useLocalCounterSyncGlobalCount,
  usePrepareLocalCounterSyncGlobalCount,
  useLocalCounterGlobalCount,
  useLocalCounterGlobalBlockNumber,
} from '../generated'
import { localOmniRpc, isTestnet, SupportedChainId } from '../chains'
import { formatHex } from '../utils'
import { portal } from '@omni/contracts'
import { addrs } from '../addresses'

type WithChainId = {
  chainId: SupportedChainId
}

function GlobalCount({ chainId }: WithChainId) {
  const { data } = useLocalCounterGlobalCount({
    chainId,
    watch: true,
  })

  return (
    <div>
      <h2>Global Count</h2>
      <p>Count: {data?.toString()}</p>
    </div>
  )
}

function GlobalCountBlockNumber({ chainId }: WithChainId) {
  const { data } = useLocalCounterGlobalBlockNumber({
    chainId,
    watch: true,
  })

  return (
    <div>
      <h2>Global Count Block Number</h2>
      <p>Block: {data?.toString()}</p>
    </div>
  )
}

const omniProvider = new ethers.providers.JsonRpcProvider(localOmniRpc)

function GlobalCountViaPortal({ chainId }: WithChainId) {
  const { data } = useOmniPortalLatestOmniBlock({
    watch: true,
    chainId,
  })

  const headBlockNumber = data?.number

  const stateProofQuery = useQuery(['global-state-proof', headBlockNumber], {
    enabled: !!headBlockNumber,
    queryFn: async () => {
      if (!headBlockNumber) return
      return portal.getStateProof({
        provider: omniProvider,
        blockNumber: headBlockNumber?.toNumber(),
        address: isTestnet(chainId)
          ? addrs.testnet.globalCounter
          : addrs.devnet.globalCounter,
        storageSlot: '0x2',
      })
    },
  })

  // console.log(stateProofQuery.data)

  const { storageProof, storageValue } = stateProofQuery.data ?? {}

  const blockNumber = ethers.BigNumber.from(
    stateProofQuery.data?.blockNumber ?? '0x0',
  )
  const globalCount = ethers.BigNumber.from(storageValue ?? '0x0')

  const { config } = usePrepareLocalCounterSyncGlobalCount({
    chainId,
    enabled: !!stateProofQuery.data,
    args: [blockNumber, storageProof as `0x{string}`, globalCount],
  })

  const sync = useLocalCounterSyncGlobalCount({
    ...config,
  })

  return (
    <div>
      <h2>Latest Omni Block</h2>
      <p>Number: {data?.number.toString()}</p>
      <p>Hash: {formatHex(data?.hash.toString())}</p>
      <p>Parent Hash: {formatHex(data?.parentHash.toString())}</p>
      <button disabled={!sync.write} onClick={() => sync.write?.()}>
        Sync
      </button>
      <GlobalCount chainId={chainId} />
      <GlobalCountBlockNumber chainId={chainId} />
    </div>
  )
}

export default GlobalCountViaPortal
