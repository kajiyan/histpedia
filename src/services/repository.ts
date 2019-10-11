import axios from 'axios';

const adapter = require('axios-jsonp');

const baseDomain = 'https://ja.wikipedia.org';
const baseURL = `${baseDomain}/w/api.php`;

export default axios.create({
  adapter,
  baseURL,
});
