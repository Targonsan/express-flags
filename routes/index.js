var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.redirect('/users')
  res.render('main',{title:'Wybierz regiony świata jakie Cię interesują',});
});
router.post('/', function(req, res, next) {
  // res.redirect('/users')
  const body= req.body
  req.session.countries=[]
  console.log(body)
  if(body.ameryka!==undefined){
    console.log('wybrano ameryke')
    req.session.countries.push('Americas')
  }
  if(body.europa!==undefined){
    console.log('wybrano europa')
    req.session.countries.push('Europe')
  }
  if(body.asia!==undefined){
    console.log('wybrano asia')
    req.session.countries.push('Asia')
  }
  if(body.afryka!==undefined){
    console.log('wybrano afryka')
    req.session.countries.push('Africa')
  }
  if(body.oceania!==undefined){
    console.log('wybrano oceania')
    req.session.countries.push('Oceania')
  }if(body.all!==undefined){
    console.log('wybrano all')
    req.session.countries=[]
    req.session.countries.push('Caly swiat')
  }else if(body.oceania===undefined && body.afryka===undefined && body.asia===undefined && body.europa===undefined && body.ameryka===undefined && body.all===undefined){
    console.log('nic nie wybrano ')
    req.session.countries=[]
    req.session.countries.push('Caly swiat')

  }
  
  
  
  // res.render('main',{title:'Wybierz regiony świata jakie Cię interesują',});
  res.redirect('/users')
});

module.exports = router;
