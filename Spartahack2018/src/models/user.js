/**
 * Project: Spartahack2018
 * File name: user
 * Created by:  joshbenner on 1/20/18.
 *
 * Outside references:
 *
 * Purpose:
 */
'use strict';

const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    formattedName: String,
    firstName: String,
    lastName: String,
    dateOfBirth: Date,
    allergies: [String],
    Procedure: String,
    Surgeon: String,
    startTime: Date,
    endTime: Date,
    heartRate: [Number],
    bloodPressure: [Number],
    oxygenLevel: [Number],
    temperature: [Number],
    surgeryType: String,
    inTools: [String],
    outTools: [String]
});

const model = mongoose.model('User', userSchema);

module.exports = model;
