import { Sequelize, DataTypes } from 'sequelize'
import moment from 'moment'
import sequelize from './sequelize'

// 用户
const YonghuModel = sequelize.define('YonghuModel', {
	id: {
		type: DataTypes.BIGINT,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
		comment: '主键id'
	},
	yonghuzhanghao: {
		type: DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: '用户账号'
	},
	mima: {
		type: DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: '密码'
	},
	yonghuxingming: {
		type: DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: '用户姓名'
	},
	xingbie: {
		type: DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: '性别'
	},
	yonghudianhua: {
		type: DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: '用户电话'
	},
	touxiang: {
		type: DataTypes.TEXT,
		defaultValue: '',
		allowNull: true,
		comment: '头像'
	},
	money: {
		type: DataTypes.FLOAT,
		defaultValue: 0,
		allowNull: true,
		comment: '余额'
	},
	addtime: {
  		type: DataTypes.DATE,
  		defaultValue: DataTypes.NOW,
    	allowNull: false,
    	get() {
            return moment(this.getDataValue('addtime')).format('YYYY-MM-DD HH:mm:ss')
        },
		comment: '添加时间'
	}
}, {
	timestamps: false,
	freezeTableName: true,
	tableName: 'yonghu'
})

export default YonghuModel
