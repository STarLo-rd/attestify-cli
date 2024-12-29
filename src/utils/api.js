import axios from 'axios';
import chalk from 'chalk';
import { store, BASE_URL } from '../config/store.js';

export async function executeAuthenticatedRequest(endpoint, payload, successMessage) {
  try {
    const token = store.get('token');
    if (!token) {
      throw new Error('Not authenticated. Please login first.');
    }

    const response = await axios.post(
      `${BASE_URL}/${endpoint}`,
      payload,
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    );
    
    console.log(chalk.green(successMessage));
    console.log(chalk.blue('Response:'), response.data);
  } catch (error) {
    console.error(chalk.red(`Operation failed:`), error.response?.data || error.message);
  }
}