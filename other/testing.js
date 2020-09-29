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

/*
Goal: get block of last hour
6. If timestamp is within 15 seconds, stop?
*/


;(async () => {

	// 1. Get timestamp of last hour
	let lastHour = '2020-09-28T12:00:00Z'
	let lastTimestamp = moment(lastHour).utc().unix();
	console.log(lastTimestamp);  // 1601294400

	// 2. Get timestamp of recent block
	let block = await web3.eth.getBlock("latest");
	// console.log(block.timestamp);  	// 1601321983
	// console.log(block.number);  	// 10952890

	// 3. Find difference between 1 and 2, divide by block time
	blockTime = 12
	diff = block.timestamp - lastTimestamp
	blockDiff = Math.floor(diff / blockTime)

	// Subtract difference from current block
	blockGuess = block.number - blockDiff

	// Get block with new number
	let block2 = await web3.eth.getBlock(blockGuess)
	console.log('Block guess fetched')
	console.log(lastTimestamp - block2.timestamp)




	// let block = await web3.eth.getBlockNumber();
	// console.log(block)
})()
