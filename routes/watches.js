const express = require('express');
const router = express.Router();
const watches = require('../services/watches');

/* GET watches listing. */
router.get('/', function(req, res, next) {
  try {
    res.json(watches.getMultiple(req.query.page));
  } catch(err) {
    console.error(`Error while getting watches `, err.message);
    next(err);
  }
});

/* GET brandnames. */
router.get('/brandnames', function(req, res, next) {
    try {
      res.json(watches.getBrandName(req.query.page));
    } catch(err) {
      console.error(`Error while getting brandnames `, err.message);
      next(err);
    }
  });

module.exports = router;