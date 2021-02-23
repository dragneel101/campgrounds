const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

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

const creator = ["60327c750d20493716ef32a4", "60314175808171440e208375", "603111ccf46ee13c0ed83f13"]
const coordinate = [
    [45.00713, -111.60332],
    [- 11.19310, -178.76434],
    [-81.75813, -150.92889],
    [0.15107, 111.31044],
    [34.03897, 76.28145],
    [38.36870, 91.04979],
    [-36.97229, -69.32345],
    [7.23921, 100.09621],
    [59.91626, 137.56041],
    [59.91626, 137.56041],
    [68.91605, -88.06724],
    [50.76260, 119.58011],
    [34.47724, -119.88676],
    [-32.55985, -54.87401],
    [34.46447, 50.35492],
    [-32.14727, 135.50057],
    [50.16252, 68.28975],
    [40.17510, 120.53729]]


const imagee = ["https://res.cloudinary.com/testserver/image/upload/v1613930125/YelpCamp/chris-schog-EnCaUE4QNOw-unsplash_shc1mb.jpg",
    "https://res.cloudinary.com/testserver/image/upload/v1613930124/YelpCamp/wei-pan-Ta0A1miYZKc-unsplash_oqjtur.jpg",
    "https://res.cloudinary.com/testserver/image/upload/v1613930124/YelpCamp/goutham-krishna-lITrCLM6hHc-unsplash_jk6oeg.jpg",
    "https://res.cloudinary.com/testserver/image/upload/v1613930124/YelpCamp/ken-cheung-TEriGq5ywYA-unsplash_tk1b07.jpg",
    "https://res.cloudinary.com/testserver/image/upload/v1613930123/YelpCamp/adore-chang-rRljZzjNQAA-unsplash_crnklb.jpg",
    "https://res.cloudinary.com/testserver/image/upload/v1613930123/YelpCamp/scott-goodwill-y8Ngwq34_Ak-unsplash_oyddvw.jpg",
    "https://res.cloudinary.com/testserver/image/upload/v1613930123/YelpCamp/234843649_pz1lyj.jpg",
    "https://res.cloudinary.com/testserver/image/upload/v1613930122/YelpCamp/david-schultz-f5sdemaT7XE-unsplash_illzhp.jpg",
    "https://res.cloudinary.com/testserver/image/upload/v1613930122/YelpCamp/olakira-camp-asilia-africa_uym91e.jpg",
    "https://res.cloudinary.com/testserver/image/upload/v1613930122/YelpCamp/natura-eco-camp_ogghrr.jpg",
    "https://res.cloudinary.com/testserver/image/upload/v1613930123/YelpCamp/scott-goodwill-y8Ngwq34_Ak-unsplash_oyddvw.jpg",
    "https://res.cloudinary.com/testserver/image/upload/v1613930123/YelpCamp/234843649_pz1lyj.jpg",
    "https://res.cloudinary.com/testserver/image/upload/v1613930122/YelpCamp/david-schultz-f5sdemaT7XE-unsplash_illzhp.jpg",
    "https://res.cloudinary.com/testserver/image/upload/v1613930122/YelpCamp/olakira-camp-asilia-africa_uym91e.jpg",
    "https://res.cloudinary.com/testserver/image/upload/v1613930122/YelpCamp/natura-eco-camp_ogghrr.jpg",
    "https://res.cloudinary.com/testserver/image/upload/v1613930122/YelpCamp/campfire-muskoka-cottage_pselab.webp",
    "https://res.cloudinary.com/testserver/image/upload/v1613930122/YelpCamp/download_fvta8y.jpg",
    "https://res.cloudinary.com/testserver/image/upload/v1613930121/YelpCamp/download_1_dgnnks.jpg",
    "https://res.cloudinary.com/testserver/image/upload/v1613930121/YelpCamp/images_thmcb2.jpg",
    "https://res.cloudinary.com/testserver/image/upload/v1613930121/YelpCamp/images_1_b6zaad.jpg",
    "https://res.cloudinary.com/testserver/image/upload/v1613930121/YelpCamp/images_3_cr59fm.jpg",
    "https://res.cloudinary.com/testserver/image/upload/v1613930121/YelpCamp/images_2_afwpt5.jpg"]

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: creator[Math.floor(Math.random() * creator.length)],
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            images: [{
                url: imagee[Math.floor(Math.random() * imagee.length)],
                filename: `YelpCamp/jerst6ffm1ef8p6uxvxv+${i}`
            },
            {
                url: imagee[Math.floor(Math.random() * imagee.length)],
                filename: `YelpCamp/jerst6ffm1ef8p6uxvxv+${i + i}`
            }
            ],
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            price,
            geometry: {
                type: "Point",
                coordinates: coordinate[Math.floor(Math.random() * coordinate.length)].reverse()
            }
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})