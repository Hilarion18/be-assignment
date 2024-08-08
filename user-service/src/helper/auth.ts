import JWT from 'jsonwebtoken'

export const generateJWT = (username: Object) => {
    try {
        const token = JWT.sign(username, process.env.JWT_PRIVATE_KEY, {
            expiresIn: '24h'
          }) // Expiration Date For 1 Day
          return token
    } catch (error) {
        console.log("generateJWT  error: ", error);
        throw error
    }
}