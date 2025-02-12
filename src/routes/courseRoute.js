const { AppDataSource } = require("../ormconfig");
const Course = require("../entities/CourseEntity");
const courseService= require("../services/courseService")

const getAllCourses = async(req,res)=>{
    try {
        // const courseRepository = AppDataSource.getRepository(Course);
        await courseService.getCourses(req,res);
        
    } catch (error) {
        console.log(error)
        
    }
};

const addCourses = async(req,res)=>{
    try {
        // const courseRepository = AppDataSource.getRepository(Course);
        await courseService.addCourse(req,res); 
    } catch (error) {
        console.log(error)
        
    }
};

module.exports = {getAllCourses,addCourses};