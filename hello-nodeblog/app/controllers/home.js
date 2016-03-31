var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Post = mongoose.model('Post');

module.exports = function (app) {
  app.use('/', router);
};

router.get('/', function (req, res, next) {
  Post.find().populate('author').populate('category').exec(function(err, posts){
    if (err) return next(err);
    res.render("blog/index", {
      title: "Node Blog Home",
      posts: posts,
      pretty: true
    });
  });
});

router.get("/about", function (req, res, next) {
  res.render("blog/index", {
    title: "About me",
    pretty: true
  });
});

router.get("/contant", function (req, res, next) {
  res.render("blog/index", {
    title: "Concat me",
    pretty: true
  });
});

//获取用户列表
router.get("/listUsers", function(req, res){
  fs.readFile("public/data/users.json", "utf8", function(err, data){
    console.log(data);
    res.end(data);
  });
})

//添加用户
router.get('/addUser', function(req, res){
  var user = {
    "user4": {
      "name": "mohit",
      "password": "password4",
      "profession": "teacher",
      "id": 4
    }
  };
  //读取已存在的数据
  fs.readFile("public/data/users.json", "utf8", function(err, data){
    data = JSON.parse(data);
    data["user4"] = user["user4"];
    console.log(data);
    res.end(JSON.stringify(data));
  });
});

//显示用户详情
router.get("/:id", function(req, res){
  //读取已存在的用户
  fs.readFile("public/data/users.json", "utf8", function(err, data){
    data = JSON.parse(data);
    var user = data["user" + req.params.id];
    console.log(user);
    res.end(JSON.stringify(user));
  });
});

//删除用户
router.get("/deleteUser", function(req, res){
  console.log("读取用户信息");
  fs.readFile("public/data/users.json", "utf8", function(err, data){
    data = JSON.parse(data);
    delete data["user" + 2];
    console.log(data);
  });
});
