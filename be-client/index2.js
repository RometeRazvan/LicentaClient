const  connection = require('./repository/connection');
const util = require('util');

const query = util.promisify(connection.query).bind(connection);

const repoCamere = require('./repository/camereRepo');

async function addData() {
    not = [];

    for(i = 0; i < 4000; ++i) {
        console.log(i);

        luna = Math.floor(Math.random() * (13 - 1) + 1);
        if(luna !== 2)
            zi = Math.floor(Math.random() * (23 - 1) + 1);
        else
            zi = Math.floor(Math.random() * (22 - 1) + 1);
        
        
        zi2 = Math.floor(Math.random() * (7 - 3) + 3) + zi;

        cancel = Math.round(Math.random());

        week = Math.floor(luna * 4 + zi / 4);

        isCanceled = 0

        if(Math.random() <= 0.3)
            isCanceled = 1;

        an = 2021;

        date = an;
        if(luna < 10)
            date = date + '-0' + luna;
        else date = date + '-' + luna;

        if(zi < 10)
            date = date + '-0' + zi;
        else
            date = date + '-' + zi;
        
        date2 = an;
        if(luna < 10)
            date2 = date2 + '-0' + luna;
        else date2 = date2 + '-' + luna;

        if(zi < 10)
            date2 = date2 + '-0' + zi2;
        else
            date2 = date2 + '-' + zi2;

        tip = getTip(not);

        // tip = 2
        // date = '2021-06-01';
        // date2 = '2021-06-06';
        // isCanceled = 0;

        data = await repoCamere.getOccupation(tip);

        cap = data[0].capacity;
        occ = data[0].occupied;

        if(cap === occ) {
            v = await repoCamere.checkAvailable(date, date2, tip);

            //console.log("V", v);

            if(v === 1) {
                command = `Insert into Rezervari (will_cancel, is_canceled, year, month, day, week, date, dateTo, roomType) Values ('${cancel}','${isCanceled}', '${an}', '${luna}', '${zi}', '${week}', '${date}', '${date2}', '${tip}')`;

                await query(command);
            }
            else {
                console.log('Nu se poate pe', date, date2);

                
                while(cap === occ) {
                    not.push(tip);
                    tip = getTip(not);
        
                    data = await repoCamere.getOccupation(tip);
            
                    cap = data[0].capacity;
                    occ = data[0].occupied;
                }

                command = `Insert into Rezervari (will_cancel, is_canceled, year, month, day, week, date, dateTo, roomType) Values ('${cancel}','${isCanceled}', '${an}', '${luna}', '${zi}', '${week}', '${date}', '${date2}', '${tip}')`;
    
                await query(command);

                console.log('Am adaugat in', tip);
            }
        }
        else {
            occ += 1;

            repoCamere.addOcc(tip, occ);

            command = `Insert into Rezervari (will_cancel, is_canceled, year, month, day, week, date, dateTo, roomType) Values ('${cancel}','${isCanceled}', '${an}', '${luna}', '${zi}', '${week}', '${date}', '${date2}', '${tip}')`;
    
            await query(command);
        }
    }
}

function getTip(not) {
    ls = [0, 2, 3, 4, 5, 6, 7, 8, 9]
    ind = Math.floor(Math.random() * (9));

    while(not.indexOf(ls[ind]) != -1) {
        ind = Math.floor(Math.random() * (9));
    }

    return ls[ind];
}

addData();