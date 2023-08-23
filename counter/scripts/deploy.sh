#!/bin/bash

set -ueo pipefail

need_cmd() {
  if ! command -v "$1" > /dev/null 2>&1; then
    echo "need '$1' (command not found)"
    exit 1
  fi
}

need_var() {
  if [ -z "${!1+1}" ]; then
    echo "need '$1' (not set)"
    exit 1
  fi
}

deploy() {
  contract="src/$1.sol:$1"
  rpc="--rpc-url $2"
  pk="--private-key $3"

  shift 3

  constructor_args=""
  if [ $# -gt 0 ]; then
    constructor_args="--constructor-args $@"
  fi

  forge create --json $rpc $pk $contract $constructor_args
}

need_cmd forge
need_cmd jq
need_cmd git


case $1 in
  omni)
    # get deployer pk and omni RPC from env
    root=$(git rev-parse --show-toplevel)
    source $root/.env

    need_var DEPLOYER_PRIVATE_KEY
    need_var OMNI_RPC

    echo "Deploying GlobalCounter..."

    deployment=$(deploy GlobalCounter $OMNI_RPC $DEPLOYER_PRIVATE_KEY)
    global_counter_address=$(echo $deployment | jq -r .deployedTo)

    echo "GlobalCounter deployed at $global_counter_address"
    ;;
  testnets)
    # get rpcs, deployer pk, global counter addr from env
    root=$(git rev-parse --show-toplevel)
    source $root/.env

    need_var ARBITRUM_GOERLI_RPC_URL
    need_var OPTIMISM_GOERLI_RPC_URL
    need_var DEPLOYER_PRIVATE_KEY
    need_var GLOBAL_COUNTER_ADDRESS
    need_var OMNI_PORTAL_ADDRESS 

    echo "Deploying LocalCounter to ${ARBITRUM_GOERLI_RPC_URL}..."
    deployment=$(deploy LocalCounter $ARBITRUM_GOERLI_RPC_URL $DEPLOYER_PRIVATE_KEY $OMNI_PORTAL_ADDRESS $GLOBAL_COUNTER_ADDRESS)
    echo "Arbitrum LocalCounter deployed at $(echo $deployment | jq -r .deployedTo)"

    echo "Deploying LocalCounter to ${OPTIMISM_GOERLI_RPC_URL}..."
    deployment=$(deploy LocalCounter $OPTIMISM_GOERLI_RPC_URL $DEPLOYER_PRIVATE_KEY $OMNI_PORTAL_ADDRESS $GLOBAL_COUNTER_ADDRESS)
    echo "Optimism LocalCounter deployed at $(echo $deployment | jq -r .deployedTo)"
    ;;
  *)
    echo "Invalid arg. Expected 'omni', 'local' or 'testnets'"
    exit 1
    ;;
esac
