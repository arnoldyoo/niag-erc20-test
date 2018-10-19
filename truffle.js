/*
 * NB: since truffle-hdwallet-provider 0.0.5 you must wrap HDWallet providers in a
 * function when declaring them. Failure to do so will cause commands to hang. ex:
 * ```
 * mainnet: {
 *     provider: function() {
 *       return new HDWalletProvider(mnemonic, 'https://mainnet.infura.io/<infura-key>')
 *     },
 *     network_id: '1',
 *     gas: 4500000,
 *     gasPrice: 10000000000,
 *   },
 */

const HDWalletProvider = require("truffle-hdwallet-provider");
const myTestMnemonic = "detect black art fiscal panther faculty usage axis frame interest engine spare";
const infra = 'http://localhost:7545'

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  // networks: {
  //   ropsten: {
  //     provider: function() {
  //       return new HDWalletProvider(myTestMnemonic, infra)
  //     },
  //     network_id: 3
  //   }
  // }
  networks: {
      development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "5774"
    }
  }
};
