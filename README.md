# Attestify CLI

A command-line interface tool for managing cryptographically secure mutual attestations between parties. This CLI implements a commitment lifecycle system with multi-signature verification, perfect for scenarios requiring verifiable agreements between parties.

## Features

- 🔐 Secure identity verification using cryptographic keys
- ✍️ Digital signature-based commitment lifecycle
- 🔄 Multi-state commitment management
- 🤝 Mutual attestation with verification
- 🔑 HD wallet integration with mnemonic support
- 🚀 Automated testing and lifecycle scripts

## Architecture

The attestify-cli works in conjunction with the attestify-backend service to provide a complete mutual attestation system:

```
┌─────────────┐      HTTPS      ┌──────────────┐
│ Attestify   │ ←------------→ │  Attestify    │
│    CLI      │      REST       │   Backend    │
└─────────────┘                 └──────────────┘
```

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v14 or higher)
- npm (v6 or higher)

### Setting up attestify-backend

1. Clone and setup the backend service:

```bash
# Clone the backend repository
git clone https://github.com/STarLo-rd/attestify-backend.git

# Navigate to project directory
cd attestify-backend

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env
# Edit .env with your configuration

# Start the service
npm start
```

## Installation

1. Clone and setup the CLI:

```bash
# Clone the repository
git clone https://github.com/STarLo-rd/attestify-cli.git

# Navigate to project directory
cd attestify-cli

# Install dependencies
npm install

```

## Usage Guide

### Quick Start (Automated Flow)

To experience the complete commitment lifecycle automatically:

```bash
npm run lifecycle
```

This script demonstrates the entire flow from registration to discharge, perfect for testing and understanding the system.

### Manual Flow

#### 1. User Management

Register committee member:

```bash
node index.js register \
  --username alice \
  --email alice@example.com \
  --password password123 \
  --mnemonic "kit novel carpet brief draft install mammal nation link fabric crouch boy"
```

Register committer:

```bash
node index.js register \
  --username bob \
  --email bob@example.com \
  --password password123 \
  --mnemonic "fitness spider can adjust pencil system wide margin regular pencil prize eager"
```

Login (store token for subsequent operations):

```bash
node index.js login --email alice@example.com --password password123
```

#### 2. Commitment Lifecycle

Create commitment:

```bash
node index.js create-commitment \
  --committer "677169348ac63afebc3bf5ee" \
  --assetName "Gold" \
  --quantity 100 \
  --unit "grams"
```

Acknowledge commitment (as committee):

```bash
node index.js acknowledge-commitment \
  --commitmentId "67716a338ac63afebc3bf5f3" \
  --mnemonic "kit novel carpet brief draft install mammal nation link fabric crouch boy"
```

Accept commitment (as committer):

```bash
node index.js accept-commitment \
  --commitmentId "67716a338ac63afebc3bf5f3" \
  --mnemonic "fitness spider can adjust pencil system wide margin regular pencil prize eager"
```

Discharge commitment:

```bash
node index.js discharge-commitment \
  --commitmentId "67716a338ac63afebc3bf5f3" \
  --mnemonic "fitness spider can adjust pencil system wide margin regular pencil prize eager"
```

### Commitment States

The commitment flows through the following states:

```
INITIATED → ACKNOWLEDGED → EFFECTIVE → DISCHARGED
     ↑            ↑            ↑           ↑
  Created    Committee     Committer    Committer
     by      signs and    accepts &    fulfills &
 Committer   acknowledges   signs      discharges
```

### Security Model

1. **Identity Verification**

   - HD wallet generation using mnemonics
   - Public-private key pair for each user
   - Extended public keys (xpub) for derivation

2. **Message Integrity**

   - Digital signatures for all state transitions
   - Cryptographic verification of all signatures
   - Hash-based message verification

3. **Non-repudiation**
   - Multi-signature requirement
   - Immutable state transitions

## Troubleshooting

Common issues and solutions:

1. **Connection Issues**

   ```
   Error: Unable to connect to backend
   ```

   - Verify backend service is running
   - Ensure network connectivity

2. **Authentication Errors**

   ```
   Error: Invalid token
   ```

   - Re-run login command
   - Check user credentials
   - Verify token expiration

3. **Signature Verification Failures**
   ```
   Error: Invalid signature
   ```
   - Ensure correct mnemonic usage
   - Verify user
   - Check commitment state transitions
