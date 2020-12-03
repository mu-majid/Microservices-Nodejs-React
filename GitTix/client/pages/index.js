import buildClient from '../api/build-client';

const LandingPage = ({ currentUser }) => {
  return (
    currentUser ? <h1>You Are Signed In</h1> : <h1>You Are signed Out</h1>
  )
};

LandingPage.getInitialProps = async (context) => {
  const response = await buildClient(context).get('/api/users/currentuser');

  return response.data;
}

export default LandingPage;