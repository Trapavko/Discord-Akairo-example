const { ExampleClient } = require('./src/client');

(() => {
    const client = new ExampleClient();
    client.start();
})();