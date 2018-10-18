const Web3 = require('web3')
const fs = require('fs')
const path = require('path')

const abiAddress = '0x006A06a4Bf940DcacA70C5D19BEAB33A56e9237D'
const abiArray = JSON.parse(fs.readFileSync(path.resolve(__dirname, `./niag-contract-abi.json`), 'utf-8'))

async function main() {
  const web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/a4d005014f77410399b70b6f8b03025a'))
  web3.eth.isMining().then(console.log)
}

main()
