router.get('/getgames', function(req, res){
  res.render('getgames', {games: games});
});