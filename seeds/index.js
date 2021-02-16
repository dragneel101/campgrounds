const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');
const campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            location: `${cities[random1000].city},${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: 'https://source.unsplash.com/collection/483251',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut a erat non libero sodales semper. Pellentesque lectus sapien, vestibulum ac enim eget, cursus pharetra eros. Praesent sollicitudin nulla non ante ullamcorper porta. Maecenas sit amet imperdiet metus. In porta turpis eget lacinia pulvinar. Nam at aliquet massa, sit amet venenatis ipsum. Morbi tristique maximus sagittis. Integer malesuada ullamcorper faucibus. Aenean finibus maximus nulla, eu ultricies libero fringilla sed. Praesent luctus rutrum est non venenatis. Vestibulum fringilla magna in finibus sollicitudin. Nulla efficitur est vitae aliquet dapibus. Donec aliquet elit et tellus ultrices interdum.',
            price
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});