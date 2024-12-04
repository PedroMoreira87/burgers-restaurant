import axios from 'axios';

export const getRestaurant = async () => {
  const response = await axios.get('https://5wlxnonbjj.execute-api.us-east-1.amazonaws.com/dev/restaurants');
  return response.data;
};
