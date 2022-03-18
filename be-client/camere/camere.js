const { request, response } = require('express');
const repoCamere = require('../repository/camereRepo');
const repoUser = require('../repository/userRepo');
var dotenv = require('dotenv');
const axios = require('axios');

dotenv.config();

const getCamere = async (request, response) => {
    try {
        var data = await repoCamere.getCamere();

        response.status(200).send(data);
    }
    catch(err) {
        console.log(err);
        response.status(500).send();
    }
}

const getCamera = async (request, response) => {
    const {ind} = request.body;
    try {

        var data = await repoCamere.getCamera(ind);

        var desc = data[0].descriere;

        var propr = desc.split(';');

        data[0].descriere = propr;

        response.status(200).send(data[0]);

    }
    catch(err) {
        console.log(err);
        response.status(500).send();
    }
}

const checkBooking = async (request, response) => {
    const {date1, date2, ind, nb} = request.body;

    try {
        var tip = await repoCamere.getTip(ind);
        
        const v = await repoCamere.checkAvailable(date1, date2, tip, nb);

        if(v === 1) {
            response.json({isOk: true});
            response.status(200).send();
        }
        else {
            const p = await repoCamere.checkProbability(date1, date2, tip, nb);
            response.json({isOk: false, p: p});
            response.status(200).send();
        }

    }
    catch(err) {
        console.log(err);
        response.status(500).send();
    }
}

const addBooking = async (request, response) => {
    var {date1, date2, adults, children, babies, meal, tip, parking, token, nb, marketing} = request.body;

    try {
        const splDate = date1.split('-');

        date12 = new Date(date1);
        date22 = new Date(date2);

        const lead_time = Math.floor((date22 - date12) / (1000 * 3600 * 24));

        const year = Number(splDate[0]);
        const month = Number(splDate[1]);
        const day = Number(splDate[2]);

        const week = Math.floor((month - 1) * 4 + day / 7 + 1);

        var wndN = 0;
        var wN = 0;

        for (var d = date12; d < date22; d.setDate(d.getDate() + 1)) {
            if(!(d.getDay() % 6))
                wndN += 1;
            else wN +=1;
        }

        const data = await repoUser.getGuestdata(token);

        tip = await repoCamere.getTip(tip);

        const address = process.env.PYTHON_API + '/getBookingPrediction';

        for(let i = 0; i < nb; ++i) {
            const info = {
                lead_time: lead_time,
                arrival_date_year: year,
                arrival_date_month: month,
                arrival_date_week_number: week,
                arrival_date_day_of_month: day,
                stays_in_weekend_nights: wndN,
                stays_in_week_nights: wN,
                adults: adults[i],
                children: children[i],
                babies: babies[i],
                meal: meal[i],
                is_repeated_guest: data.isRepeteadGuest,
                previous_cancellations: data.previousCancellations,
                previous_bookings_not_canceled: data.previousNotCancelled,
                reserved_room_type: tip,
                required_car_parking_spaces: parking[i],
                marketing: marketing[i],
            };

            //console.log(info);
    
            const rez = await axios.post(address, info);
    
            const id = await repoUser.getIdBiToken(token);
    
            await repoCamere.addBooking(rez.data, year, month, day, week, date1, date2, tip, lead_time, wndN, wN, adults[i], children[i], babies[i], meal[i], data.isRepeteadGuest, data.previousCancellations, data.previousNotCancelled, parking[i], id.id, marketing[i]);
            
            response.status(200).send();
        }
    }
    catch(err) {
        console.log(err);
        response.status(500).send();
    }
    
}

const getBookings = async (request, response) => {
    const {token} = request.body;

    try {

        const id = await repoUser.getIdBiToken(token);

        var data = await repoCamere.getBookings(id.id);

        for(let i = 0 ; i< data.length; ++i) {
            data[i].date = data[i].date.toDateString();
            data[i].dateTo = data[i].dateTo.toDateString();
        }

        response.json({
            data: data
        });

        response.status(200).send();
                
    }
    catch(err) {
        console.log(err);
        response.status(500).send();
    }
}

const cancelBooking = async (request, response) => {
    const {id, token} = request.body;

    try {

        const idC = await repoUser.getIdBiToken(token);

        await repoCamere.cancelBooking(id, idC.id);

        response.status(200).send();
                
    }
    catch(err) {
        console.log(err);
        response.status(500).send();
    }
}

module.exports =  {
    getCamere: getCamere,
    getCamera: getCamera,
    checkBooking: checkBooking,
    addBooking: addBooking,
    getBookings: getBookings,
    cancelBooking: cancelBooking,
}