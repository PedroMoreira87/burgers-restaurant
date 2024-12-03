import axios from 'axios';

const generateResponse = (statusCode, body) => ({
  statusCode,
  headers: {
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'OPTIONS,GET',
  },
  body: JSON.stringify(body),
});

export const handler = async (event) => {
  try {
    const response = await axios.get('https://cdn-dev.preoday.com/challenge/venue/9');
    return generateResponse(200, response.data);
  } catch (error) {
    console.error('Error fetching data:', error);
    return generateResponse(500, { error: 'Failed to fetch data' });
  }
};
