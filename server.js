const express = require("express");
const app = module.exports = express();
const bodyParser = require("body-parser");
const methodOverride = require('method-override');
const cors = require('cors');
app.use(bodyParser.json({ extended: false, limit: '5mb'}));
app.use(cors());
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(express.static(__dirname + '/public'));

const ocrHandler = require('./handlers/ocr');

app.use('/api', ocrHandler)

app.listen(5000, () => {
	console.log('listening at port: 5000');
})