const Web3 = require('web3');
const contract = require('./contracts/compile'); // Update the path to reference 'compile.js'

const provider = new Web3.providers.HttpProvider('http://localhost:8545'); // Connect to a local Ethereum node or an Infura node
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Deploying the contract from account:', accounts[0]);

  const deployedContract = await new web3.eth.Contract(contract.abi)
    .deploy({ data: contract.bytecode })
    .send({ from: accounts[0], gas: '1000000' });

  console.log('Contract deployed to:', deployedContract.options.address);
};

deploy();
