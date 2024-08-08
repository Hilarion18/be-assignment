import bcrypt from 'bcryptjs';

export default {
  generatePassword: function (email, password) {
    return new Promise(function (resolve, reject) {
      const saltRound = 10
      const emailPassword = email + password
      bcrypt.genSalt(saltRound, function (err, salt) {
        bcrypt.hash(emailPassword, salt, function (err, hash) {
          if (!err) {
            resolve(hash)
          } else {
            reject(err)
          }

        })
      })
    })
  },

  checkPassword: function (password, hashedPassword, email) {
    const emailPassword = email + password
    return new Promise((resolve, reject) => {
      bcrypt.compare(emailPassword, hashedPassword, function (err, data) {
        if (data) {
          resolve(data)
        } else {
          reject(err)
        }
      })
    } )
  }

}