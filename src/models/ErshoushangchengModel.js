import { Sequelize, DataTypes } from 'sequelize'
import moment from 'moment'
import sequelize from './sequelize'

// 二手商城
const ErshoushangchengModel = sequelize.define('ErshoushangchengModel', {
	id: {
		type: DataTypes.BIGINT,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
		comment: '主键id'
	},
	shangpinbianhao: {
		type: DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: '商品编号'
	},
	shangpinmingcheng: {
		type: DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: '商品名称'
	},
	shangpinfenlei: {
		type: DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: '商品分类'
	},
	shangpinzhaopian: {
		type: DataTypes.TEXT,
		defaultValue: '',
		allowNull: true,
		comment: '商品照片'
	},
	xinjiuchengdu: {
		type: DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: '新旧程度'
	},
	shangpinxiangqing: {
		type: DataTypes.TEXT,
		defaultValue: '',
		allowNull: true,
		comment: '商品详情'
	},
	yonghuzhanghao: {
		type: DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: '用户账号'
	},
	yonghuxingming: {
		type: DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: '用户姓名'
	},
	clicktime: {
		type: DataTypes.DATE,
		allowNull: true,
		get() {
            return moment(this.getDataValue('clicktime')).format('YYYY-MM-DD HH:mm:ss')
        },
		comment: '最近点击时间'
	},
	clicknum: {
		type: DataTypes.INTEGER,
		defaultValue: 0,
		allowNull: true,
		comment: '点击次数'
	},
	price: {
		type: DataTypes.FLOAT,
		defaultValue: 0,
		allowNull: true,
		comment: '价格'
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
	tableName: 'ershoushangcheng'
})

export default ErshoushangchengModel
