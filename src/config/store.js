import Conf from 'conf';

export const store = new Conf({
  projectName: 'attestify-cli',
  defaults: {
    token: null
  }
});

export const BASE_URL = 'http://localhost:3000/api';