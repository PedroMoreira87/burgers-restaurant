import axios from 'axios';

export const getRestaurant = async () => {
  const response = await axios.get('https://cdn-dev.preoday.com/challenge/venue/9');
  return response.data;
};
