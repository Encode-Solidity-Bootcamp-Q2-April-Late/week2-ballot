# Week 2 Assignment
Group Members: Kit Sidhu, Hussam Alsaliti, Zachary Halaby, Xuelan Wu

### We tried using Goerli testnet and failed due to network congestion and high gas prices. We then switched to Sepolia and added a gas limit and found success. ##
### Voting Rights

PS C: \Users\Zacha\ Fresh\scripts> yarn run ts-node -files Ballottest.ts Tea Coffee Kombucha Coca
la <br />
Connected to wallet address 0x62BEC4A6481B8235f374798296AF511aeb737950 <br />
Connected to the block number 3446121 <br />
Connected to signer address 0×62BEC4A6481B8235f37479829bAF511aeb737950 <br />
Account balance: 0.040476359947577797 ETH <br />
'C: \ Users\\Zacha\ |Fresh\ |node \_modules\|ts-node\|dist\\bin.js' <br />
'C: \Users\ \Zacha\\Fresh\\scripts\\Ballottest.ts <br />
'Tea', <br />
'Coffee', <br />
'Kombucha', <br />
'CocaCola' <br />
1 <br />
Deploying Ballot contract <br />
Proposals: <br />
Proposal N. 1: Tea <br />
Proposal N. 2: Coffee <br />
Proposal N. 3: Kombucha <br />
Proposal N. 4: CocaCola <br />

The deploy transaction was mined in block 3446123 <br />
The ballot contract was deployed at address Oxa8fDFf47F492F96A723eCe2e6d7B994AA22A60A <br />
The chairperson is 0x62BEC4A6481B8235f37479829bAF511aeb737950 <br />
Enter addresses separated by commas: 0×5f6AEB645F61dF1274A45B53F160B68b09A6608, 0x998219756908BOFCe <br />
03EB379706c4C4caC93EED, 0x95C07028025848f840BA1d76952666229eae853| <br />

Giving voting rights to 0x5f6AEB645F61dF1274A45B53F160B68b09A6608 <br />
Transaction completed at block 3446126 with tx hash 0x69205998a3502a3dee59f83fdafe7c1a38653da2d0de
08627030377683a <br />
Transaction completed at block 3446126 with block hash 0×13d8f412083c02fdda98ec63e53461b9d5cd3630
95c30143e03935f06528ed <br />
Giving voting rights to 0x998219756908BOFCe03B379706cd4C4caC93EED <br />
Transaction completed at block 3446127 with tx hash 0x060b017da79ec0250a0bb84e202c49b4056da223712
4cb9115f544b69c8789 <br />
Transaction completed at block 3446127 with block hash 0×4d823169a502da98c1bb3c14a991c2c163÷58573
031ca9f4b495d117d5e4ed <br />
Giving voting rights to 0x95C07028025848f840BA1d76952666229eae853 <br />
Transaction completed at block 3446128 with tx hash 0x896521bf7340772999645666ca9ca6fa072c7a12506
4af732a679d9c7dd9af <br />
Transaction completed at block 3446128 with block hash Oxe4de9c50793556bbdb4186646af232399462962
7d01c7a9ec09fdc22d3751 <br />

