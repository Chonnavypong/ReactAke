const config = require('./../config/index')
const passport = require('passport')
const User = require('./../models/userModel')

const JwtStrategy = require('passport-jwt').Strategy,
  ExtractJwt = require('passport-jwt').ExtractJwt

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = config.JWT_SECRET
// opts.issuer = 'accounts.examplesoft.com'
// opts.audience = 'yoursite.net'
passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {

  try {
    const user = await User.findById(jwt_payload.id)

    if (!user) {
      return done(new Error('ไม่พบ User ในระบบ'), null)
    }
    return done(null, user)

  } catch (err) {

    done(err)

  }

}))

module.exports.isLogin = passport.authenticate('jwt', {
  session: false
})