const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    startdate: {
        type: String,
        required: true
    },
    enddate:{
        type:String,
        required:true
    },
    starttime:{
        type:String,
        required:true
    },
    endtime:{
        type:String,
        required:true
    },
    description: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    useremail: {
        type: String,
        required: true
    },
    userphone:{
        type:String,
        required:true
    }

});

const Event = mongoose.model('Event', EventSchema);

module.exports = Event;