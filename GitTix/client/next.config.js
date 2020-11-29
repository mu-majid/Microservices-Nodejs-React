// Loaded Automatically when our Next App starts
// watching for file changes every 300ms (to reflect changes in out docker container)
module.exports = {
  webpackDevMiddleware: config => {
    config.watchOptions.poll = 300;
    return config;
  }
};