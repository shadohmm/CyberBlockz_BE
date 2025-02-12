const { AppDataSource } = require("../ormconfig");
const Course = require("../entities/CourseEntity");

const courseService = {
    getCourses:async(req,res) => {
        const courseRepository = AppDataSource.getRepository(Course);
        try {
            const courses = await courseRepository.find()
            console.log("courssss",courses)
            return res.status(200).json({ courses });
        } catch (error) {
            console.log(error)
            
        }
    },
    addCourse: async (req, res) => {
        const { course_name, course_description, course_price, course_duration, course_image, difficulty} = req.body;
    
        // Validate mandatory fields
        if (!course_name) {
            return res.status(400).json({ message: "Course name is required." });
        }
    
        const courseRepository = AppDataSource.getRepository(Course);
    
        try {
            const isCourseAvailable = await courseRepository.findOneBy({course_name})
            if(isCourseAvailable){
                return res.status(409).json({ message: "Course is already registered." });
            }
            // Create and save the new course
            const newCourse = courseRepository.create({ course_name, course_description, course_price, course_duration, course_image, difficulty });
            const savedCourse = await courseRepository.save(newCourse);
    
            console.log("New course added:", savedCourse);
            return res.status(201).json({ message: "Course added successfully", course: savedCourse });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error." });
        }
    }
    
}

module.exports = courseService;