const express = require('express');
const router = express.Router();

const userRoute = require("./userRoute");
// const masterDetailsRoute = require("./masterDetailsRoute");
const courseRoute = require("./courseRoute");
const certAndStudentsDetailsRoute = require("./certAndStudentsDetailsRoute");

router.post('/register', userRoute.register);
router.post('/login', userRoute.login);
router.get('/get-all-courses',courseRoute.getAllCourses);
router.post('/add-course', courseRoute.addCourses);
router.post('/get-certificate',certAndStudentsDetailsRoute.getCertificateDetails);
router.post('/add-certificate',certAndStudentsDetailsRoute.addCertificate);
module.exports = router;