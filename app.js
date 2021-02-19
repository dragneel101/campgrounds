//required dependecies
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const expressError = require('./utils/expressError')

//require the routes
const campgrounds = require('./Routes/campgrounds');
const reviews = require('./Routes/reviews');

//database connection settings
mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});

const app = express();
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log("we're connected!");
});


//set and USE
app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'));

app.use(express.static(path.join(__dirname, 'public')));

mongoose.set('useFindAndModify', false);

//use the routes
app.use("/campgrounds", campgrounds)
app.use("/campgrounds/:id/reviews", reviews)

//routes
app.get('/', (req, res) => {
    res.redirect('home')
})

//error handler
app.all('*', (req, res, next) => {
    next(new expressError('Page Not Found', 404));
})

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'SOmething Went Wrong Please Try again Later or Contact Administarator'
    res.status(statusCode).render('error', { err });
})


//Port to acess
app.listen(3000, () => {
    console.log('Serving on port 3000')
})