require("@nomiclabs/hardhat-waffle")
require("@nomiclabs/hardhat-etherscan")
require("hardhat-deploy")
require("solidity-coverage")
require("hardhat-gas-reporter")
require("hardhat-contract-sizer")
require("dotenv").config()

/** @type import('hardhat/config').HardhatUserConfig */
const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL || "https://eth-goerli"
module.exports = {
    solidity: "0.8.17",
    networks: {
        hardhat: {
            chainId: 31337,
            blockConfirmations: 1,
        },
        goerli: {
            url: GOERLI_RPC_URL,
            // array of accounts used for deploy
            accounts: [process.env.PRIVATE_KEY],
            chainId: 5,
            blockConfirmations: 6,
        },
    },
    namedAccounts: {
        deployer: {
            default: 0,
        },
        player: {
            default: 1,
        },
    },
    gasReporter: {
        enabled: true,
        outputFile: "gas-reporter.txt",
        noColors: true,
        currency: "USD",
        coinmarketcap: process.env.COINMARKETCAP_API_KEY,
    },
    mocha: {
        timeout: 300000,
    },
}
