#!/usr/bin/env node
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { register, login } from './src/commands/auth.js';
import { 
  createCommitment, 
  acknowledgeCommitment,
  acceptCommitment,
  dischargeCommitment 
} from './src/commands/commitments.js';

yargs(hideBin(process.argv))
  .command('register', 'Register a new user', {
    username: {
      describe: 'Username',
      demandOption: true,
      type: 'string'
    },
    email: {
      describe: 'Email address',
      demandOption: true,
      type: 'string'
    },
    password: {
      describe: 'Password',
      demandOption: true,
      type: 'string'
    },
    mnemonic: {
      describe: 'Mnemonic phrase',
      demandOption: true,
      type: 'string'
    }
  }, register)
  .command('login', 'Login to the system', {
    email: {
      describe: 'Email address',
      demandOption: true,
      type: 'string'
    },
    password: {
      describe: 'Password',
      demandOption: true,
      type: 'string'
    }
  }, login)
  .command('create-commitment', 'Create a new commitment', {
    committer: {
      describe: 'Committer ID',
      demandOption: true,
      type: 'string'
    },
    assetName: {
      describe: 'Asset name',
      demandOption: true,
      type: 'string'
    },
    quantity: {
      describe: 'Asset quantity',
      demandOption: true,
      type: 'number'
    },
    unit: {
      describe: 'Asset unit',
      demandOption: true,
      type: 'string'
    }
  }, createCommitment)
  .command('acknowledge-commitment', 'Acknowledge a commitment', {
    commitmentId: {
      describe: 'Commitment ID',
      demandOption: true,
      type: 'string'
    },
    mnemonic: {
      describe: 'Mnemonic phrase',
      demandOption: true,
      type: 'string'
    }
  }, acknowledgeCommitment)
  .command('accept-commitment', 'Accept a commitment', {
    commitmentId: {
      describe: 'Commitment ID',
      demandOption: true,
      type: 'string'
    },
    mnemonic: {
      describe: 'Mnemonic phrase',
      demandOption: true,
      type: 'string'
    }
  }, acceptCommitment)
  .command('discharge-commitment', 'Discharge a commitment', {
    commitmentId: {
      describe: 'Commitment ID',
      demandOption: true,
      type: 'string'
    },
    mnemonic: {
      describe: 'Mnemonic phrase',
      demandOption: true,
      type: 'string'
    }
  }, dischargeCommitment)
  .help()
  .argv;