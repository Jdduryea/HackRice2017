





// function is 75043ebb727d40f058216f045fdfcbf464c49165cb66506c80fd4e12c956fb1c
function addCandidate() {
  var config = require('./config.js');
  config.web3.eth.X
  var call = '75043ebb727d40f058216f045fdfcbf464c49165cb66506c80fd4e12c956fb1c00000000000000000000000000000000000000000000000000000000000000000000000000'
 // var call = '0x771602f700000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000002'
  var to = config.contract_addr;
  var res = config.web3.eth.call({ to: to, data: call });
}


const CredentialStore = artifacts.require("./CredentialStore.sol");

function addCandidateTest() {

    // var config = require('./config.js');
    // config.web3.eth.X
    // var call = '75043ebb727d40f058216f045fdfcbf464c49165cb66506c80fd4e12c956fb1c00000000000000000000000000000000000000000000000000000000000000000000000000'
    // // var call = '0x771602f700000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000002'
    // var to = config.contract_addr;
    // var res = config.web3.eth.call({ to: to, data: call });


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