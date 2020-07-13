const Report = require('../../../models/report');

// doctor can check reports by Status
module.exports.reportsByStatus = async function(req, res){
    try{
        // fetching report with provided status and created by a current logged in doctor
        let reports = await Report.find({status: req.params.status, doctor: req.user.id})
            .sort('-createdAt')
            .populate('patient', 'name mobile')
            .populate('doctor', 'name email');
            
            return res.json(200, {
                message: "List of Reports of a patient for the given status",
                reports: reports
            })
    }
    catch(err){
        console.log('********', err);
        return res.json(500, {
            message: "Internal Server Error"
        });
    }

}