import { executeAuthenticatedRequest } from '../utils/api.js';

export const createCommitment = async (argv) => {
  const payload = {
    committer: argv.committer,
    assetPayload: {
      assetName: argv.assetName,
      quantity: argv.quantity,
      unit: argv.unit
    }
  };
  
  await executeAuthenticatedRequest('commitments/create', payload, 'Commitment created successfully!');
};

export const acknowledgeCommitment = async (argv) => {
  const payload = {
    commitmentId: argv.commitmentId,
    mnemonic: argv.mnemonic
  };
  
  await executeAuthenticatedRequest('commitments/acknowledge', payload, 'Commitment acknowledged successfully!');
};

export const acceptCommitment = async (argv) => {
  const payload = {
    commitmentId: argv.commitmentId,
    mnemonic: argv.mnemonic
  };
  
  await executeAuthenticatedRequest('commitments/accept', payload, 'Commitment accepted successfully!');
};

export const dischargeCommitment = async (argv) => {
  const payload = {
    commitmentId: argv.commitmentId,
    mnemonic: argv.mnemonic
  };
  
  await executeAuthenticatedRequest('commitments/discharge', payload, 'Commitment discharged successfully!');
};