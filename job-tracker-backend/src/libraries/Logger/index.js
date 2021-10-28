const Logger = {
  logError(message, error) {
    // You can use a logger to connect then to your reporting tool
    console.error(message);
    console.error(error);
  }
}

module.exports = Logger;
