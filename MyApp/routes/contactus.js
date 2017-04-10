var express = require('express');
var router = express.Router();
var validator = require('express-validator');
var fs = require('fs');

router.use(validator());

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('contactus', { title: 'Contact US',csrftoken:"test" });
});

router.post('./contactus', function (req, res, next) {
  console.log("Post");
  req.assert('fullname', 'Fullname is required').notEmpty();
  req.assert('message', 'Message is required').notEmpty();
  var errors = req.validationErrors();
  if (!errors) {
    console.log("Validation Passed");
    return next();
  }
}, function (req, res, next) {
  //save to file
  console.log("save to file");
  var filedata='fullname: '+req.body.fullname+' typeofcontact: '+req.body.type+'message: '+req.body.message+'IpAddress: '+req.body.ip;
  fs.writeFile('contactus.txt',
    filedata
    , (err, data) => {
      if (err) {console.log("file write error");
        return next(err);
      }
      else { return next(); }
    })
}
  , (req, res) => {
    console.log("Thank you");
    res.redirect("thankyou?fullname="+ req.body.fullname );
    res.end();
  });

module.exports = router;