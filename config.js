var web3 = require('web3');
var web3_provider = 'http://localhost:8545';
var _web3 = new web3();
_web3.setProvider(new web3.providers.HttpProvider(web3_provider));
exports.web3 = _web3;

// This changes every time, we should automate this
exports.contract_addr = '0x6b5da7cdf1e4bb29f81f5f803433d2400e7d2888'
