# Week 2 Assignment

### Voting Rights

PS C: \Users\Zacha\ Fresh\scripts> yarn run ts-node -files Ballottest.ts Tea Coffee Kombucha Coca
la
Connected to wallet address 0x62BEC4A6481B8235f374798296AF511aeb737950
Connected to the block number 3446121
Connected to signer address 0×62BEC4A6481B8235f37479829bAF511aeb737950
Account balance: 0.040476359947577797 ETH
'C: \ Users\\Zacha\ |Fresh\ |node \_modules\|ts-node\|dist\\bin.js'
'C: \Users\ \Zacha\\Fresh\\scripts\\Ballottest.ts
'Tea',
'Coffee',
'Kombucha',
'CocaCola'
1
Deploying Ballot contract
Proposals:
Proposal N. 1: Tea
Proposal N. 2: Coffee
Proposal N. 3: Kombucha
Proposal N. 4: CocaCola

The deploy transaction was mined in block 3446123
The ballot contract was deployed at address Oxa8fDFf47F492F96A723eCe2e6d7B994AA22A60A
The chairperson is 0x62BEC4A6481B8235f37479829bAF511aeb737950
Enter addresses separated by commas: 0×5f6AEB645F61dF1274A45B53F160B68b09A6608, 0x998219756908BOFCe
03EB379706c4C4caC93EED, 0x95C07028025848f840BA1d76952666229eae853|

Giving voting rights to 0x5f6AEB645F61dF1274A45B53F160B68b09A6608
Transaction completed at block 3446126 with tx hash 0x69205998a3502a3dee59f83fdafe7c1a38653da2d0de
08627030377683a
Transaction completed at block 3446126 with block hash 0×13d8f412083c02fdda98ec63e53461b9d5cd3630
95c30143e03935f06528ed
Giving voting rights to 0x998219756908BOFCe03B379706cd4C4caC93EED
Transaction completed at block 3446127 with tx hash 0x060b017da79ec0250a0bb84e202c49b4056da223712
4cb9115f544b69c8789
Transaction completed at block 3446127 with block hash 0×4d823169a502da98c1bb3c14a991c2c163÷58573
031ca9f4b495d117d5e4ed
Giving voting rights to 0x95C07028025848f840BA1d76952666229eae853
Transaction completed at block 3446128 with tx hash 0x896521bf7340772999645666ca9ca6fa072c7a12506
4af732a679d9c7dd9af
Transaction completed at block 3446128 with block hash Oxe4de9c50793556bbdb4186646af232399462962
7d01c7a9ec09fdc22d3751

### Casting Votes

### Delegating Votes
ballot % yarn hardhat run scripts/voterTest.ts
✔ Enter the contract address: … 0xa8fDFf47F492bF96A723eCe2e6d7B994AA22A60A
✔ Enter the ABI: … [{"inputs":[{"internalType":"bytes32[]","name":"proposalNames","type":"bytes32[]"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"chairperson","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"}],"name":"delegate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getNumProposals","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"voter","type":"address"}],"name":"giveRightToVote","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"proposals","outputs":[{"internalType":"bytes32","name":"name","type":"bytes32"},{"internalType":"uint256","name":"voteCount","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"proposal","type":"uint256"}],"name":"vote","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"voters","outputs":[{"internalType":"uint256","name":"weight","type":"uint256"},{"internalType":"bool","name":"voted","type":"bool"},{"internalType":"address","name":"delegate","type":"address"},{"internalType":"uint256","name":"vote","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"winnerName","outputs":[{"internalType":"bytes32","name":"winnerName","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"winningProposal","outputs":[{"internalType":"uint256","name":"winningProposal","type":"uint256"}],"stateMutability":"view","type":"function"}]
Connected to wallet address 0x95C07028025848f840BA1d7695266E6229eae853
Account balance: 1.485102313932405872 ETH
Proposals: 
Proposal N. 0: Tea
Proposal N. 1: Coffee
Proposal N. 2: Kombucha
Proposal N. 3: CocaCola
✔ Enter your address: … 0x95C07028025848f840BA1d7695266E6229eae853
Address 0x95C07028025848f840BA1d7695266E6229eae853 has voting rights.
✔ Enter 1 to vote, 2 to delegate, or anything else to quit: … 2
✔ Enter the address to delegate your vote to: … 0x5f6AEB64b5F61dF1274A45B53F160B68b09A6608
Transaction submitted with hash: 0xe779f66ddaf894e72d51d28ac7efa87cf5a404e02cfe5169c36bc7e062383528
✔ Enter 1 to query the winning proposal, or anything else to quit: … 1
The winning proposal is: Kombucha

### Querying Results
