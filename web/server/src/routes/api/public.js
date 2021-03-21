const router = require('express').Router()
const { ObjectID } = require('mongodb')
const sha256 = require('js-sha256');
const db = require('../../db');

const dayOfYear = date =>
  Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);



router.post('/get_day', async (req, res) => {
    try {
      var db = await load(req)
      let a = []
      for (let x = 0; x < 365; x++) {
        let n_day = await dayOfYear(new Date(parseInt(req.body.timestamp)+x*1000*60*60*24))
        let sum_temp = 0.0;
        let n = 0.0;
        for (let i = n_day; i < 4000; i+= 365) {
          let t = await db.days.find({'id': i.toString()}).toArray()
          n+=1;
          if (isNaN(t[0][req.body.city_name])) {
            n -= 1;
          } else {
            sum_temp += parseFloat(t[0][req.body.city_name])
          }
        }
  
        let k = await Math.round(sum_temp/n).toString()  
        a.push(k)
        console.log(x)
      }
      res.send({
        'success': true,
        'data': a
      })

    } catch (err) {
      console.log(err)
    }
})

router.post('/get_day', async (req, res) => {
    try {
      var db = await load(req)
      let a = []
      for (let x = 0; x < 365; x++) {
        let n_day = await dayOfYear(new Date(parseInt(req.body.timestamp)+x*1000*60*60*24))
        let sum_temp = 0.0;
        let n = 0.0;
        for (let i = n_day; i < 4000; i+= 365) {
          let t = await db.days.find({'id': i.toString()}).toArray()
          n+=1;
          if (isNaN(t[0][req.body.city_name])) {
            n -= 1;
          } else {
            sum_temp += parseFloat(t[0][req.body.city_name])
          }
        }
  
        let k = await Math.round(sum_temp/n).toString()  
        a.push(k)
        console.log(x)
      }
      res.send({
        'success': true,
        'data': a
      })

    } catch (err) {
      console.log(err)
    }
})

function load(req) {
  return {
    "days": req.db.db('tester').collection('days')
  }
}
module.exports = router

