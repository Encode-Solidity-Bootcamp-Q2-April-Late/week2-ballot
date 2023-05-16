# Week 3 Project Group 9 


## 1. Issuing Tokens

Voting tokens are given in the deploy script using the transfer function of the ERC20 contract. The transaction hash for this is 0x2b5ca163cca4bb0141c0c3cc87bec6a1435e5644f377dbfde585f0e585e8eb56

```
await votingTokenContract.connect(signer).transfer(acc2, TRANSFER_AMOUNT, {gasLimit: 3e7});
await votingTokenContract.connect(signer).transfer(acc3, TRANSFER_AMOUNT, {gasLimit: 3e7});
```
## 2. Delegating Voting Power
Voting power is delegated automatically to any address holding the voting token. The transaction hash again is '0x2b5ca163cca4bb0141c0c3cc87bec6a1435e5644f377dbfde585f0e585e8eb56'
```
function mint(address to, uint256 amount) public onlyRole(MINTER_ROLE) {
    _mint(to, amount);
    _delegate(to, to);
}

function _afterTokenTransfer(address from, address to, uint256 amount)
    internal
    override(ERC20, ERC20Votes)
{
    super._afterTokenTransfer(from, to, amount);
    _delegate(to, to);
}
```
## 3. Casting Votes
Votes are cast using the vote function of the Ballot contract. The transaction hash for a vote casting operation is 0x671a26eb3c456a2d5dd0b767126a59f410efda31c3090b0da5f53f5da4409e09

`await ballotContract.connect(signer).vote(1, ethers.utils.parseEther("10"), {gasLimit: 3e7});

## 4. Checking Vote Power

```const balance = await votingTokenContract.balanceOf(addr);
console.log(`Account balance: ${ethers.utils.formatEther(balance)} ETH`);```

##  5. Querying Voting Results
```
const [winningProposalNumber, winningVoteCount] = await contract.winningProposal();
console.log(`The winning proposal is: ${ethers.utils.parseBytes32String(winningProposal.name)} number of votes is ${winningVoteCount}`);
```



