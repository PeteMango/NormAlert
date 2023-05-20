const path = require('path');
const fs = require('fs');
const solc = require('solc');

const contractPath = path.resolve(__dirname, 'ethContract.sol');
const contractSource = fs.readFileSync(contractPath, 'utf8');

const input = {
  language: 'Solidity',
  sources: {
    'ethContract.sol': {
      content: contractSource,
    },
  },
  settings: {
    outputSelection: {
      '*': {
        '*': ['*'],
      },
    },
  },
};

const output = JSON.parse(solc.compile(JSON.stringify(input)));

const contractName = 'MyContract'; // Update with your contract name

if (output.errors && output.errors.length) {
  console.error('Compilation errors:');
  output.errors.forEach((error) => {
    console.error(error.formattedMessage);
  });
} else {
  const contractBytecode = output.contracts['ethContract.sol'][contractName].evm.bytecode.object;
  const contractABI = output.contracts['ethContract.sol'][contractName].abi;

  module.exports = {
    bytecode: contractBytecode,
    abi: contractABI,
  };
}

console.log('Compilation output:', output);