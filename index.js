const express = require('express');
const mongoose = require('mongoose');

const routes = require('./routes');
const app = express();
const {home}=require('./controllers/blog');

const { MONGODB_URI } = process.env; 

mongoose.connect(MONGODB_URI, { useUnifiedTopology: true });

app.use(express.json());
//home page 
app.get('/', async (req, res, next) => {
  try {
      const blog = await home();
      res.json(blog);
  } catch (e) { next(e) }
  //res.send('Hello World')
});
app.use('/', routes);

app.use('*', (req, res, next) => {
    res.status(404).json({ err: 'NOT_FOUND' });
})

app.use((err, req, res, next) => {
    if (err instanceof mongoose.Error.ValidationError) {
        res.status(422).json({ err: errors });
    }
    if (err.code === 11000) {
        return res.status(422).json({ statusCode: 'ValidationError', property: err.keyValue });
    }
    if (err.message === 'UN_AUTHENTICATED') {
        res.status(401).json({ statusCode: 'UN_AUTHENTICATED' });
    }
    res.status(503).end();
});

const { PORT = 3000 } = process.env;
app.listen(PORT, () => {
    console.log('App is up and ready on:', PORT);
})