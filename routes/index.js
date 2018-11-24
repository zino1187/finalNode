var express = require('express');
var oracledb = require('oracledb');
var router = express.Router();

oracledb.autoCommit=true;

var pool;
oracledb.createPool({
  user: "ng",
  password: "ng",
  connectString: "localhost/XE"
}, function (error, conPool) {
  if (error) {
    console.log(error);
  } else {
    pool = conPool;
  }
});

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: '나의 노드 서버 구축성공' });
});

/* 등록요청 */
router.post('/profile/regist', function (request, response, next) {
  console.log("등록을 원해?");
  //console.log(request.body);  
  var name = request.body.name;
  var age = request.body.age;
  var job = request.body.job;

  oracledb.getConnection(pool, function (error, con) {
    if (error) {
      console.log(error);
    } else {
      var sql="insert into profile(profile_id,name,age,job)";
      sql+=" values(seq_profile.nextval,:name,:age,:job)";
      con.execute(sql, [ name,age,job ], function(err,result){
        if(err){
            console.log(err);
        }else{
            console.log(result);
            if(result.rowsAffected==0){
              response.writeHead(500,{"Content-Type":"text/json"});
              response.end(JSON.stringify({
                result:0,
                msg:"등록실패ㅜㅜ"
              }));
            }else{
              response.writeHead(200,{"Content-Type":"text/json"});
              response.end(JSON.stringify({
                result:1,
                msg:"등록성공^^"
              }));
            }
        }
        con.close(function(e){});
      } );

    }
  });

});

module.exports = router;
