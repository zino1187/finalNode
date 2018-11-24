var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '나의 노드 서버 구축성공' });
});

/* 등록요청 */
router.post('/profile/regist', function(request, response, next) {
  console.log("등록을 원해?");
  //console.log(request.body);  
});

module.exports = router;
