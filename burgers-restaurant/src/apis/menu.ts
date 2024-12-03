import axios from 'axios';

export const getMenu = async () => {
  const response = await axios.get('https://5wlxnonbjj.execute-api.us-east-1.amazonaws.com/dev/menus');
  return response.data;
};
