const certAndStudentService = require("../services/certAndStudentService")

const getCertificateDetails = async(req,res)=>{
    try {
        await certAndStudentService.getCertificate(req,res);
    } catch (error) {
        console.log("error while fetching the certificate Details", error);
    }
};

const addCertificate = async(req,res)=>{
    try {
        await certAndStudentService.addCertificate(req,res);
    } catch (error) {
        console.log("error while fetching the certificate Details", error);
    }
};

module.exports ={getCertificateDetails,addCertificate}