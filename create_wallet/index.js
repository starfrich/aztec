const { ethers } = require("ethers");
const fs = require("fs");

function createRandomWallet() {
  const wallet = ethers.Wallet.createRandom();

  return {
    privateKey: wallet.privateKey,
    address: wallet.address,
  };
}

const walletData = createRandomWallet();
console.log(`Address: ${walletData.address} - Private Key: ${walletData.privateKey}`);

fs.writeFileSync(
  "wallet.json", 
  JSON.stringify(walletData, null, 2), 
  "utf8"
);

console.log("Your wallet data has been saved to wallet.json");