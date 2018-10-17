const NIAG = artifacts.require("./NIAG");
const NIAGTimelock = artifacts.require('./NIAGTimelock')

module.exports = function(deployer) {
  deployer.deploy(NIAG).then(() => {
      deployer.deploy(NIAGTimelock);
  })
};
