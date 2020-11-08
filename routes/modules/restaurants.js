const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

router.get('/new', (req, res) => {
  const allCategories = ['日本料理', '美式', '義式餐廳', '中東料理', '咖啡', '酒吧', '其他']
  return res.render('new', { allCategories })
})

router.get('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Restaurant.findOne({ _id, userId })
    .lean()
    .then((restaurant) => res.render('show', { restaurant }))
    .catch(error => console.log(error))
})

router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Restaurant.findOne({ _id, userId })
    .lean()
    .then(restaurant => {
      const allCategories = ['日本料理', '美式', '義式餐廳', '中東料理', '咖啡', '酒吧', '其他']
      const categoryArray = []
      allCategories.forEach((category, idx) => {
        categoryArray.push({ name: category, selected: false })
        if (restaurant.category === category) {
          categoryArray[idx].selected = true
        }
      })
      res.render('edit', { restaurant, categoryArray })
    })
    .catch(error => console.log(error))
})

router.post('/', (req, res) => {
  const userId = req.user._id
  return Restaurant.create({
    name: req.body.name,
    category: req.body.category,
    location: req.body.location,
    google_map: req.body.google_map,
    phone: req.body.phone,
    description: req.body.description,
    image: req.body.image,
    userId
  })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

router.put('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Restaurant.findOne({ _id, userId })
    .then(restaurant => {
      restaurant.name = req.body.name
      restaurant.category = req.body.category
      restaurant.location = req.body.location
      restaurant.google_map = req.body.google_map
      restaurant.phone = req.body.phone
      restaurant.description = req.body.description
      restaurant.image = req.body.image
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${_id}`))
    .catch(error => console.log(error))
})

router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Restaurant.findOne({ _id, userId })
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})
module.exports = router
