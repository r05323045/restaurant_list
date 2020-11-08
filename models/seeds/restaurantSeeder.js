const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const restaurantList = require('../../restaurant.json')
const Restaurant = require('../restaurant')
const User = require('../user')
const db = require('../../config/mongoose')

const SEED_USER = [
  {
    name: 'user1',
    email: 'user1@example.com',
    password: '12345678'
  }, {
    name: 'user2',
    email: 'user2@example.com',
    password: '12345678'
  }]

db.once('open', () => {
  bcrypt
    .genSalt(10)
    .then(salt => {
      return Promise.all(Array.from(
        { length: SEED_USER.length },
        (_, i) => {
          return bcrypt.hash(SEED_USER[i].password, salt)
        }
      ))
    })
    .then(hashes => {
      hashes.forEach((hash, idx) => { SEED_USER[idx].password = hash })
      return Promise.all(Array.from(
        { length: SEED_USER.length },
        (_, i) => {
          return User.create(SEED_USER[i])
        }
      ))
    })
    .then(users => {
      return Promise.all(Array.from(
        { length: restaurantList.results.slice(0, 6).length },
        (_, i) => {
          if (i < 3) {
            restaurantList.results[i].userId = users[0]._id
            return Restaurant.create(restaurantList.results[i])
          } else {
            restaurantList.results[i].userId = users[1]._id
            return Restaurant.create(restaurantList.results[i])
          }
        }
      ))
    })
    .then(() => {
      console.log('done.')
      process.exit()
    })
})
