// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

// The ERC20 interface from the token contract.
interface IMyVoteToken{
    function getPastVotes(address, uint256) external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
}

contract Ballot {
    // Voter struct will keep track of whether a voter has voted,
    // the weight of their vote, which proposal they voted for,
    // and if they have delegated their vote to someone else.
    struct Voter {
        uint weight; 
        bool voted;  
        address delegate; 
        uint vote;   
    }

    // Proposal struct will keep track of each proposal's name 
    // and the number of voteCount it has received.
    struct Proposal {
        bytes32 name;   
        uint voteCount; 
        uint256 endTime; // added endTime to set a duration for each proposal's voting period.
    }

    // tokenContract will keep track of the ERC20 token used for voting.
    IMyVoteToken public tokenContract;    
    Proposal[] public proposals;
    uint256 public targetBlockNumber;

    // Mapping to track how much voting power has been spent by each address.
    mapping(address => uint256) public  votingPowerSpent;

    // Added a mapping to track a voter's information.
    mapping(address => Voter) public voters;

    // The constructor will initiate the ballot with a list of proposal names, 
    // the ERC20 token contract address, and the target block number.
    constructor(bytes32[] memory proposalNames, address _tokenContract, uint256 _targetBlockNumber) {
        tokenContract = IMyVoteToken(_tokenContract);
        targetBlockNumber = _targetBlockNumber;
        for (uint i = 0; i < proposalNames.length; i++) {
            // Added an endTime to each proposal to indicate when voting period ends.
            proposals.push(Proposal({
                name: proposalNames[i],
                voteCount: 0,
                endTime: block.timestamp + _targetBlockNumber // Voting period will last until targetBlockNumber seconds have passed since contract deployment.
            }));
        }
    }

    // The vote function allows a voter to vote on a proposal.
    // The voter's token balance at the time of voting is used as the weight of their vote.
    function vote(uint proposal, uint amount) external {
        require(tokenContract.getPastVotes(msg.sender,block.number-1) >= amount);
        require(tokenContract.balanceOf(msg.sender) >= amount, "Not enough tokens to vote with this weight");
        require(!voters[msg.sender].voted, "You have already voted");
        require(proposals[proposal].endTime > block.timestamp, "Voting period for this proposal has ended");

        voters[msg.sender].weight = amount;
        voters[msg.sender].voted = true;
        voters[msg.sender].vote = proposal;

        proposals[proposal].voteCount += amount;
        votingPowerSpent[msg.sender] += amount;
    }

    // winningProposal function will return the index of the proposal with the most votes.
    function winningProposal() public view returns (uint winningProposal_) {
        uint winningVoteCount = 0;
        for (uint p = 0; p < proposals.length; p++) {
            if (proposals[p].voteCount > winningVoteCount) {
                            winningVoteCount = proposals[p].voteCount;
                winningProposal_ = p;
            }
        }
    }

    // winnerName function will return the name of the proposal with the most votes.
    function winnerName() external view returns (bytes32 winnerName_) {
        winnerName_ = proposals[winningProposal()].name;
    }
}
    
