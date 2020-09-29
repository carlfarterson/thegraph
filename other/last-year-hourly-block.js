const Web3 = require('web3');
const HDWalletProvider = require('@truffle/hdwallet-provider');
const moment = require('moment');

const YAML = require('yaml');
const fs = require('fs');
const file = fs.readFileSync('./config.yaml', 'utf8')
const env = YAML.parse(file)

let web3 = new Web3(new HDWalletProvider(env['PRIVATE_KEY'], env['INFURA']))

let blockTime = 12
let hourInEpoch = 3600
let myArray = [];

;(async () => {

	// avg blocks in an hour
	blocksInHour = hourInEpoch / blockTime

	let block = await web3.eth.getBlock("latest");
	let currentTimestamp = block.timestamp;
	let currentBlock = block.number;

	for (var x = 1; x < 10000; x++) {
		currentBlock -= blocksInHour
		let newBlock = await web3.eth.getBlock(currentBlock)
		myArray.push({
			timestamp: newBlock.timestamp,
			block: newBlock.number
		});
		if (x % 50 === 0) {await new Promise(r => setTimeout(r, 2000));}
	}
	
	fs.writeFile("blocks.json", JSON.stringify(myArray), function(err) {
		if (err) throw err;
		console.log('complete');
	});

})()


/*

// Get timestamp of last hour
let lastHour = '2020-09-28T12:00:00Z'
let lastTimestamp = moment(lastHour).utc().unix();
console.log(lastTimestamp);  // 1601294400

// Get timestamp of recent block
let block = await web3.eth.getBlock("latest");
// console.log(block.timestamp);  	// 1601321983
// console.log(block.number);  	// 10952890

// Find difference between 1 and 2, divide by block time
blockTime = 12
diff = block.timestamp - lastTimestamp
blockDiff = Math.floor(diff / blockTime)

// Subtract difference from current block
blockGuess = block.number - blockDiff

// Get block with new number
let block2 = await web3.eth.getBlock(blockGuess)
console.log('Block guess fetched')
console.log(lastTimestamp - block2.timestamp)

*/
