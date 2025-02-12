const {EntitySchema} = require("typeorm");

const Course = new EntitySchema({
   name: "Course",
   tableName: "courses",
   columns: {
    id: {
        primary:true,
        type: "int",
        generated: true
    },
    course_name: {
        type: "varchar",
        unique:true
    },
    course_description: {
        type:"varchar"
    },
    course_price: {
        type:"int"
    },
    course_duration: {
        type:"int"
    },
    course_image: {
        type:"varchar"
    },
    difficulty: {
        type:"varchar"
    }
   }
});

module.exports = Course;