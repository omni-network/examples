// SPDX-License-Identifier: MIT
pragma solidity ^0.8;

import {OmniScient} from "@omni/contracts/contracts/OmniScient.sol";
import {OmniCodec} from '@omni/contracts/contracts/OmniCodec.sol';

contract GlobalCounter is OmniScient {
    uint256 public count;

    mapping(string => uint256) internal countByChain;
    mapping(uint256 => bool) public incrementSuccess;

    event IncrementOnChainSuccess(uint256 nonce);
    event IncrementOnChainReverted(uint256 nonces);

    event Increment(uint256 count);

    constructor() {
        count = 0;
    }

    function increment() public {
        count += 1;
        countByChain[omni.txSourceChain()] += 1;
        emit Increment(count);
    }

    function incrementOnChain(string memory chain, address counter) public {
      omni.sendTx(
        chain,
        counter,
        0, // value
        100_000, // gas limit
        abi.encodeWithSignature("increment()")
      );
    }

    function getCountFor(string memory chain) public view returns (uint256) {
        return countByChain[chain];
    }

    function onXChainTxSuccess(OmniCodec.Tx memory _xtx, address _sender, bytes memory _returnValue, uint256 _gasSpent) external override onlyOmni {
        incrementSuccess[_xtx.nonce] = true;
        emit IncrementOnChainSuccess(_xtx.nonce);
    }

    function onXChainTxReverted(OmniCodec.Tx memory _xtx, address _sender, uint256 _gasSpent) external override onlyOmni {
        incrementSuccess[_xtx.nonce] = false;
        emit IncrementOnChainReverted(_xtx.nonce);
    }
}
