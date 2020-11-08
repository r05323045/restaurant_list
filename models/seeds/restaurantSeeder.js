const restaurantList = require('../../restaurant.json')
const Restaurant = require('../restaurant')
const db = require('../../config/mongoose')

db.once('open', () => {
  console.log('mongodb connected!')
  restaurantList.results.forEach(el => {
    Restaurant.create(el)
  })
  console.log('done')
})
