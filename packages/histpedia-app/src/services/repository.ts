import axios from 'axios';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const adapter = require('axios-jsonp');

export default axios.create({
  adapter,
});
