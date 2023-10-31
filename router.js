const router = require('express').Router();


router.get('/',(req,res)=>{
    res.send('Let build CRUD API')
})

module.exports= router;