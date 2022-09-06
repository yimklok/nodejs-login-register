import Sequelize from 'sequelize'

const db = new Sequelize('nodejs-login','root','',{
    host: 'localhost',
    dialect: 'mysql'
})

export default db