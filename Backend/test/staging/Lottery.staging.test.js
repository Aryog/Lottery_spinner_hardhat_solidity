const { assert, expect } = require("chai")
const { getNamedAccounts, deployments, ethers, network } = require("hardhat")
const { developmentChains, networkConfig } = require("../../helper-hardhat-config")
developmentChains.includes(network.name)
    ? describe.skip
    : describe("Lottery Staging Test", async () => {
          let lottery, lotteryEntranceFee, deployer, vrfCoordinatorV2Mock
          const chainId = network.config.chainId
          beforeEach(async function () {
              deployer = (await getNamedAccounts()).deployer
              //   cause deployers get already deployed in real network
              //   await deployments.fixture("all")
              lottery = await ethers.getContract("Lottery", deployer)
              //   vrfCoordinatorV2Mock = await ethers.getContract("vrfCoordinatorV2", deployer)
              lotteryEntranceFee = await lottery.getEntranceFee()
          })
          describe("fulfillRandomWords", function () {
              it("works with live chainlink keepers and chainlink VRF , we get a random winner", async function () {
                  //   enter the lottery
                  const startingTimeStamp = await lottery.getLatestTimeStamp()
                  const accounts = await ethers.getSigners()

                  await new Promise(async function (resolve, reject) {
                      //   setup listener before we enter the lottery
                      //   just in case the blockchian moves really fast
                      lottery.once("WinnerPicked", async () => {
                          console.log("WinnerPicked event fired!")
                          try {
                              // add our asserts here
                              const recentWinner = await lottery.getRecentWinner()
                              const lotteryState = await lottery.getLotteryState()
                              const winnerEndingBalance = await accounts[0].getBalance()
                              const endingTimeStamp = await getLatestTimeStamp()

                              await expect(lottery.getPlayer(0)).to.be.reverted
                              assert.equal(recentWinner.toString(), account[0].address)
                              assert.equal(raffleState, 0)
                              assert.equal(
                                  winnerEndingBalance.toString(),
                                  winnerStartingBalance.add(lotteryEntranceFee).toString()
                              )
                              assert(endingTimeStamp > startingTimeStamp)
                              resolve()
                          } catch (error) {
                              reject(e)
                          }
                      })
                      // Then entering the lottery
                      await lottery.enterLottery({ value: lotteryEntranceFee })
                      const winnerStartingBalance = await accounts[0].getBalance()
                      //and this code Wont conmplete until our listener has finished listening
                  })
              })
          })
      })
