const Web3 = require('web3')
const fs = require('fs')
const path = require('path')
const EthereumTx = require('ethereumjs-tx')

const contractAddress = '0x346E87bd11c40393012E488AF296BE47A7a89FBe'
const abiArray = JSON.parse(fs.readFileSync(path.resolve(__dirname, `./../build/contracts/NIAG.json`), 'utf-8')).abi


async function log() {
  const web3 = new Web3(new Web3.providers.WebsocketProvider('http://127.0.0.1:7545'));
  const contract = new web3.eth.Contract(abiArray, contractAddress);

  await contract.events.allEvents({ fromBlock: 'latest' }, function(error, result) {
    console.log('==============================')
    console.log(result)
    console.log('==============================')
  });
}


async function main() {
  const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'))
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
  // const balance = await contract.methods.balanceOf('0xe5A019fAb13dBBa56C0C0d695C099bDE1FB76a9B').call()
  // account 1
  const balance = await contract.methods.balanceOf('0x7CA5cb04CFe18B3fcEf5EaCDFf5c3EFE675B1De9').call()
  console.log('balance : ', balance)

  // lock (address, when, amount)
  // const gasPriceGwei = 2;
  // const gasLimit = 6721975;
  // const chainId = 5774;
  // const privateKey = new Buffer('7482375086b5720a301f49572da24384ce9524cd2bd138b95492a5058d146aef', 'hex');
  // const publicKey = '0xe5A019fAb13dBBa56C0C0d695C099bDE1FB76a9B'
  // const toAddress = '0x7CA5cb04CFe18B3fcEf5EaCDFf5c3EFE675B1De9'
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
  //     "data": contract.methods.lockUp(toAddress, new Date().getTime(), 1000).encodeABI(),
  //     "chainId": chainId
  // };
  // const tx = new EthereumTx(rawTransaction);
  // tx.sign(privateKey);
  // const serializedTx = tx.serialize();
  // const result = await web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'))
  // console.log(result)

  // release(address)
  // const privateKey = new Buffer('7482375086b5720a301f49572da24384ce9524cd2bd138b95492a5058d146aef', 'hex');
  // const publicKey = '0xe5A019fAb13dBBa56C0C0d695C099bDE1FB76a9B'
  // const toAddress = '0x7CA5cb04CFe18B3fcEf5EaCDFf5c3EFE675B1De9'
  // const gasPriceGwei = 3;
  // const gasLimit = 6721975;
  // const chainId = 5774;
  // const nonceHex = web3.utils.toHex( web3.eth.getTransactionCount(publicKey) );
  // const count = await web3.eth.getTransactionCount(publicKey);
  // const rawTransaction = {
  //     "from": publicKey,
  //     "nonce": "0x" + count.toString(16),
  //     "gasPrice": web3.utils.toHex(gasPriceGwei * 1e9),
  //     "gasLimit": web3.utils.toHex(gasLimit),
  //     "to": contractAddress,
  //     "value": "0x0",
  //     "data": contract.methods.release(toAddress).encodeABI(),
  //     "chainId": chainId
  // };
  // const tx = new EthereumTx(rawTransaction);
  // tx.sign(privateKey);
  // const serializedTx = tx.serialize();
  //
  // const result = await web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'))
  // console.log(result)

  // freeze
  // const privateKey = new Buffer('7482375086b5720a301f49572da24384ce9524cd2bd138b95492a5058d146aef', 'hex');
  // const publicKey = '0xe5A019fAb13dBBa56C0C0d695C099bDE1FB76a9B'
  // const toAddress = '0x7CA5cb04CFe18B3fcEf5EaCDFf5c3EFE675B1De9'
  // const gasPriceGwei = 3;
  // const gasLimit = 6721975;
  // const chainId = 5774;
  // const nonceHex = web3.utils.toHex( web3.eth.getTransactionCount(publicKey) );
  // const count = await web3.eth.getTransactionCount(publicKey);
  // const rawTransaction = {
  //     "from": publicKey,
  //     "nonce": "0x" + count.toString(16),
  //     "gasPrice": web3.utils.toHex(gasPriceGwei * 1e9),
  //     "gasLimit": web3.utils.toHex(gasLimit),
  //     "to": contractAddress,
  //     "value": "0x0",
  //     "data": contract.methods.freezeAccount(toAddress).encodeABI(),
  //     "chainId": chainId
  // };
  // const tx = new EthereumTx(rawTransaction);
  // tx.sign(privateKey);
  // const serializedTx = tx.serialize();
  //
  // const result = await web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'))
  // console.log(result)

}
log()
main()
