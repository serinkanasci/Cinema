const express = require('express');
const port = 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded())

const userRouter = require('./routes/user');
const movieRouter = require('./routes/movie');
const ratingRouter = require('./routes/rating');

app.use('/users', userRouter);
app.use('/movies', movieRouter);
app.use('/ratings', ratingRouter);

app.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`)
})