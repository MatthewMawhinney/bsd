const express = require('express');
const router = express.Router();

//TEST
router.get('/test', (req, res) => {
res.send('Hello World')
res.end();
});

module.exports = router;