//Requires yarn add prompts
// then yarn add --dev @types/prompts


import * as dotenv from "dotenv";
import { ethers } from "ethers";
import prompts from "prompts";

dotenv.config();

async function main() {
  //connect to provider in this case Infura and sepolia testnet

  const provider = new ethers.providers.InfuraProvider("sepolia", process.env.INFURA_API_KEY);
//Prompts for address and ABI

  const contractAddress = await prompt("Enter the contract address:");
  const abi = await prompt("Enter the ABI:");

//Private key from .env if there is none give error message otherwise connect wallet

  const privateKey = process.env.PRIVATE_KEY;
  if (!privateKey) {
    throw new Error("PRIVATE_KEY not found in environment variables.");
  }
  const wallet = new ethers.Wallet(privateKey, provider);
  console.log(`Connected to wallet address ${wallet.address}`);

  //connect to the contract
  const contract = new ethers.Contract(contractAddress, abi, wallet);
//console log wallet balance
  const balance = await wallet.getBalance();
  console.log(`Account balance: ${ethers.utils.formatEther(balance)} ETH`);

  //Loop to get wallet proposals from contract
  const proposals = await contract.getNumProposals();
  console.log("Proposals: ");
  for (let i = 0; i < proposals; i++) {
    const proposal = await contract.proposals(i);
    console.log(`Proposal N. ${i}: ${ethers.utils.parseBytes32String(proposal.name)}`);
  }
//Check if address is eligible to vote
  const address = wallet.address;

  const voter = await contract.voters(address);
  if (voter.weight === 0) {
    console.log(`Address ${address} does not have voting rights.`);
  } else {
    console.log(`Address ${address} has voting rights.`);
  }

  const choice = await prompt("Enter 1 to vote, 2 to delegate, or anything else to quit:");
  if (choice === "1") {
    const proposalNumber = await prompt("Enter the number of the proposal to vote for:");
    const tx = await contract.vote(proposalNumber, { gasLimit: 500000 });
    console.log(`Transaction submitted with hash: ${tx.hash}`);
  } else if (choice === "2") {
    const delegateAddress = await prompt("Enter the address to delegate your vote to:");
    const tx = await contract.delegate(delegateAddress, { gasLimit: 500000 });
    console.log(`Transaction submitted with hash: ${tx.hash}`);
  } else {
    console.log("Quitting.");
  }

  const queryChoice = await prompt("Enter 1 to query the winning proposal, or anything else to quit:");
  if (queryChoice === "1") {
    const winningProposalNumber = await contract.winningProposal();
    const winningProposal = await contract.proposals(winningProposalNumber);
    console.log(`The winning proposal is: ${ethers.utils.parseBytes32String(winningProposal.name)}`);
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
