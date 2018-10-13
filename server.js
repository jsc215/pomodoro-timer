const path = require('path');
const express = require('express');
const app = express();

app.use(express.static(__dirname + '/dist/pomodoro-timer'));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname + '/dist/pomodoro-timer/index.html'));
});

app.listen(process.env.PORT || 3000)
