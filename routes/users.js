var express = require('express');
var router = express.Router();
const fetch = require("node-fetch");
const myJson=require("../dupa.json")


router.all('*',(req,res,next)=>{
    if(!req.session.countries){
      res.redirect('/')
    }
    next();
  });

router.post('/:id',(req,res)=>{
  const params=req.params
  console.log(req.params.id)
  const body=req.body;
  console.log('body land',body.land);
  if(params.id===body.land)
  {
    req.session.good+=1
    console.log( req.session.admin)
    res.redirect('/users')
  }else{
    req.session.bad+=1
    res.redirect('/users')
  }
})
// --------------------------------------resetowanie wyniku 
router.get('/reset', function(req, res) {
  req.session.good=0
  req.session.bad=0
  req.session.countries=undefined
  console.log(myJson[0].name +' nazwa mojego panswtwa z jsona')
  myJson.forEach(a=>{console.log(a.name)})

  res.redirect('/')
})
// ====================================================== klikanie na flagi
router.get('/linik/:pierwsze/:drugie/:name', function(req, res) {
  const params=req.params
  console.log(params.name)
  if(params.pierwsze===params.drugie)
  {
    req.session.good+=1
    // console.log( req.session.admin)
    res.redirect('/users')
  }else{
    req.session.bad+=1
  //   fetch('https://restcountries.eu/rest/v2')
  // .then(response => response.json())
  // .then(data => {
  //   req.session.flag=''
   
  //   for(let i=0; i<250; i++){
  //     if(data[i].name===params.name){
  //       req.session.flag=data[i].flag
  //       req.session.names=req.params.name
  //     console.log(params.name,' znajduje sie na ',i)
  //     }
  //   }
  //   res.redirect('/users')
  // })
  myJson.forEach(a=>{
    if(a.name===params.name){
      req.session.flag=a.flag
      req.session.names=req.params.name;
      req.session.region=a.subregion;
      req.session.capitol=a.capital;
    }
  })
  res.redirect('/users')
  }

})

/* GET users listing. */
router.get('/', function(req, res) {
  let tab=[0,1,2,3]
  req.session.good
  req.session.bad
  req.session.flag
  req.session.names
  req.session.region
  req.session.capitol
  
    let countriesIndex=[]
    // console.log(req.session.countries)

    if(req.session.countries.includes('Caly swiat')){
      for(let i=0;i<250;i++){
        countriesIndex.push(i)
      }
    }else {
       for(let i=0;i<250;i++){
          if(req.session.countries.includes(myJson[i].region)){
            countriesIndex.push(i)
      }
    }}
   
    console.log(countriesIndex.length)
    
    let randoms=randomI(countriesIndex)
    console.log(randoms)
    // if(randoms.length!==4){
    //   console.log("powtórka mamy tylko 3 w tablicy")
    //   randoms=randomItems()
    // }

    let choosen={
      first:myJson[randoms[0]],
      second:myJson[randoms[1]],
      third:myJson[randoms[2]],
      fourth:myJson[randoms[3]],
    }
    let names={
      firstland:choosen.first.name,
      secondland:choosen.second.name,
      thirdtland:choosen.third.name,
      fourthland:choosen.fourth.name,

    }
    let tabWithNamesforRandom=[names.firstland,names.secondland,names.thirdtland,names.fourthland]
    let myRadnomCounrtyName=Math.floor(Math.random() * 4)
    let choosenLand=tabWithNamesforRandom[myRadnomCounrtyName]

    console.log(myRadnomCounrtyName)

    let flags={
      firstflag:choosen.first.flag,
      secondflag:choosen.second.flag,
      thirdtflag:choosen.third.flag,
      fourthflag:choosen.fourth.flag,
    }
    console.log(randoms)
  //  console.log('wylosowałem kraj 1 ',choosen.first.name)
  //  console.log('wylosowałem kraj  2',choosen.second.name)
  //  console.log('wylosowałem kraj  3',choosen.third.name)
  //  console.log('wylosowałem kraj  4' ,choosen.fourth.name)
    
  //  for(let i=0;i<250;i++){
  //   if(i===randoms[0]){
  //     console.log(data[i].name,'kraj tory wylosowałem pozniej to ')
      
  //   }

  //   }
    const info=req.session.countries
    const capitol=req.session.capitol
    const region= req.session.region
    console.log(capitol)

    res.render('index',{title:'Dodaj zlecenie',names:choosenLand, flags,myRadnomCounrtyName, good:req.session.good, bad:req.session.bad, tab,sessionFlag:req.session.flag, sessionNames:req.session.names, info,capitol,region});
  // res.render('index',{title:'Dodaj zlecenie',errors,body,dane});
  // res.json({ user: 'kamil' });
});
function randomI(data){
  let arr=[]
  while(arr.length<4){
    let first = data[Math.floor(Math.random() * data.length)]

    if(arr.includes(first)){
      console.log('zawiera juz !!!!!!!!!!!!')
      // arr.push(first)
    }else{
      arr.push(first)
      console.log('nie zawiera  ')
    }
  }
  console.log(arr)
  return arr;
}
function randomItems(data){
  let arr=[]
  while(arr.length!==4){
  let first=data[Math.floor(Math.random() * data.length)]
  arr.push(first)
  console.log(arr)
  let second=data[Math.floor(Math.random() * data.length)]
    if(arr.includes(second)){
     second=data[Math.floor(Math.random() * data.length)]
     console.log('druga losuje jeszcze raz')
    //  arr.push(second)
     }else{
      arr.push(second)
     }
     console.log(arr)
  let third=data[Math.floor(Math.random() * data.length)]
    if(arr.includes(third)){
    third=data[Math.floor(Math.random() * data.length)]
    console.log('trzecia losuje jeszcze raz')
    // arr.push(third)
    } else{
      arr.push(third)
     }
     console.log(arr)
  let fourth=data[Math.floor(Math.random() * data.length)]
    if(arr.includes(fourth)){
    fourth=data[Math.floor(Math.random() * data.length)]
    console.log('czwarta losuje jeszcze raz')
    // arr.push(fourth)
   } else{
    arr.push(fourth)
   }
   console.log(arr)
  console.log('długosc tablicy losujacej to:',arr.length)
}
  return arr;
}
module.exports = router;
