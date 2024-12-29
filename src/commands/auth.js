import axios from "axios";
import chalk from "chalk";
import { store, BASE_URL } from "../config/store.js";

export const register = async (argv) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/register`, {
      username: argv.username,
      email: argv.email,
      password: argv.password,
      mnemonic: argv.mnemonic,
    });

    console.log(chalk.green("Registration successful!"));

    // Print full response data for parsing
    console.log(JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    console.error(
      chalk.red("Registration failed:"),
      error.response?.data || error.message
    );
  }
};

export const login = async (argv) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/login`, {
      email: argv.email,
      password: argv.password,
    });

    const token = response.data.token;
    store.set("token", token);

    console.log(chalk.green("Login successful!"));
    // Print full response data for parsing
    console.log(JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    console.error(
      chalk.red("Login failed:"),
      error.response?.data || error.message
    );
    throw error;
  }
};
