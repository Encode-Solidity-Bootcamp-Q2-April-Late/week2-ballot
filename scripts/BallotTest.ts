import * as dotenv from "dotenv";
import { Ballot__factory } from "../typechain-types";
import { ethers } from "ethers";
import * as readline from "readline";
const proposals = ["Proposal 1", "Proposal 2","Proposal 3"];

dotenv.config();

async function main() {
  // Setup wallet, provider, signer & check balance
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY ?? "");
  console.log(`Connected to wallet address ${wallet.address}`);
  const provider = new ethers.providers.InfuraProvider("sepolia", process.env.INFURA_API_KEY);
  const lastBlock = await provider?.getBlock("latest");
  console.log(`Connected to the block number ${lastBlock?.number}`);
  const signer = wallet.connect(provider);
  console.log(`Connected to signer address ${signer.address}`);
  const balance = await signer.getBalance();
  console.log(`Account balance: ${ethers.utils.formatEther(balance)} ETH`);

  // Deploy contract
  const proposals = process.argv.slice(2);
  console.log(process.argv);
  console.log("Deploying Ballot contract");
  console.log("Proposals: ");
  proposals.forEach((element, index) => {
    console.log(`Proposal N. ${index + 1}: ${element}`);
  });
  const ballotFactory = new Ballot__factory(signer);
  proposals.map(ethers.utils.formatBytes32String)
  const deployTx = ballotFactory.getDeployTransaction(proposals.map(ethers.utils.formatBytes32String));
  const gasEstimate = await provider.estimateGas(deployTx);
  const ballotContract = await ballotFactory.deploy(proposals.map(ethers.utils.formatBytes32String), {
    gasLimit: gasEstimate.add(ethers.BigNumber.from("5000000")),
  });

  const deployTxReceipt = await ballotContract.deployTransaction.wait();
  console.log(`The deploy transaction was mined in block ${deployTxReceipt.blockNumber}`);
  console.log(`The ballot contract was deployed at address ${ballotContract.address}`);

  // Interact with contract
  const chairperson = await ballotContract.chairperson();
  console.log(`The chairperson is ${chairperson}`);
  
  async function askForAddresses(): Promise<string[]> {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    return new Promise((resolve) => {
      rl.question("Enter addresses separated by commas: ", (input) => {
        const addresses = input.split(",").map((address) => address.trim());
        rl.close();
        resolve(addresses);
      });
    });
  }

  const addressesToGiveRightToVote = await askForAddresses();
  for (const address of addressesToGiveRightToVote) {
    //Giving Right to Vote
    console.log(`Giving voting rights to ${address}`);
    const giveRightToVoteTx = await ballotContract.giveRightToVote(address, {
      gasLimit: ethers.BigNumber.from("5000000"),
    });
    //Awaitig Receipt
    const giveRightToVoteTxReceipt = await giveRightToVoteTx.wait();
    console.log(`Transaction completed at block ${giveRightToVoteTxReceipt.blockNumber} with tx hash ${giveRightToVoteTxReceipt.transactionHash}`);
    console.log(`Transaction completed at block ${giveRightToVoteTxReceipt.blockNumber} with block hash ${giveRightToVoteTxReceipt.blockHash}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
