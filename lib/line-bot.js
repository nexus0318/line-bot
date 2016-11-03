'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _config2 = require('../config');

var _config3 = _interopRequireDefault(_config2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var port = '443';

var _config = _extends({}, _config3.default),
    CHANNEL_ID = _config.CHANNEL_ID,
    CHANNEL_SERECT = _config.CHANNEL_SERECT,
    MID = _config.MID;

var LINE_API = 'https://trialbot-api.line.me/v1/events';

app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: true }));

app.post('/callback', function (req, res) {
  // const result = req.body.result;
  var jsonData = JSON.parse(req.body);
  console.log('receive: ', jsonData);
  console.log('type: ', jsonData.events[0].type);
  console.log('replyToken: ', jsonData.events[0].replyToken);
  console.log('source: ', jsonData.events[0].message);

  //sendTextMessage(data.from, data.text);
});

app.listen(process.env.PORT || port, function () {
  return console.log(port);
});

function sendTextMessage(sender, text) {

  var data = {
    to: [sender],
    toChannel: 1383378250,
    eventType: '138311608800106203',
    content: {
      contentType: 1,
      toType: 1,
      text: text
    }
  };

  console.log('send: ', data);

  (0, _request2.default)({
    url: LINE_API,
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      'X-Line-ChannelID': CHANNEL_ID,
      'X-Line-ChannelSecret': CHANNEL_SERECT,
      'X-Line-Trusted-User-With-ACL': MID
    },
    method: 'POST',
    body: JSON.stringify(data)
  }, function (error, response, body) {
    if (error) {
      console.log('Error sending message: ', error);
    } else if (response.body.error) {
      console.log('Error: ', response.body.error);
    }
    console.log('send response: ', body);
  });
}