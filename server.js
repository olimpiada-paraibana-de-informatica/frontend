const express = require('express');
const path = require('path');
const app = express();

app.use(express.static('./dist/opi-frontEnd'))

app.listen(process.env.PORT || 3000)

app.get('/',function(req,res){
    res.sendFile(path.join(__dirname+'./dist/opi-frontEnd/index.html'));
});