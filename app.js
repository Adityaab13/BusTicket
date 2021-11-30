const express = require('express');
const app = express();
const session = require('express-session');
const Routes = require('./routes');
const exphbs = require('express-handlebars');

app.use(session({
    name: 'AuthCookie',
    secret: 'some secret string',
    resave:  false,
    saveUninitialized: true
}))


app.use('/public', express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use('/private',(req,res,next) => {
    if(!req.session.username ){
        return res.redirect('/');
    }
    else{
        next();
    }
});

app.use((req,res,next) => {
    let string = "";
    if(!req.session.username)
        string = "User id not authenticated";
    else
        string = "User id authenticated";

console.log(new Date().toUTCString(),req.method,req.originalUrl, string);
next();
});


Routes(app);
app.listen(3000,()=>{
    console.log("we got a server now");
    console.log('Your routes will running in http://localhost:3000');
});
