var CredentialStore = artifacts.require("./CredentialStore.sol");

var fs = require('fs');

module.exports = function(deployer, network, accounts) {
	let accountConfig = {
		"owner": accounts[0],
		"universities": accounts.slice(1, 4),
		"universityNames": ["Rice University", "Duke University", "University of Texas at Austin"],
		"students": accounts.slice(4, 10),
		"studentNames": ["Yorke Rhodes IV", "Jack Duryea", "Kunal Shah", "Shashank Mahesh", "Beethoven", "Mozart"]
	};

	deployer.deploy(CredentialStore)
	.then(async () => { 
		const credentialstore = await CredentialStore.deployed();
		for (i = 0; i < 3; i++) {
			await credentialstore.authorizeUniversity(accountConfig.universities[i], accountConfig.universityNames[i], {from: accountConfig.owner});
		}
		for (i = 0; i < 6; i++) {
			await credentialstore.identifyStudent(accountConfig.students[i], accountConfig.studentNames[i], {from: accountConfig.owner});
		}
	});

	fs.writeFileSync("./build/accounts.json", JSON.stringify(accountConfig, null, 2));
};

// CredentialStore.deployed().then(instance => instance.authorize('0xeda84d97e05480892d53a87c6eb3bce23362b3e7','Rice')).then(result => storeData = result)
