const {EntitySchema} = require("typeorm");

const MasterTable = new EntitySchema({
   name: "MasterTable",
   tableName: "master_table",
   columns: {
    id: {
        primary:true,
        type: "int",
        generated: true
    },
    page: {
        type: "varchar",
    },
    section: {
        type: "varchar",
    },
    details: {
        type:"longtext"
    }
   }
});

module.exports = MasterTable;