var CredentialStore = artifacts.require("./CredentialStore.sol");

module.exports = function(deployer) {
	deployer.deploy(CredentialStore);
};
