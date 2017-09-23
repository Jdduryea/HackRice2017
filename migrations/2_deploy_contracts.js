var CredentialStore = artifacts.require("./CredentialStore.sol");

module.exports = function(deployer) {
	deployer.deploy(CredentialStore);
};

// CredentialStore.deployed().then(instance => instance.authorize('0xeda84d97e05480892d53a87c6eb3bce23362b3e7','Rice')).then(result => storeData = result)
