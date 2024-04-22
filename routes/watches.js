const express = require('express');
const router = express.Router();
const watches = require('../services/watches');

/* GET watches listing. */
router.get('/', function(req, res, next) {
  try {
    res.json(watches.getMultiple(req.query));
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

/* GET data relative to homepage */
router.get('/brandinfos', function(req, res, next) {
  try {
    res.json(watches.getBrandInfos(req.query));
  } catch(err) {
    console.error(`Error while getting brandnames `, err.message);
    next(err);
  }
});

/* GET watch details */
router.get('/:id', function(req, res, next) {
  try {
    const watchModel = req.params.id;
    const montreDetails = watches.getWatchDetails(watchModel);
    if (!montreDetails) {
      res.status(404).json({ message: "Watch not found" });
    } else {
      res.json(montreDetails);
    }
  } catch(err) {
    console.error(`Error while getting watch details `, err.message);
    next(err);
  }
});

module.exports = router;