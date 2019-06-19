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

const Orders = sequelize.define('orders', {
    sid: {
        field: 'sid',
        primaryKey: true,
        type: Sequelize.BIGINT,
        allowNull: false
    },
    number: {
        field: 'number',
        type: Sequelize.BIGINT,
        allowNull: false
    },
    address: {
        field: 'address',
        type: Sequelize.STRING,
        allowNull: false
    },
    phone: {
        field: 'phone',
        type: Sequelize.BIGINT,
        allowNull: false
    },
    time: {
        field: 'time',
        type: Sequelize.STRING,
        allowNull: false
    },
    status: {
        field: 'status',
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
}, {
    autoIncrement: true,
    tableName: 'orders',
    timestamps: false,
    freezeTableName: true    
});
module.exports = { sequelize, Orders };