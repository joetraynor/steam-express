var express = require('express');
var router = express.Router();
var steam_api_key = process.env.STEAM_API_KEY;
var request = require('request');
var steam_format = '&format=json';

function getGames(steam_id, res){
  request('http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=' + steam_api_key + '&steamid=' + steam_id + '&include_played_free_games=1' + '&include_appinfo=1' +  steam_format, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var object = JSON.parse(body);
      var response = object.response;
      var RGames = response.games;
      // console.log(RGames[0].appid);
      res.render('getgames', { title: 'Steam API',
                                games: RGames,
                                gamecount: response.game_count,
                                });
    }
  })
};

function convertSteamID(steam_id, res) {
 request('http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001?vanityurl=' + steam_id + '&key=' + steam_api_key, function (error, response, body) {
  if (!error && response.statusCode == 200) {
     var object = JSON.parse(body);
     var response = object.response;
     var steamID = response.steamid;
     getGames(steamID, res);
   }
 })
};

router.post('/getGames', function(req, res) {
  if (isNaN(parseInt(req.body.steamID))) {
    convertSteamID(req.body.steamID, res)
  } else {
    getGames(req.body.steamID, res);
  };
});

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express', name: 'Joe' });
});

module.exports = router;

