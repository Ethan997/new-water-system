const Sequelize = require('sequelize');
const sequelize = new Sequelize('water_system', 'root', '8995056', {
  host: '127.0.0.1',
  dialect: 'mysql',
  operatorsAliases: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
})
sequelize
  .authenticate()
  .then(() => {
    console.log('MYSQL 连接成功......');
  })
  .catch(err => {
    console.error('链接失败:', err);
  });
// 根据模型自动创建表
sequelize.sync()
// sequelize.query("select * from users", {type : sequelize.QueryTypes.SELECT}).then(function(user){
//     console.log(user);
// })
// const Users = sequelize.define('users', {
//     sid: {
//         field: 'sid',
//         primaryKey: true,
//         type: Sequelize.BIGINT,
//         allowNull: false
//     },
//     password: {
//         field: 'password',
//         type: Sequelize.STRING,
//         allowNull: false
//     }
// }, {
//     autoIncrement: true,
//     tableName: 'users',
//     timestamps: false,
//     freezeTableName: true    
// });

// Users.create({
//     sid: 23,
//     password: '老杨'
// });

module.exports = sequelize