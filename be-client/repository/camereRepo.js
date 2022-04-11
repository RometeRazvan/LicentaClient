const  connection = require('./connection');
const util = require('util');

const query = util.promisify(connection.query).bind(connection);

const getCamere = async () => {
    const command = `Select nume, imagine, ind from Camere`;

    const data = await query(command);

    return data;
}

const getCamera = async (ind) => {
    const command = `Select * from Camere where ind = '${ind}'`;

    const data = await query(command);

    return data;
}

const getOccupation = async (type) => {
    const command = `Select capacity, occupied from Camere where tip = '${type}'`;

    const data = await query(command);

    return data;
}

const addOcc = async (type, occ) => {
    const command = `Update Camere set occupied = '${occ}' where tip = '${type}'`;

    await query(command);
}

const checkAvailable = async (date1, date2, tip, nb) => {
    const command = `Select Count(*) from Rezervari where roomType = '${tip}' and is_canceled = 0 and ( '${date1}' between date and dateTo or '${date2}' between date and dateTo )`;

    const data = await query(command);

    const v = data[0]['Count(*)'];

    console.log('NUMAR', v);

    const command2  = `Select capacity from Camere where tip = '${tip}'`;

    const data2 = await query(command2);

    const v2 = data2[0]['capacity'];

    console.log("CAPACITATE", v2);

    if(v + nb > v2) {
        return 0;
    }

    return 1;
}

const checkProbability = async (date1, date2, tip, nb) => {
    const command0 = `Select Count(*) from Rezervari where roomType = '${tip}' and is_canceled = 0 and ( '${date1}' between date and dateTo or '${date2}' between date and dateTo )`;
    const command = `Select Count(*) from Rezervari where roomType = '${tip}' and is_canceled = 0 and will_cancel = 1 and ( '${date1}' between date and dateTo or '${date2}' between date and dateTo )`;

    var tot = await query(command0);

    tot = tot[0]['Count(*)'];

    const data = await query(command);

    var v = data[0]['Count(*)'];

    const command2  = `Select capacity from Camere where tip = '${tip}'`;

    const data2 = await query(command2);

    const v2 = data2[0]['capacity'];

    var rez = [];

    var p = 1;

    for(let i = 0; i < tot + nb - v2; ++i) {
        p *= Math.floor(((v - i) / v2 * 100));

        if(i !== 0) {
            p = Math.floor(p / 100);
        }

        rez.push(p);
    }

    return rez;
}

const getTip = async (ind) => {
    const command = `Select tip from Camere where ind = '${ind}'`;

    const data = await query(command);

    return data[0].tip;
}

const addBooking = async (will, year, month, day, week, date1, date2, tip, lead, wnd, wd, adults, children, babies, meal, isRepetead, previousCancel, previousNot, parking, id, marketing) => {
    const command = `Insert into Rezervari(will_cancel, is_canceled, year, month, day, week, date, dateTo, roomType, leadTime, weekendDays, weekDays, adults, children, babies, meal, isRepeatedGuest, previousCancellations, previousBookingsNotCancelled, carParcking, clientId, marketing) Values ('${will}', '0', '${year}', '${month}', '${day}', '${week}', '${date1}', '${date2}', '${tip}', '${lead}', '${wnd}', '${wd}', '${adults}', '${children}', '${babies}', '${meal}', '${isRepetead}', '${previousCancel}', '${previousNot}', '${parking}', '${id}', '${marketing}' )`;

    await query(command);
}

const getBookings = async (id) => {
    const command = `Select * from Rezervari where clientId = '${id}' and is_canceled = '0'`;

    const data = await query(command);

    return data;
}

const cancelBooking = async (id, clientId) => {
    const command = `Update Rezervari set is_canceled = '1' where id = '${id}'`;

    const command2 = `Select previousCancellations from Client where id = '${clientId}'`;

    await query(command);

    var data = await query(command2);

    data = data[0].previousCancellations + 1;

    const command3 = `Update Client set previousCancellations = '${data}' where id = '${clientId}'`;

    await query(command3);
}

module.exports = {
    getCamere: getCamere,
    getCamera: getCamera,
    getOccupation: getOccupation,
    addOcc:addOcc,
    checkAvailable: checkAvailable,
    checkProbability: checkProbability,
    getTip: getTip,
    addBooking: addBooking,
    getBookings: getBookings,
    cancelBooking: cancelBooking,
}