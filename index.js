const express = require('express');
const port = 8181;
const ejs = require('ejs');
const path = require('path');

const app = express();

const contact_list = [
    {
        name:'utkarsh', 
        number:'8743838398'
    }
];

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'view'));





app.listen(port,function test(err){
            if(err) {
                console.log('error: ', err);
                return;
            } 
            else{
                console.log('Server is Up!!');
                

            }
        });

app.get('/',function(req,res){
    return res.render('home',{
        contactlist: contact_list
    });
})

