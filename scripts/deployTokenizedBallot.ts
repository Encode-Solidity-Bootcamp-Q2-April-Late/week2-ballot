import { Ballot, Ballot__factory, MyERC20Votes, MyERC20Votes__factory } from "../typechain-types";
import { ethers } from "ethers";
import * as dotenv from "dotenv";
const proposals = ["Proposal 1", "Proposal 2","Proposal 3"];

dotenv.config();
const MINT_AMOUNT = ethers.utils.parseEther("1000");
const TRANSFER_AMOUNT = ethers.utils.parseEther("100");
const VOTING_PERIOD = 300;


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
    let votingTokenContract: MyERC20Votes;
    let ballotContract: Ballot;
    let votingTokenContractFactory: MyERC20Votes__factory;
    let ballotContractFactory: Ballot__factory;
    const acc2 = ethers.utils.getAddress("0x95C07028025848f840BA1d7695266E6229eae853");
    const acc3 = ethers.utils.getAddress("0x5f6AEB64b5F61dF1274A45B53F160B68b09A6608");
// Deploy contract
const proposals = process.argv.slice(2);
console.log(process.argv);
console.log("Deploying Ballot contract");
console.log("Proposals: ");
proposals.forEach((element, index) => {
  console.log(`Proposal N. ${index + 1}: ${element}`);
});
votingTokenContractFactory = new MyERC20Votes__factory(signer);
proposals.map(ethers.utils.formatBytes32String);

votingTokenContract = await votingTokenContractFactory.deploy();

const deployTxReceipt = await votingTokenContract.deployTransaction.wait();
console.log(`The deploy transaction was mined in block ${deployTxReceipt.blockNumber}`);
console.log(`The voting contract was deployed at address ${votingTokenContract.address}`);


ballotContractFactory = new Ballot__factory(signer);
proposals.map(ethers.utils.formatBytes32String)

ballotContract = await ballotContractFactory.deploy(proposals.map(ethers.utils.formatBytes32String),votingTokenContract.address, lastBlock.number); 



const deployTxReceipt1 = await ballotContract.deployTransaction.wait();
console.log(`The deploy transaction was mined in block ${deployTxReceipt1.blockNumber}`);
console.log(`The ballot contract was deployed at address ${ballotContract.address}`);
const MINTER_ROLE = await votingTokenContract.MINTER_ROLE();
    await votingTokenContract.grantRole(MINTER_ROLE, signer.address);
    console.log(signer.address.toString());
    await votingTokenContract.connect(signer).mint(signer.address, MINT_AMOUNT);
    const acc1Balance = await signer.getBalance();
    console.log("Acc1 balance after minting: ", acc1Balance.toString());
    //const deployTx = ballotContractFactory.getDeployTransaction(proposals.map(ethers.utils.formatBytes32String),votingTokenContract.address,lastBlock.number);
    await votingTokenContract.connect(signer).transfer(acc2, TRANSFER_AMOUNT,{gasLimit:3e7});
    await votingTokenContract.connect(signer).transfer(acc3, TRANSFER_AMOUNT,{gasLimit:3e7});
    await ballotContract.connect(signer).vote("1","1");
    const winningProposalNumber = await ballotContract.winningProposal();
    const winningProposal = await ballotContract.proposals(winningProposalNumber);
    console.log(`The winning proposal is: ${ethers.utils.parseBytes32String(winningProposal.name)}`);
    





}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});