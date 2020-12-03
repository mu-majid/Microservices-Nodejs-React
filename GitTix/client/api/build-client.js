import Axios from 'axios';

export default ({ req }) => {
  // on server
  if (typeof window ==='undefined') {
    return Axios.create({
      baseURL: 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
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