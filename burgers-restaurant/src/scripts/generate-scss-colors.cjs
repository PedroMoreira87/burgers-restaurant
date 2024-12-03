const axios = require('axios');
const fs = require('fs');
const path = require('path');

const generateScssColors = async () => {
  try {
    const response = await axios.get('https://cdn-dev.preoday.com/challenge/venue/9');
    const colors = response.data.webSettings;
    const scssContent = `$primary-color: ${colors.primaryColour};
$primary-color-hover: ${colors.primaryColourHover};
$secondary-color-hover: #CCCCCC;
$background-color: ${colors.backgroundColour};
$nav-background-color: ${colors.navBackgroundColour};
$primary-color-dark: #36231C;
$primary-white: #FFF;
$secondary-white: #F8F9FA;
$tertiary-white: #e8e8e8;
$primary-black: #000;
$secondary-black: #121212;
$primary-gray: #8A94A4;
$secondary-gray: #2C2C2C;
$tertiary-gray: #464646;
$primary-shadow: #00000024;
`;
    const filePath = path.resolve(__dirname, '../styles/_colors.scss');
    fs.writeFileSync(filePath, scssContent);
    console.log('_colors.scss file has been updated with the latest colors.');
  } catch (error) {
    console.error('Error fetching colors from API:', error);
  }
};

generateScssColors();
