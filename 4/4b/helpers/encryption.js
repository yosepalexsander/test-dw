const bcrypt = require('bcrypt');
const saltRounds = 10;


exports.hash = async function (pass) {
    const salt = await bcrypt.genSalt(saltRounds)
    const hash = await bcrypt.hash(pass, salt)
    return hash
}

exports.authentication = async function (passEntered, hashedPass) {
    const match = bcrypt.compare(passEntered, hashedPass)
    return match
}