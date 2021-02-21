const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, isAuthor, validateCampground } = require('../middleware')
const Campground = require('../models/campground');
const campgrounds = require('../controllers/campgrounds')




router.get('/', catchAsync(campgrounds.index));

router.get('/new', isLoggedIn, campgrounds.renderNewForm)


router.post('/', isLoggedIn, validateCampground, catchAsync(campgrounds.createCampground))

router.get('/:id', catchAsync(campgrounds.showCampgrounds));

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm))

router.put('/:id', validateCampground, isAuthor, catchAsync(campgrounds.updateCampgrounds));

router.delete('/:id', isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampgropunds));

module.exports = router;