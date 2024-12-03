import axios from 'axios';

export const getMenu = async () => {
  const response = await axios.get('https://cdn-dev.preoday.com/challenge/menu');
  return response.data;
};
