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

## RPC

Most free RPC services have limitations but don’t worry, we’ve got you covered. We have few packages for rent starts from $15/week, DM me on Telegram: [starfish](https://t.me/starfishprerich) or [robapuros](https://t.me/Robapuros) and we’ll work something out.
 
> Current availability: **10 IPs left**

> Once the all slots are filled, you’ll need to wait **3–7 days** for the next available RPC. 

> 📌 **First Come, First Served** — no booking system. 


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

> If you already have wallet, you can skip this step.

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

### Step 5: Run Aztec Sequencer

# Run the Sequencer
```bash
docker compose up -d
```

# Check logs
```bash
docker logs -f aztec-node
```

### Updating Sequencer Node
```bash
docker compose down
```

```bash
aztec-up alpha-testnet
```
> If aztec not found, you need to download aztec: ```bash -i <(curl -s https://install.aztec.network)``` then re-run the command above.

```bash
docker compose up -d
```

---

## 🧑‍🔧 Apprentice Role Tasks

### Task 1: Get Block Number

```bash
curl -s -X POST -H 'Content-Type: application/json' \
-d '{"jsonrpc":"2.0","method":"node_getL2Tips","params":[],"id":67}' \
http://localhost:8080 | jq -r '"Block Number: " + (.result.proven.number | tostring)'
```

### Task 2: Generate Proof

```bash
curl -s -X POST -H 'Content-Type: application/json' \
-d '{"jsonrpc":"2.0","method":"node_getArchiveSiblingPath","params":["BLOCK_NUMBER","BLOCK_NUMBER"],"id":67}' \
http://localhost:8080 | jq -r '"Proof: " + .result'
```

### Task 3: Discord Registration

1. Go to Aztec Discord: https://discord.com/channels/1144692727120937080/1367196595866828982/1367323893324582954
2. Type: `/operator start address: block-number: proof:`
   - **address**: Your address from wallet.json
   - **block-number**: Block number from Task 1
   - **proof**: Proof generated in Task 2

---

### Task 4: Upgrade Apprentice to Guardian

1. Go to Aztec Discord: https://discord.com/channels/1144692727120937080/1370120277752549487
2. Type: `/checkip ip:123.123.123.123`
   - **ip**: your ip address that used to run sequencer

> If you cant upgrade your roles, it means you need to wait next batch.

---

---

### Peer ID

Find your peer id by this command:

```bash
docker logs $(docker ps -q --filter name=aztec-node | head -n 1) 2>&1 | grep -i "peerId" | grep -o '"peerId":"[^"]*"' | cut -d'"' -f4 | head -n 1
```

You can check your sequencer info on nethermind https://aztec.nethermind.io

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

---

## Known Issues

### 1. **ERROR: archiver Error syncing archiver: No blob bodies found for block xxxxx**

This means you need to change your **Beacon Sepolia RPC**.
You can either switch to another provider, [self-host](https://github.com/starfrich/eth-beacon-sepolia), or rent from [someone](https://t.me/starfishprerich).

---

### 2. **Rollup__ManaLimitExceeded**

This means your free RPC has hit the maximum credit limit.  
You can either switch to another provider, [self-host](https://github.com/starfrich/eth-beacon-sepolia), or rent from [someone](https://t.me/starfishprerich).

---

### 3. **WARN: p2p:tx_validator:tx_metadata Rejecting tx .......................**

No worries — this is normal and safe to ignore.

---

### 4. **Peer ID not showing on [Nethermind Peer Checker](https://aztec.nethermind.io)**

There are 2 possible reasons:
- Try running `telnet your_ip 40400`.  
  If it’s not connected, it means your port is not open.
- As long as your logs show that you’re connected to peers, it’s fine.

---

### 5. **ERROR: p2p:reqresp Unexpected error sending request to peer: CodeError: .......................**

Run the following command:

```bash
docker compose down && aztec-up alpha-testnet && docker compose up -d
