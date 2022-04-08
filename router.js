var express = require('express')
var router = express.Router()

const credential = {
    username : 'admin',
    password : 'admin'
}
//login user............
router.post('/login',(req,res)=>{
    if(req.body.username==credential.username && req.body.password==credential.password ){
       if( req.session.user=req.body.username){
        res.redirect('/route/home')
       }
        // res.end('login successfull');    
    }if(req.session.user!=req.body.username){
        if(req.body.username=="" || req.body.password==""){
            res.render("base",{invalid:"username and password must not be empty"})
        }else{
            res.render("base",{invalid:"Invalid Username or Password"})
        }
    }
});

//route for Home
router.get('/home',(req, res)=>{
    if(req.session.user){
        res.render('home',{user:req.session.user})
    }else{
        res.render('base')
    }
})

//route for logout
router.get('/logout',(req,res)=>{
    req.session.destroy((err)=>{
        if(err){
            console.log(err);
            res.send('Error')
        }else{
            res.render('base',{title:'',logout:'Logout successfully.'})
        }
    })
})


module.exports = router;