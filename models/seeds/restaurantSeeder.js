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
/*
id: el.id,
name: el.name,
name_en: el.name_en,
category: el.category,
image: el.image,
location: el.location,
phone: el.phone,
google_map: el.google_map,
rating: el.rating,
description: el.description
*/
