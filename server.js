const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/src/page/index.html'));
});

app.use(express.static('public'))
app.use('/', router);
app.listen(3000);