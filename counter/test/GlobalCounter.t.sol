// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../src/GlobalCounter.sol";

contract GlobalCounterTest is Test {
    GlobalCounter public counter;

    function setUp() public {
        counter = new GlobalCounter();
    }

    function testIncrement() public {
        counter.increment();
        assertEq(counter.count(), 1);
    }
}

