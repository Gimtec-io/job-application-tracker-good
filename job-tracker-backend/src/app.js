const express = require('express');
const bodyParser = require('body-parser');
const applicationsRouter = require('./components/applications/applicationsAPI');
const commentsRouter = require('./components/comments/commentsAPI');
const statusesRouter = require('./components/statuses/statusesAPI');

const app = express();
const port = 8000;

app.use(bodyParser.json());
app.use('/applications', applicationsRouter);
app.use('/comments', commentsRouter);
app.use('/statuses', statusesRouter);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})