var express = require('express');

var router = express.Router();

router.get('/', (req, res, next) => {
    res.render('vwAccount/admin/index', {
        layout: false
    }
  )
})

module.exports = router;
