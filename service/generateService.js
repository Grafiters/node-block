const { generateApiKey } = require('generate-api-key');

function generateTokenEmail(n) {
    var add = 1, max = 12 - add;
        
    if ( n > max ) {
            return generate(max) + generate(n - max);
    }
    
    max        = Math.pow(10, n+add);
    var min    = max/10;
    var number = Math.floor( Math.random() * (max - min + 1) ) + min;

    console.log(typeof number);
    return number;
}

function generateApiKeys(){
    return generateApiKey({ method: 'base32', pool: 'abcdefghijklmnopqrstuvwxyz0123456789' });
}

module.exports = { generateTokenEmail, generateApiKeys }