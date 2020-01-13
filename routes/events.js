const express = require('express');
const router = express.Router();
const moment = require('moment');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'roger16@ethereal.email',
        pass: 'SzMjuZhjSTT1mTGZar'
    }
});
// Load Event model
const Event = require('../models/event');
let User = require('../models/user');

// User Calendar Page
router.get('/calendar', ensureAuthenticated, (req, res) => {

    let admin  = false;
    if(req.user.admin == true)
        admin = true; 
    Event.find({})
        .sort({date: 'desc'})
        .then(events => {
            res.render('calendar', {
                admin: admin,
                title:"Book a meeting",
                events
            })
        })
        .catch(err => console.log(err));
});

router.get('/add', ensureAuthenticated, (req, res) => {
    res.render('add-event',{
        title:"Add event"
    });
});

router.post('/add', ensureAuthenticated, (req, res) => {
    req.checkBody('title', 'Title is required').notEmpty();
    req.checkBody('startdate', 'Start Date is required').notEmpty();
    req.checkBody('enddate', 'End Date is required').notEmpty();
    req.checkBody('starttime', 'Start Time is required').notEmpty();
    req.checkBody('endtime', 'End Time is required').notEmpty();
    req.checkBody('description', 'Description is required').notEmpty();

    let errors = req.validationErrors();
    
    if(errors)
    {
        res.render('add-event', {
            title:'Add event',
            errors:errors
        });
    } else {
        let event =  new Event();
        event.title = req.body.title;
        event.startdate = req.body.startdate;
        event.enddate= req.body.enddate;
        event.starttime = req.body.starttime;
        event.endtime = req.body.endtime;
        event.description = req.body.description;
        event.username = req.user.name;
        event.useremail= req.user.email;
        event.userphone = req.user.phone;

        // Construct the date
        const eventDate = moment(`${event.startdate} ${event.starttime}`, 'DD/MM/YYYY HH:mm');
        event.startdate = eventDate;
        const endeventDate = moment(`${event.enddate} ${event.endtime}`, 'DD/MM/YYYY HH:mm');
        event.enddate =  endeventDate;

        // Save the event on DB
  
          
        event
            .save()
            .then(event => {
                if (event) {
                    // mail 
                    var mailOptions = {
                        from: 'roger16@ethereal.email',
                        to: event.useremail,
                        subject: 'Your appointment was succesful',
                        text: 'Thank you for choosing me!'
                      };

                      var mailOptions2 = {
                        from: 'roger16@ethereal.email',
                        to: 'isfgabriel11@gmail.com',
                        subject: 'You have a new appointment',
                        text: 'From'+event.username
                      };
                      
                      transporter.sendMail(mailOptions, function(error, info){
                        if (error) {
                          console.log(error);
                        } else {
                          console.log('Email sent: ' + info.response);
                        }
                      });
                      transporter.sendMail(mailOptions2, function(error, info){
                        if (error) {
                          console.log(error);
                        } else {
                          console.log('Email sent: ' + info.response);
                        }
                      });

                    // Set the success message
                    req.flash(
                        'success_msg', `Your event "${event.title}" has been created`
                    );
                    res.redirect('/events/calendar');
                }
            })
            .catch(err => console.log(err));
    }
});


function ensureAuthenticated(req, res, next){
    if(req.isAuthenticated() ){
        return next();
    } else {
        req.flash('danger', 'Your action is unauthorized');
        res.redirect('../users/login');
    }

}



module.exports = router;