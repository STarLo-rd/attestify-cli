import axios from 'axios';
import chalk from 'chalk';
import { store, BASE_URL } from '../config/store.js';

export const register = async (argv) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/register`, {
      username: argv.username,
      email: argv.email,
      password: argv.password,
      mnemonic: argv.mnemonic
    });
    console.log(chalk.green('Registration successful!'));
    console.log(chalk.blue('User details:'), response.data);
  } catch (error) {
    console.error(chalk.red('Registration failed:'), error.response?.data || error.message);
  }
};

export const login = async (argv) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/login`, {
      email: argv.email,
      password: argv.password
    });
    
    const token = response.data.token;
    store.set('token', token);
    console.log(chalk.green('Login successful!'));
    console.log(chalk.blue('Token stored for future requests'));
  } catch (error) {
    console.error(chalk.red('Login failed:'), error.response?.data || error.message);
  }
};