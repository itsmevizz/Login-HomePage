const express = require ('express')
const path = require ('path')
const bodyparser = require('body-parser')
const session = require('express-session')
const{v4:uuidv4} = require ('uuid')

const router = require('./router')

const app  = express();

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))


app.set ('view engine', 'ejs')

app.use((req,res,next)=>{
    if(!req.user){
        res.header('cache-control','private,no-cache,no-store,must revalidate')
        res.header('Express','-1')
        res.header('paragrm','no-cache')
      
    }
    next();
})

//load static assets
app.use('/static',express.static(path.join(__dirname, 'public')))
app.use ('/assets', express.static(path.join(__dirname,'public/Assets')))
app.use(session({
    secret: uuidv4(),
    resave : false,
    saveUninitialized : true
}))

app.use('/route',router)

//Home route
app.get('/',(req,res)=>{
    if(req.session.user){
        res.render("home",{user:req.session.user})
    }else{
        res.render('base',{title:'log-in system'})
    }
    
})



app.listen(4040,()=>{
    console.log('Server connected');
})