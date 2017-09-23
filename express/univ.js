const artifact = require('/build/contracts/CredentialStore.json');
const contract = require('truffle-contract');
const CredentialStore = contract(artifact)

CredentialStore.setProvider(web3.currentProvider);

function addCandidateTest() {
    var result = CredentialStore.deployed().then(instance => instance.authorize.call('0xeda84d97e05480892d53a87c6eb3bce23362b3e7','Rice')).then(console.log)
    console.log(result);

    var name = document.getElementById('candidate_name').value;
    var did_graduate = document.getElementById('did_graduate').value;

    var table = document.getElementById("myTable");
    var row = table.insertRow(-1);
    var cell1 = row.insertCell(-1);
    var cell2 = row.insertCell(-1);
    cell1.innerHTML = name;
    cell2.innerHTML = did_graduate;

    //return res.toString()
}