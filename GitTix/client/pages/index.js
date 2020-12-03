import Axios from 'axios';

const LandingPage = ({ currentUser }) => {
  return <h1>Landing Page</h1>
};

LandingPage.getInitialProps = async () => {
  const response = await Axios.get('');

  return response.data;
}

export default LandingPage;