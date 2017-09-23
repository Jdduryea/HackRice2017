const fs = require('fs')
const config = JSON.parse(fs.readFileSync('./config.json'));

module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: config.ports.testrpc,
      network_id: "*" // Match any network id
    }
  }
};
