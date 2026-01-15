import axios from 'axios';

 
const adapter = require('axios-jsonp');

export default axios.create({
  adapter,
});
