import * as dotenv from "dotenv";
import { ethers, Contract } from "ethers";
import prompts from "prompts";

dotenv.config();

async function main() {
  const provider = new ethers.providers.InfuraProvider("sepolia", process.env.INFURA_API_KEY);
  
  const fs = require('fs');
  let rawAbi = fs.readFileSync('abi.json');
  let abi = JSON.parse(rawAbi);
  const contractAddress = await prompt("Enter the Ballot contract address:");
  

  //private key from .env or error

  const privateKey = process.env.PRIVATE_KEY;
  if (!privateKey) {
    throw new Error("PRIVATE_KEY not found in environment variables.");
  }
  //connect to Wllet
  const wallet = new ethers.Wallet(privateKey, provider);
  console.log(`Connected to wallet address ${wallet.address}`);
  //connect to contract
  const contract = new Contract(contractAddress, abi, wallet);
  const balance = await wallet.getBalance();
  console.log(`Account balance: ${ethers.utils.formatEther(balance)} ETH`);
//Loop gets number of proposals from contract and then prints them to the suer
  const proposals = await contract.getNumProposals(); 
  console.log("Proposals: ");
  for (let i = 0; i < proposals; i++) {
    const proposal = await contract.proposals(i);
    console.log(`Proposal N. ${i+1}: ${ethers.utils.parseBytes32String(proposal.name)}`);
  }

  //Choice to vote or delegate or quit
  const choice = await prompt("Enter 1 to vote, 2 to delegate, or anything else to quit:");
  if (choice === "1") {
    const proposalNumber = await prompt("Enter the number of the proposal to vote for:");
    const amount = await prompt("Enter the amount of tokens to vote with:");
    const tx = await contract.vote(proposalNumber, ethers.utils.parseEther(amount), { gasLimit: 500000 });
    console.log(`Transaction submitted with hash: ${tx.hash}`);
  } else if (choice === "2") {
    const delegateAddress = await prompt("Enter the address to delegate your vote to:");
    const tx = await contract.delegate(delegateAddress, { gasLimit: 500000 });
    console.log(`Transaction submitted with hash: ${tx.hash}`);
  } else {
    console.log("Quitting.");
  }

//Queires the winner
  const queryChoice = await prompt("Enter 1 to query the winning proposal, or anything else to quit:");
  if (queryChoice === "1") {
    const [winningProposalNumber,winningVoteCount] = await contract.winningProposal();
    const winningProposal = await contract.proposals(winningProposalNumber);
    console.log(`The winning proposal is: ${ethers.utils.parseBytes32String(winningProposal.name)} number of votes is ${winningVoteCount}`);
  } else {
    console.log("Quitting.");
  }
}

async function prompt(message: string): Promise<string> {
  const result = await prompts({
    type: "text",
    name: "value",
    message,
  });

  return result.value;
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
