// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
// 引用 Todo model
const Restaurant = require('../../models/restaurant')
// 設定首頁路由
router.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .sort({ name: 1 })
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.error(error))
})
router.get('/search', (req, res) => {
  const keyword = req.query.keyword
  return Restaurant.find({ name: { $regex: keyword, $options: 'i' } })
    .lean()
    .sort({ name: 1 })
    .then((restaurants) => res.render('index', { restaurants: restaurants, keyword: keyword }))
    .catch(error => console.log(error))
})
router.get('/sort', (req, res) => {
  const sortBy = req.query.sortBy
  let order = { name: 1 }
  let ascSelect, dscSelect, categorySelect, locationSelect
  if (sortBy === 'dsc') {
    order = { name: -1 }
    dscSelect = 'selected'
  } else if (sortBy === 'category') {
    order = { category: 1 }
    categorySelect = 'selected'
  } else if (sortBy === 'location') {
    order = { location: 1 }
    locationSelect = 'selected'
  } else {
    ascSelect = 'selected'
  }
  return Restaurant.find()
    .lean()
    .sort(order)
    .then(restaurants => res.render('index', { restaurants, ascSelect, dscSelect, categorySelect, locationSelect }))
    .catch(error => console.log(error))
})
// 匯出路由模組
module.exports = router
