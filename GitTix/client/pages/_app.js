import 'bootstrap/dist/css/bootstrap.css';

// warpper for all components(routes | files) that nextjs might serve
// for glabl css
// when a file is served, other files css will not be loaded.
const Wrapper = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default Wrapper;