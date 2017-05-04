import bcrypt from 'bcryptjs';

export default {

    encrypt(dataToEncrypt) {
        return new Promise((resolve, reject) => {
            bcrypt.genSalt(10, (err, salt) => {
                if (err) reject(err);

                bcrypt.hash(dataToEncrypt, salt, (err, hash) => {
                    if (err) reject(err);

                    resolve(hash);                    
                });
            });
        });
    },

    isMatch(toMatch, originData) {
        return new Promise((resolve, reject) => {
            bcrypt.compare(toMatch, originData, (err, res) => {
                if (err) reject(err);

                resolve(res);
            });
        });
    }

}