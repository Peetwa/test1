/**
 * Project: Spartahack2018
 * File name: vitals
 * Created by:  joshbenner on 1/21/18.
 *
 * Outside references:
 *
 * Purpose:
 */
'use strict';

module.exports = function( router, User ) {


    /**
     * Get all the patients vitals
     * @return:
     */
    router.get('/vitals/', function(req, res){
        User.findOne({"firstName": "Peter"}, function(err, user){
            if(err){
                return res.status(500).json({message: `Failed to grab their vitals`});
            }
            res.status(200).json({'user': user, message:
                `Peter currently has a heart rate of ${user.heartRate[user.heartRate.length - 1]} beats per minute, a blood pressure of ${user.bloodPressure[0]} over ${user.bloodPressure[1]}, oxygen levels of ${user.oxygenLevel[user.oxygenLevel.length - 1]}% and a temperature of ${user.temperature[user.temperature.length -1]} F. 
`});
        });
    });

    /**
     * Add a heart rate log to the patient
     * @param: heart rate to add to the patient
     * @return:
     */
    router.post('/heartrate/:heartrate', function(req, res){
        const heartRate = req.params.heartrate;
        User.findOneAndUpdate({"firstName": "Peter"}, {$push : {heartRate: heartRate}}, {new: true}, function(err, user){
            if(err){
                return res.status(500).json({message: `Failed to add the heart rate measurement`});
            }
            res.status(200).json({'user': user, message: `Successfully added ${heartRate}`});
        });
    });

    /**
     * Get the patients heart rate
     * @return:
     */
    router.get('/heartrate/', function(req, res){
        User.findOne({"firstName": "Peter"}, function(err, user){
            if(err){
                return res.status(500).json({message: `Failed to grab their heart rate`});
            }
            res.status(200).json({'user': user, message:
                `Peter currently has a heart rate of ${user.heartRate[user.heartRate.length - 1]} beats per minute.`});
        });
    });

    /**
     * Add a blood pressure reading log to the patient
     * @param: blood pressure to add to the patient
     * @return:
     */
    router.post('/bloodpressure/', function(req, res){
        const bloodpressure = req.query.bloodpressure;
        console.log("here");
        let bloodPressureArr = bloodpressure.split(",");
        const bloodPressure = [];
        for(var i=0; i<bloodPressureArr.length; i++) { bloodPressure[i] = parseInt(bloodPressureArr[i], 10); }
        console.log("bpm: ", JSON.stringify(bloodPressure));
        User.findOneAndUpdate({"firstName": "Peter"}, {$set: {bloodPressure: bloodPressure}}, {new: true}, function(err, user){
            if(err){
                return res.status(500).json({message: `Failed to add the heart rate measurement`});
            }
            return res.status(200).json({'user': user, message: `Logged a blood pressure of ${user.bloodPressure[0]} over ${user.bloodPressure[1]} for ${user.firstName}`});
        });
    });

    /**
     * Get the patients heart rate
     * @return:
     */
    router.get('/bloodpressure/', function(req, res){
        User.findOne({"firstName": "Peter"}, function(err, user){
            if(err){
                return res.status(500).json({message: `Failed to grab their heart rate`});
            }
            res.status(200).json({'user': user, message:
                `Peter has a blood pressure of ${user.bloodPressure[0]} over ${user.bloodPressure[1]}`});
        });
    });

    /**
     * Get the patients oxygen level
     * @return:
     */
    router.get('/oxygen/', function(req, res){
        User.findOne({"firstName": "Peter"}, function(err, user){
            if(err){
                return res.status(500).json({message: `Failed to grab their oxygen level`});
            }
            res.status(200).json({'user': user, message:
                `Peter currently has a oxygen levels of ${user.oxygenLevel[user.oxygenLevel.length - 1]}%`});
        });
    });

    /**
     * Get the patients temperature
     * @return:
     */
    router.get('/temperature/', function(req, res){
        User.findOne({"firstName": "Peter"}, function(err, user){
            if(err){
                return res.status(500).json({message: `Failed to grab their temperature`});
            }
            res.status(200).json({'user': user, message:
                `Peter currently has a temperature of ${user.temperature[user.temperature.length -1]} F. `});
        });
    });
};