const EthDater = require('ethereum-block-by-date');
const Web3 = require('web3');
const HDWalletProvider = require('@truffle/hdwallet-provider');

const YAML = require('yaml');
const fs = require('fs');
const file = fs.readFileSync('./config.yaml', 'utf8')
const env = YAML.parse(file)

let web3 = new Web3(new HDWalletProvider(env['PRIVATE_KEY'], env['INFURA']))
const dater = new EthDater(web3);



;(async () => {

// Get blocks by duration
	console.log("before blocks");
	let blocks = await dater.getEvery(
		'weeks',
		'2019-09-02T12:00:00Z', // start date
		'2019-09-30T12:00:00Z', // end date
	);
        console.log("After blocks")
	console.log(blocks);
	console.log(dater.requests);

	fs.writeFile("results.json", JSON.stringify(blocks), function(err) {
		if (err) throw err;
		console.log('complete');
	});

})()
