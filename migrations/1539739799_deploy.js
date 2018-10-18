const NIAG = artifacts.require("./NIAG");

module.exports = function(deployer) {
  deployer.deploy(NIAG);
};
