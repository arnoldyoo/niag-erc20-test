const Web3 = require('web3')
const fs = require('fs')
const path = require('path')
const EthereumTx = require('ethereumjs-tx')

const contractAddress = '0xF598d7f1f61814048f562f7c13a6Ef3626C5CED8'
const abiArray = JSON.parse(fs.readFileSync(path.resolve(__dirname, `./niag-contract-abi.json`), 'utf-8'))

async function main() {
  const web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/a4d005014f77410399b70b6f8b03025a'))
  const contract = new web3.eth.Contract(abiArray, contractAddress);

  // transfer
  // const sendAmount = 100;
  // const privateKey = new Buffer('4499ef873d42c5e6c631abc5e6caac93527e9aa4ddcd048b95d5a1b517e7b0cf', 'hex');
  // const publicKey = '0x331833dc72688Ff77C2cc761C18F105EdA24084d'
  // const toAddress = '0x01a2FA8d96436d8f962DBc2AE6c5D5316D51ED58'
  // const nonceHex = web3.utils.toHex( web3.eth.getTransactionCount(publicKey) );
  // const value = web3.utils.toHex(sendAmount);
  // var count = await web3.eth.getTransactionCount(publicKey);
  // const gasPriceGwei = 2;
  // const gasLimit = 3000000;
  // const chainId = 3;
  // const rawTransaction = {
  //     "from": publicKey,
  //     "nonce": "0x" + count.toString(16),
  //     "gasPrice": web3.utils.toHex(gasPriceGwei * 1e9),
  //     "gasLimit": web3.utils.toHex(gasLimit),
  //     "to": contractAddress,
  //     "value": "0x0",
  //     "data": contract.methods.transfer(toAddress, sendAmount).encodeABI(),
  //     "chainId": chainId
  // };
  //
  // const tx = new EthereumTx(rawTransaction);
  // tx.sign(privateKey);
  // const serializedTx = tx.serialize();
  //
  // const result = await web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'))
  // console.log(result)


  // get balance
  // owner 0x331833dc72688Ff77C2cc761C18F105EdA24084d
  const balance = await contract.methods.balanceOf('0x331833dc72688Ff77C2cc761C18F105EdA24084d').call()
  // account 1
  // const balance = await contract.methods.balanceOf('0x01a2FA8d96436d8f962DBc2AE6c5D5316D51ED58').call()

  console.log('balance : ', balance)

  // lock (address, when, amount)
  // const gasPriceGwei = 2;
  // const gasLimit = 3000000;
  // const chainId = 3;
  // const privateKey = new Buffer('4499ef873d42c5e6c631abc5e6caac93527e9aa4ddcd048b95d5a1b517e7b0cf', 'hex');
  // const publicKey = '0x331833dc72688Ff77C2cc761C18F105EdA24084d'
  // const toAddress = '0x01a2FA8d96436d8f962DBc2AE6c5D5316D51ED58'
  // const nonceHex = web3.utils.toHex( web3.eth.getTransactionCount(publicKey) );
  // var count = await web3.eth.getTransactionCount(publicKey);
  // const date = new Date()
  // const rawTransaction = {
  //     "from": publicKey,
  //     "nonce": "0x" + count.toString(16),
  //     "gasPrice": web3.utils.toHex(gasPriceGwei * 1e9),
  //     "gasLimit": web3.utils.toHex(gasLimit),
  //     "to": contractAddress,
  //     "value": "0x0",
  //     "data": contract.methods.lockUp(toAddress, date.setMinutes(date.getMinutes() + 2), 1000).encodeABI(),
  //     "chainId": chainId
  // };
  // const tx = new EthereumTx(rawTransaction);
  // tx.sign(privateKey);
  // const serializedTx = tx.serialize();
  //
  // const result = await web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'))
  // console.log(result)

  // releaseSingle(address)
  // const privateKey = new Buffer('4499ef873d42c5e6c631abc5e6caac93527e9aa4ddcd048b95d5a1b517e7b0cf', 'hex');
  // const publicKey = '0x331833dc72688Ff77C2cc761C18F105EdA24084d'
  // const toAddress = '0x01a2FA8d96436d8f962DBc2AE6c5D5316D51ED58'
  // const gasPriceGwei = 2;
  // const gasLimit = 8000000;
  // const chainId = 3;
  // const nonceHex = web3.utils.toHex( web3.eth.getTransactionCount(publicKey) );
  // const count = await web3.eth.getTransactionCount(publicKey);
  // console.log(count)
  // const rawTransaction = {
  //     "from": publicKey,
  //     "nonce": "0x" + count.toString(16),
  //     "gasPrice": web3.utils.toHex(gasPriceGwei * 1e9),
  //     "gasLimit": web3.utils.toHex(gasLimit),
  //     "to": contractAddress,
  //     "value": "0x0",
  //     "data": contract.methods.releaseSingle(toAddress).encodeABI(),
  //     "chainId": chainId
  // };
  // const tx = new EthereumTx(rawTransaction);
  // tx.sign(privateKey);
  // const serializedTx = tx.serialize();
  //
  // const result = await web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'))
  // console.log(result)

}

main()
