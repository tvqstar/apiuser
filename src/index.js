const express = require('express');
const app = express();
const routes = require('./routes');

const port = 5000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

routes(app);

app.use('/', (req, res) => {
    res.send('Hello word!!!');
});

app.listen(port, () => {
    console.log(`Listening port ${port}`);
});
