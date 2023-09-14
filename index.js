const express = require('express');
const port = 8181;
const ejs = require('ejs');
const path = require('path');
const { urlToHttpOptions } = require('url');

const app = express();

const contact_list = [
    {
        name:'utkarsh', 
        number:'8743838398'
    }
];

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'view'));
app.use(express.urlencoded());





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
function addcontact(req){
    console.log(req.body);
    contact_list.push(req.body);

}

app.post('/create-contact',(req,res)=>{
    // console.log();
        addcontact(req);

    return res.redirect('/');
})
