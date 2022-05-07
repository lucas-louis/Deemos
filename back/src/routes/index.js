const express = require('express');
const controllers = require('../controllers');
const router = express.Router();

router.post('/identity', controllers.postIdentity);
router.get('/identity/:id', controllers.getIdInfo);

module.exports = router;