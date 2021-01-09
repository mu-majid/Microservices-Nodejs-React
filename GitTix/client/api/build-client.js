import Axios from 'axios';

const buidlClient = ({ req }) => {
  // on server
  if (typeof window ==='undefined') {
    return Axios.create({
      baseURL: 'http://www.tickets-app-production.xyz',
      headers: req.headers
    });
  } 
  // on browser
  else {
    return Axios.create({
      baseURL: '/'
    });
  }
}

export default buidlClient;