
const LandingPage = ({ currentUser }) => {
  return (
    currentUser ? <h1>You Are Signed In</h1> : <h1>You Are signed Out</h1>
  )
};

LandingPage.getInitialProps = async (context, client, currentUser) => {
  return {};
}

export default LandingPage;