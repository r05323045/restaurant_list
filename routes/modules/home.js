const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

router.get('/', (req, res) => {
  const userId = req.user._id
  Restaurant.find({ userId })
    .lean()
    .sort({ name: 1 })
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.error(error))
})

router.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const userId = req.user._id
  return Restaurant.find({ name: { $regex: keyword, $options: 'i' }, userId })
    .lean()
    .sort({ name: 1 })
    .then((restaurants) => res.render('index', { restaurants: restaurants, keyword: keyword }))
    .catch(error => console.log(error))
})

router.get('/sort', (req, res) => {
  const sortBy = req.query.sortBy
  let order = { name: 1 }
  let ascSelect, dscSelect, categorySelect, locationSelect
  switch (sortBy) {
    case 'dsc':
      order = { name: -1 }
      dscSelect = 'selected'
      break
    case 'asc':
      ascSelect = 'selected'
      break
    case 'category':
      order = { category: 1 }
      categorySelect = 'selected'
      break
    case 'location':
      order = { location: 1 }
      locationSelect = 'selected'
      break
  }
  const userId = req.user._id
  return Restaurant.find({ userId })
    .lean()
    .sort(order)
    .then(restaurants => res.render('index', { restaurants, ascSelect, dscSelect, categorySelect, locationSelect }))
    .catch(error => console.log(error))
})

module.exports = router
