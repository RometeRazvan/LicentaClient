const express = require('express');
const router = express.Router();

const {getCamere, getCamera, checkBooking, addBooking, getBookings, cancelBooking} = require('../camere/camere')
const {validateToken} = require('../login/validateToken');

router.post('/getCamere', validateToken, getCamere);
router.post('/getCamera', validateToken, getCamera);
router.post('/checkBooking', validateToken, checkBooking);
router.post('/addBooking', validateToken, addBooking);
router.post('/getBookings', validateToken, getBookings);
router.post('/cancelBooking', validateToken, cancelBooking);

module.exports = {camereRoutes: router}