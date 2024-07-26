import express from 'express';

const app = express(); //In this app variable we are going to have all the functionality required by the server

app.use('/', (req, res) => {
  res.send('Hello Word');
});

app.listen(4000, () => {
  console.log('Server working correctly on port 4000');
});
