var express = require('express');
var router = express.Router();
var steam_api_key = process.env.STEAM_API_KEY;
var request = require('request');
var steam_format = '&format=json';

function getGames(steam_id, res){
  request('http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=' + steam_api_key + '&steamid=' + steam_id + '&include_appinfo=1' +  steam_format, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var object = JSON.parse(body);
      var response = object.response;
      var RGames = response.games;
      var gamename = RGames[0].name;
      // console.log(RGames[0].appid);
      res.render('getgames', { title: 'Steam API',
                                games: body,
                                gamecount: response.game_count,
                                gamename: gamename
                                });
    }
  })
};

router.post('/getgames', function(req, res){
  var games = getGames(req.body.steamID, res);
});

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express', name: 'Joe' });
});

module.exports = router;

