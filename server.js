const express = require('express');
const app = express();
const mongoose = require('mongoose')
const collection2 = require('./signup.js')
const checkout = require('./checkout.js')
//const collection1 = require('./login.js')
const port = 3000;
const path = require('path');
const fs = require('fs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('.'));
const connect = mongoose.connect('mongodb://0.0.0.0:27017/SneakPeak');
connect.then(() => {
    console.log('connect sucessfully');
}).catch(err => {
    console.log(err);
})
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'))
});
app.post('/signup', async (req, res) => {
    console.log("hiii")
    let name = req.body.Name;
    let email = req.body.Email;
    let pass = req.body.psname;
    let cpass = req.body.cpsname;
    if (pass != cpass)
        res.sendFile(path.join(__dirname + '/login.html'))
    try {
        // Check if the user exists
        const existingUser = await collection2.findOne({ Email: email });
        if (existingUser) {
            return res.sendFile(path.join(__dirname + '/login.html'))
        }
        let result = new collection2({
            Name: name,
            Password: pass,
            Email: email

        });
        console.log("hello world");
        result.save()
            .then(data => {
                console.log('Data is successfully saved:', data);
                res.sendFile(path.join(__dirname + '/index.html'));

            })
            .catch(err => {
                console.error('Error saving data:', err);
                res.status(500).send("Internal Server Error");
            });
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
})
//login
app.post('/login', async (req, res) => {
    console.log(req.body);
    try {
        const check = await collection2.findOne({ Email: req.body.Email });
        if (!check)
            res.sendFile(path.join(__dirname + '/login.html'))
        const pcheck = await collection2.findOne({ Password: req.body.psname });
        if (!pcheck)
            res.sendFile(path.join(__dirname + '/login.html'))
        res.sendFile(path.join(__dirname+'/index.html'))
    } catch(err) {
        console.log(err);
    }
})

app.post('/checkout', async (req, res) => {
    const {name,phone,address} = req.body;
    try {
        await checkout.create({name:name,phone:phone,address:address}).then(()=>{
            res.redirect("/");
        })
    } catch(err) {
        console.log(err);
    }
})
app.listen(port, err => {
    if (err) console.log('error')
    else console.log("server sterted")
})