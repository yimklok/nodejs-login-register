import Sequelize from 'sequelize'
import db from '../Config/Database.js' 

const Users = db.define('users',{
    name:{
        type: Sequelize.STRING
    },
    email:{
        type: Sequelize.STRING
    },
    password:{
        type: Sequelize.STRING
    }
},{
    freezeTableName: true
})

export default Users