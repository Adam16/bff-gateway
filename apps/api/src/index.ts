import restana from 'restana';

const service = restana();

service.get('/hello', (_req, res) => {
  res.send('Hello World!');
});

service.start(3000).then(() => {
  console.log('Server started on port 3000');
});