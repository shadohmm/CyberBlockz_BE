const { AppDataSource } = require("../ormconfig");
const CertAndStudent = require("../entities/CertificateAndStudentEntity");

const certAndStudentService = {
    addCertificate:async (req, res) => {
        const {
            // certificate_key,
            student_mail,
            certificate_name,
            certificate_issued_date,
            certificate_expiry,
            does_cert_expires,
            student_name,
        } = req.body;
    
        // Validate required fields
        if (!student_mail || !certificate_name || !certificate_issued_date || !student_name) {
            return res.status(400).json({ message: "Mandatory fields are missing." });
        }
    
        try {
            const certificateRepository = AppDataSource.getRepository(CertAndStudent);
    
            // Create and save the new certificate record
            const certificate_key = Date.now();
            const newCertificate = certificateRepository.create({
                certificate_key,
                student_mail,
                certificate_name,
                certificate_issued_date,
                certificate_expiry,
                does_cert_expires,
                student_name,
            });
    
            const savedCertificate = await certificateRepository.save(newCertificate);
    
            res.status(201).json({ message: "Certificate added successfully", certificate: savedCertificate });
        } catch (error) {
            console.error(error);
    
            // Handle unique constraint errors
            if (error.code === "ER_DUP_ENTRY") {
                return res.status(409).json({ message: "Duplicate entry: certificate_key or student_mail already exists." });
            }
    
            res.status(500).json({ message: "Internal server error." });
        }
    },
    getCertificate:async(req,res) =>{
        const {certificate_key} =req.body;
        if (!certificate_key) {
            return res.status(400).json({ message: "certificate_key is required." });
        }
        const certificateRepository = AppDataSource.getRepository(CertAndStudent);
        try {
            const certificate = await certificateRepository.findOneBy({ certificate_key });
            if(!certificate) {
                return res.status(404).json({ message: "certificate not found." });
            }
            return res.status(200).json({ certificate });
            
        } catch (error) {
            console.log("error while getting the certificate details",error);
            res.status(500).json({ message: "Internal server error." });
        }
    }
};

module.exports = certAndStudentService;