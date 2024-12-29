#!/usr/bin/env node
import { execSync } from "child_process";
import { updateState, loadState } from "../utils/state.js";
import { parseLoginResponse, parseCommitmentId } from "../utils/parser.js";
import input from "../config/input.json" assert { type: "json" };

async function executeCommand(command) {
  try {
    const output = execSync(command, { encoding: "utf-8" });
    console.log(output);
    return output;
  } catch (error) {
    console.error(`Error executing command: ${command}`);
    console.error(error.message);
    process.exit(1);
  }
}

async function handleLogin(userType) {
  const user = input[userType];
  const output = await executeCommand(
    `node index.js login --email "${user.email}" --password "${user.password}"`
  );
  console.log("output", output);

  const loginData = parseLoginResponse(output);
  if (!loginData) {
    throw new Error(`Failed to parse ${userType} login response`);
  }

  updateState({ [`${userType}Id`]: loginData.id });
  return loginData;
}

async function runCommitmentLifecycle() {
//   Register users
    await executeCommand(
      `node index.js register --username "${input.committee.username}" --email "${input.committee.email}" --password "${input.committee.password}" --mnemonic "${input.committee.mnemonic}"`
    );

    await executeCommand(
      `node index.js register --username "${input.committer.username}" --email "${input.committer.email}" --password "${input.committer.password}" --mnemonic "${input.committer.mnemonic}"`
    );

  // Login as committee and store ID
  await handleLogin("committee");

  // Login as committer to get ID
  await handleLogin("committer");

  // Login back as committee for creating commitment
  const committeeData = await handleLogin("committee");

  // Get state with IDs
  const state = loadState();

  console.log("state.commitmentId", state.committerId);

  // Create commitment as committee
  const createOutput = await executeCommand(
    `node index.js create-commitment --committer "${state.committerId}" --assetName "${input.commitment.assetName}" --quantity ${input.commitment.quantity} --unit "${input.commitment.unit}"`
  );

  // Extract and save commitment ID
  console.log("createOutput", createOutput);
  const commitmentId = parseCommitmentId(createOutput);
  if (!commitmentId) {
    throw new Error("Failed to extract commitment ID");
  }
  updateState({ commitmentId });
  console.log(`Commitment ID saved: ${commitmentId}`);

  // Acknowledge commitment as commitee
  await executeCommand(
    `node index.js acknowledge-commitment --commitmentId "${commitmentId}" --mnemonic "${input.committee.mnemonic}"`
  );

  // Login as committer for accept commitment
  await handleLogin("committer");

  // Accept commitment as committer
  await executeCommand(
    `node index.js accept-commitment --commitmentId "${commitmentId}" --mnemonic "${input.committer.mnemonic}"`
  );

  //TODO: Only committee would discharge the commitment
  // Login back as committee for discharge
  //   await handleLogin("committee");

  // Discharge commitment as committee
  await executeCommand(
    `node index.js discharge-commitment --commitmentId "${commitmentId}" --mnemonic "${input.committer.mnemonic}"`
  );

  console.log("Commitment lifecycle completed successfully!");
}

runCommitmentLifecycle().catch(console.error);
