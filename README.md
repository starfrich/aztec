# Aztec Sequencer Node Setup Guide

Welcome to the **Aztec Sequencer Node** setup guide!  
This tutorial will walk you through the essential requirements and steps to set up your node for the Aztec Public Testnet.

---

## ⚙️ Hardware Requirements

To run an Aztec Sequencer node, you'll need a machine with the following minimum specifications:

- **CPU:** 8-Core Processor
- **RAM:** 16 GiB
- **Storage:** 1 TB NVMe SSD
- **Network:** 25 Mbps upload/download bandwidth

> ✅ A typical consumer desktop or laptop can run this node without issue.

### 🖥️ Recommended VDS & Dedicated Server Providers

If you need to purchase a dedicated server, here are some recommended providers:

1. [DediOutlet](https://dedioutlet.com/secure/aff.php?aff=154)
2. [FiberState](https://billing.fiberstate.com/aff.php?aff=175)
3. [Servarica](https://clients.servarica.com/aff.php?aff=973)

---

## 💸 Will I Earn Real Rewards for Running a Node?

**No.**  
The Public Testnet is strictly a dry-run environment.  
There are no token incentives and no real economic stakes at this stage — but your feedback and uptime will play a vital role in ensuring a reliable and secure mainnet launch.

---

## 🛠️ Installation & Configuration

> **Before You Start:**  
> - You need ETH Sepolia (at least 0.1 ETH)
> - You need ETH Sepolia RPC from: Alchemy/Infura/DRPC
> - You need ETH Beacon Sepolia RPC from: DRPC

### Step 1: Install Dependencies

```bash
# Install dependencies
sudo apt update -qy
sudo apt upgrade -qy
sudo apt install -y wget npm jq

# Install Docker
curl -fsSL https://get.docker.com | sh
sudo systemctl start docker
sudo systemctl enable docker
sudo usermod -aG docker $USER

# Verify all dependencies
npm -v
node -v
docker -v
docker compose version
```

### Step 2: Clone Repository

```bash
# Clone
git clone https://github.com/starfrich/aztec.git
```

### Step 3: Create Wallet

```bash
# Create Wallet
cd aztec/create_wallet && npm init -y && npm i
node index.js

# Check wallet data
cat wallet.json

# 💰 Important: Fund your wallet with ETH Sepolia
```

### Step 4: Configure Docker Compose

```bash
# Create Docker Compose File
cd ~/aztec
cp example-docker-compose.yml docker-compose.yml

# Get your IP
curl -4 ifconfig.me

# Edit the config file
nano docker-compose.yml
# Fill it with the correct value and format
# CTRL + X then Y and ENTER to save
```

### Step 5: Install Aztec

```bash
# Install Aztec
bash -i <(curl -s https://install.aztec.network)
# Click Y when prompted
source /root/.bash_profile

# Verify version
aztec -V

# Update Aztec
aztec-up alpha-testnet

# Run the Sequencer
docker compose up -d

# Check logs
docker logs -f aztec-node
```

### Updating Sequencer Node
```bash
docker compose down
```

```bash
aztec-up alpha-testnet
```

```bash
docker compose up -d
```

---

## 🧑‍🔧 Apprentice Role Tasks

### Task 1: Get Block Number

```bash
curl -s -X POST -H 'Content-Type: application/json' \
-d '{"jsonrpc":"2.0","method":"node_getL2Tips","params":[],"id":67}' \
http://localhost:8080 | jq -r ".result.proven.number"
```

### Task 2: Generate Proof

```bash
curl -s -X POST -H 'Content-Type: application/json' \
-d '{"jsonrpc":"2.0","method":"node_getArchiveSiblingPath","params":["BLOCK_NUMBER","BLOCK_NUMBER"],"id":67}' \
http://localhost:8080 | jq -r ".result"
```

### Task 3: Discord Registration

1. Go to Aztec Discord: https://discord.com/channels/1144692727120937080/1367196595866828982/1367323893324582954
2. Type: `/operator start address: block-number: proof:`
   - **address**: Your address from wallet.json
   - **block-number**: Block number from Task 1
   - **proof**: Proof generated in Task 2

---

## 🔐 Register as Validator

```bash
aztec add-l1-validator \
  --l1-rpc-urls https://eth-sepolia.g.example.com/example/your-key \
  --private-key your-private-key \
  --attester your-validator-address \
  --proposer-eoa your-validator-address \
  --staking-asset-handler 0xF739D03e98e23A7B65940848aBA8921fF3bAc4b2 \
  --l1-chain-id 11155111
```

**Fill in:**
- **l1-rpc-urls**: Your ETH Sepolia RPC
- **private-key**: Your private key from wallet.json
- **attester & proposer-eoa**: Your address from wallet.json

> **Note:** You may see a warning when trying to register as a validator. To maintain network health there is a daily quota for validators to join the validator set. If you are not able to join, it could mean that today's quota of validators has already been added to the set. If you see this, you can try again later. Read our [blog post](https://aztec.network/blog/what-is-aztec-testnet) for more info.