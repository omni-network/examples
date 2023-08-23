# Omni Smart Contract Examples

Example smart contract systems built with Omni, using the [Omni Standard Library](https://github.com/omni-network/omni-std)

Clone the repo as a template, or use the structure as a guide for building your own system.

## Instructions

1. Set required env variables from the `.env.example` in your own `.env`. You'll also need to set Vite specific RPC URLs from `examples/counter/ui/.env.example` under `examples/counter/ui/.env`

2. Set the portal addresses based on the Omni documentation under `examples/counter/ui/src/addresses.ts`

3. Install dependencies

    ```bash
    yarn install
    cd examples/counter/contracts && yarn install
    cd ../ui/ && yarn install && cd ..
    ```

4. Deploy GlobalCounter to Omni Testnet and record the deployed address to your `.env`

    ```bash
    make deploy-omni
    ```

5. Deploy local counters to rollup testnets

    ```bash
    make deploy-testnets
    ```

6. Run the UI

    ```bash
    make serve
    ```
