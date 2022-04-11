const repoUser = require('../repository/userRepo');
const jwt = require('jsonwebtoken');

const validateToken = async (request, response, next) => {
    const token = request.headers['authorization'];

    if(typeof token !== 'undefined') {
        try {
    
            const decoded = jwt.decode(token, process.env.SECRET_KEY, function(error, decoded) {
                if(error) {
                    return response.status(401).json({
                        error: 'Token incorect sau expirat'
                    });
                }
            });

            if(decoded === null) {
                return response.status(401).send();
            }

            // console.log(decoded);

            const data = await repoUser.getUser(decoded.email);

            // console.log(data[0].logInToken);
            // console.log(token);

            if(data[0].logInToken === token) {
                //console.log('ok');
                next();
            }
            else {
                response.status(401).send();
            }
    
        }
        catch(err) {
            console.log(err);
            response.status(500).send();
        }
    }
    else {
        response.status(401).send();
    }
}

module.exports = {
    validateToken: validateToken,
}