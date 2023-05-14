import { Ballot, Ballot__factory, MyERC20Votes, MyERC20Votes__factory } from "../typechain-types";

import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { ethers,network } from "hardhat";
import { expect } from "chai";


const MINT_AMOUNT = ethers.utils.parseEther("1000");
const TRANSFER_AMOUNT = ethers.utils.parseEther("100");
const PROPOSALS = ["Prop1", "Prop2", "Prop3"];
const VOTING_PERIOD = 150;

function convertStringArrayToBytes32(array: string[]) {
    return array.map(ethers.utils.formatBytes32String);
}

describe("Tokenized Ballot Test", function () {
    let votingTokenContract: MyERC20Votes;
    let acc1: SignerWithAddress;
    let acc2: SignerWithAddress;
    let acc3: SignerWithAddress;
    let ballotContract: Ballot;
    let votingTokenContractFactory: MyERC20Votes__factory;
    let ballotContractFactory: Ballot__factory;

    beforeEach(async function () {
        const accounts = await ethers.getSigners();
        [, acc1, acc2, acc3] = accounts;

        votingTokenContractFactory = await ethers.getContractFactory("MyERC20Votes") as MyERC20Votes__factory;
        votingTokenContract = await votingTokenContractFactory.deploy();
        await votingTokenContract.deployed();

        const MINTER_ROLE = await votingTokenContract.MINTER_ROLE();
    await votingTokenContract.grantRole(MINTER_ROLE, acc1.address);

        ballotContractFactory = await ethers.getContractFactory("Ballot") as Ballot__factory;
        ballotContract = await ballotContractFactory.deploy(
            convertStringArrayToBytes32(PROPOSALS),
            votingTokenContract.address,
            VOTING_PERIOD
        );
        await ballotContract.deployed();
    });

    describe("when the contract is deployed", function () {
        it("has the provided proposals", async function () {
            for (let index = 0; index < PROPOSALS.length; index++) {
                const proposal = await ballotContract.proposals(index);
                expect(ethers.utils.parseBytes32String(proposal.name)).to.eq(PROPOSALS[index]);
            };
        });

        it("has zero vote count", async function () {
            for (let index = 0; index < PROPOSALS.length; index++) {
                const proposal = await ballotContract.proposals(index);
                expect(proposal.voteCount).to.eq(0);
            }
        });
    });

    describe("Token and voting functionality", function () {
        it("Should mint tokens to acc1", async function () {
            await votingTokenContract.connect(acc1).mint(acc1.address, MINT_AMOUNT);
            const acc1Balance = await votingTokenContract.balanceOf(acc1.address);
            console.log("Acc1 balance after minting: ", acc1Balance.toString());
            expect(acc1Balance).to.equal(MINT_AMOUNT);
        });
    
        it("Should transfer tokens from acc1 to acc2 and acc3", async function () {
            await votingTokenContract.connect(acc1).mint(acc1.address, MINT_AMOUNT);
            const acc1Balance = await votingTokenContract.balanceOf(acc1.address);
            console.log("Acc1 balance before transfer: ", acc1Balance.toString());
            await votingTokenContract.connect(acc1).transfer(acc2.address, TRANSFER_AMOUNT);
            await votingTokenContract.connect(acc1).transfer(acc3.address, TRANSFER_AMOUNT);
            const acc2Balance = await votingTokenContract.balanceOf(acc2.address);
            const acc3Balance = await votingTokenContract.balanceOf(acc3.address);
            console.log("Acc2 balance after transfer: ", acc2Balance.toString());
            console.log("Acc3 balance after transfer: ", acc3Balance.toString());
            expect(acc2Balance).to.equal(TRANSFER_AMOUNT);
            expect(acc3Balance).to.equal(TRANSFER_AMOUNT);
        });
    
        it("Should allow each account to vote on a proposal", async function () {
            await votingTokenContract.connect(acc1).mint(acc1.address, MINT_AMOUNT);
            const acc1Balance = await votingTokenContract.balanceOf(acc1.address);
            const acc2Balance = await votingTokenContract.balanceOf(acc2.address);
            console.log("Acc1 balance before transfer: ", acc1Balance.toString());
             await votingTokenContract.connect(acc1).transfer(acc2.address, TRANSFER_AMOUNT);
             await votingTokenContract.connect(acc1).transfer(acc3.address, TRANSFER_AMOUNT);
             await votingTokenContract.delegate(acc2.address);
             await votingTokenContract.delegate(acc3.address);          
             const votingPowerAcc2 =  await votingTokenContract.getVotes(acc2.address);
             const votingPowerAcc3 =  await votingTokenContract.getVotes(acc3.address);                    
             console.log("Acc2 voting power is ",votingPowerAcc2.toString());
            console.log("Acc3 voting power is ",votingPowerAcc3.toString());  
            await ballotContract.connect(acc2).vote(0, ethers.utils.parseEther("10"));  
             await ballotContract.connect(acc3).vote(1, ethers.utils.parseEther("10")); // acc3 votes 10 tokens on proposal 1
    const proposal0 = await ballotContract.proposals(0);
    const proposal1 = await ballotContract.proposals(1);
    
    console.log("Proposal 0 vote count after voting: ", proposal0.voteCount.toString());
    console.log("Proposal 1 vote count after voting: ", proposal1.voteCount.toString());
        });
    
        it("Should correctly tally votes on each proposal", async function () {
            await votingTokenContract.connect(acc1).mint(acc1.address, MINT_AMOUNT);
            const acc1Balance = await votingTokenContract.balanceOf(acc1.address);
            console.log("Acc1 balance before transfer: ", acc1Balance.toString());
            await votingTokenContract.connect(acc1).transfer(acc2.address, TRANSFER_AMOUNT);
            await votingTokenContract.connect(acc1).transfer(acc3.address, TRANSFER_AMOUNT);
            await ballotContract.connect(acc1).vote(0, ethers.utils.parseEther("10")); // acc1 votes 10 tokens on proposal 0
            await ballotContract.connect(acc2).vote(0, ethers.utils.parseEther("10")); // acc2 voted 10 tokens on proposal 0
            await ballotContract.connect(acc3).vote(1, ethers.utils.parseEther("10")); // acc3 votes 10 tokens on proposal 1
            const proposal0 = await ballotContract.proposals(0);
            const proposal1 = await ballotContract.proposals(1);  
            console.log("Proposal 0 vote count after voting: ", proposal0.voteCount.toString());
            console.log("Proposal 1 vote count after voting: ", proposal1.voteCount.toString());
            console.log("Final vote count for proposal 0: ", proposal0.voteCount.toString());
            console.log("Final vote count for proposal 1: ", proposal1.voteCount.toString());
            expect(proposal0.voteCount).to.equal(ethers.utils.parseEther("20")); 
            expect(proposal1.voteCount).to.equal(ethers.utils.parseEther("10")); 
        });
    });
});