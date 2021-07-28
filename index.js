require('dotenv').config();


const express = require('express'); 
const morgan = require('morgan');

// initialization
const app = express();
//require('./database');//base de datos

//settings
app.set('port', process.env.PORT || 3001);

//middleware
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use((req, res, next)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers', '*');
    if(req.method==='OPTIONS'){
        res.header('Access-Control-Allow-Methods','PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

//routes
app.use('/api/wallets',require('./routes/wallets'));

// server start
app.listen(app.get('port'), ()=>{
    console.log('server on '+ app.get('port'));
})
