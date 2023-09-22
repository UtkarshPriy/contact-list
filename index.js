const db = require('./config/mongoose');

const express = require('express');
const port = 8180;
const ejs = require('ejs');
const path = require('path');
const {
    urlToHttpOptions
} = require('url');



const app = express();

const Contact = require('./model/contact')

const contact_list = [{
    name: 'utkarsh',
    number: '8743838398'
}];
// const contact_list = Contact;

app.get('/delete-contact', async function(req, res) {
    try{
       const deletedContact = await Contact.findOneAndRemove({number: req.query.phone});
       return res.redirect('back');
    }
    catch(error){
        console.log(error);
    }
}
);



// {
//     let phone = req.query.phone;
//     // console.log(req.query.phone);
//     let contactIndex = contact_list.findIndex((contact) => {
//         return contact.number == phone // Return keyword is compulsory when {} is used 


    // })

    // // console.log(contactIndex);
    // if (contactIndex !== -1) {
    //     contact_list.splice(contactIndex, 1);
    //     // console.log('test1');

    // }
    // return res.redirect('back');


// });

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


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'view'));
app.use(express.urlencoded());



app.use(express.static('assets'));

app.listen(port, function test(err) {
    if (err) {
        console.log('error: ', err);
        return;
    } else {
        console.log('Server is Up!!');


    }
});

app.get('/', async function (req, res) {
    try {
        const contact = await Contact.find({});
        return res.render('home', {
            contactlist: contact
        })

    } catch (error) {
        console.log(error);
        return;

    }


    // Contact.find({},(error,contact)=>{
    //     // if(error){
    //     //     console.log(error);
    //     // }
    //     // return res.render('home', {
    //     //     contactlist: contact
    //     // })
    // })

    // return res.render('home', {
    //     contactlist: contact_list
    // });
})





// Uncomment the addcontact function
function addcontact(req, res) {
    console.log(req.body);
    Contact.create({
            name: req.body.name,
            number: req.body.number
        })
        .then(newContact => {

            console.log('New contact added:', newContact);
            // console.log('test');
            return res.redirect('back');
        })
        .catch(err => {
            console.error('Error adding contact:', err);
            return res.status(500).send('Internal Server Error');
        });
}

// Use the addcontact function in your /create-contact route
app.post('/create-contact', (req, res) => {
    addcontact(req, res); // Pass the res object to the function

    // Don't return res.redirect('/') here, as it will be handled by the addcontact function
});


// app.post('/create-contact',(req,res)=>{
//     // console.log();
//         addcontact(req);

//     return res.redirect('/');
// })