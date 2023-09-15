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

app.get('/delete-contact',(req,res)=>{
    let phone = req.query.phone;
    // console.log(req.query.phone);
    let contactIndex = contact_list.findIndex((contact)=>{
        return contact.number == phone    // Return keyword is compulsory when {} is used 
    

    })
    
    // console.log(contactIndex);
    if(contactIndex !== -1){
        contact_list.splice(contactIndex, 1);
        // console.log('test1');
        
    }
    return res.redirect('back');


})

// app.get('/delete-contact', (req, res) => {
//     let phone = req.query.phone;
//     console.log(phone);
//     let contactIndex = contact_list.findIndex((contact) => {
//         return contact.phone === phone; // Use === for comparison
//     });
//     if (contactIndex !== -1) {
//         contact_list.splice(contactIndex, 1); // Remove the contact from the array
//     }
//     return res.redirect('back');
// });


app.set('view engine','ejs');
app.set('views',path.join(__dirname,'view'));
app.use(express.urlencoded());



app.use(express.static('assets'));

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
    // console.log(req.body);
    contact_list.push(req.body);

}

app.post('/create-contact',(req,res)=>{
    // console.log();
        addcontact(req);

    return res.redirect('/');
})