### Casting Votes
ballot % yarn hardhat run scripts/voterTest.ts <br />
✔ Enter the contract address: … 0xa8fDFf47F492bF96A723eCe2e6d7B994AA22A60A <br />
✔ Enter the ABI: … [{"inputs":[{"internalType":"bytes32[]","name":"proposalNames","type":"bytes32[]"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"chairperson","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"}],"name":"delegate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getNumProposals","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"voter","type":"address"}],"name":"giveRightToVote","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"proposals","outputs":[{"internalType":"bytes32","name":"name","type":"bytes32"},{"internalType":"uint256","name":"voteCount","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"proposal","type":"uint256"}],"name":"vote","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"voters","outputs":[{"internalType":"uint256","name":"weight","type":"uint256"},{"internalType":"bool","name":"voted","type":"bool"},{"internalType":"address","name":"delegate","type":"address"},{"internalType":"uint256","name":"vote","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"winnerName","outputs":[{"internalType":"bytes32","name":"winnerName","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"winningProposal","outputs":[{"internalType":"uint256","name":"winningProposal","type":"uint256"}],"stateMutability":"view","type":"function"}] <br />
Connected to wallet address 0x95C07028025848f840BA1d7695266E6229eae853 <br />
Account balance: 1.485058353432200723 ETH <br />
Proposals: <br />
Proposal N. 0: Tea <br />
Proposal N. 1: Coffee <br />
Proposal N. 2: Kombucha <br />
Proposal N. 3: CocaCola <br />
✔ Enter your address: … 0x95C07028025848f840BA1d7695266E6229eae853 <br />
Address 0x95C07028025848f840BA1d7695266E6229eae853 has voting rights. <br />
✔ Enter 1 to vote, 2 to delegate, or anything else to quit: … 1 <br />
✔ Enter the number of the proposal to vote for: … 0 <br />
Transaction submitted with hash: 0x710e9b945bfcd2d3c96137210f31445154df1747eafc2785f083a94ed8d114ea <br />
✔ Enter 1 to query the winning proposal, or anything else to quit: … 1 <br />
The winning proposal is: Tea 


### Delegating Votes
PS C:\Users\Zacha\Fresh\scripts> yarn hardhat run voterTest.ts <br />
√ Enter the contract address: ... 0xa8fDFf47F492bF96A723eCe2e6d7B994AA22A60A <br />
√ Enter the ABI: ... [{"inputs":[{"internalType":"bytes32[]","name":"proposalNames","type":"bytes32[]"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"chairperson","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"}],"name":"delegate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getNumProposals","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"voter","type":"address"}],"name":"giveRightToVote","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"proposals","outputs":[{"internalType":"bytes32","name":"name","type":"bytes32"},{"internalType":"uint256","name":"voteCount","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"proposal","type":"uint256"}],"name":"vote","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"voters","outputs":[{"internalType":"uint256","name":"weight","type":"uint256"},{"internalType":"bool","name":"voted","type":"bool"},{"internalType":"address","name":"delegate","type":"address"},{"internalType":"uint256","name":"vote","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"winnerName","outputs":[{"internalType":"bytes32","name":"winnerName_","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"winningProposal","outputs":[{"internalType":"uint256","name":"winningProposal_","type":"uint256"}],"stateMutability":"view","type":"function"}] <br />
Connected to wallet address 0x62BEC4A6481B8235f37479829bAF511aeb737950 <br />
Account balance: 0.038369399937745317 ETH <br />
Proposals:  <br />
Proposal N. 1: Tea <br />
Proposal N. 2: Coffee <br />
Proposal N. 3: Kombucha <br />
Proposal N. 4: CocaCola <br />
Address 0x62BEC4A6481B8235f37479829bAF511aeb737950 has voting rights. <br />
√ Enter 1 to vote, 2 to delegate, or anything else to quit: ... 2 <br />
√ Enter the address to delegate your vote to: ... 0x067c158F0bA8E8c90cB72045Cdf82988d8243b65      <br />  
Transaction submitted with hash: 0x0d8599b11c08a43931d9e55cb037969ccb8314fbe12fc1d6e0af898230fa8d9f <br />




### Querying Results
Deploying Ballot contract <br />
Proposals:  <br />
Proposal N. 1: Tea <br />
Proposal N. 3: CocaCola <br />
Address 0x62BEC4A6481B8235f37479829bAF511aeb737950 has voting rights. <br />
√ Enter 1 to vote, 2 to delegate, or anything else to quit: ... 1 <br />
√ Enter the number of the proposal to vote for: ... 2 <br />
Transaction submitted with hash: 0xb5974b49d3557aa6d70cb1dc01d8ef1d52522ad0f62763c737eded5cf91aeddb√ Enter 1 to query the winning proposal, or anything else to quit: ... 1 <br />
The winning proposal is: Kombucha <br />

