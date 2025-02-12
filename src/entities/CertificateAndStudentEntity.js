const {EntitySchema} = require("typeorm");

const CertificateAndDetails = new EntitySchema({
    name: "CertificateAndDetailsModel",
    tableName: "certificate_and_student_details",
    columns: {
        certificate_key: {
            primary:true,
            type: "varchar",
        },
        student_mail: {
            type: "varchar",
            unique:true
        },
        certificate_name: {
            type:"varchar"
        },
        certificate_issued_date: {
            type:"date"
        },
        certificate_expiry: {
            type:"date"
        },
        does_cert_expires: {
            type:"char"
        },
        student_name: {
            type:"varchar"
        }
    }
});
module.exports = CertificateAndDetails;