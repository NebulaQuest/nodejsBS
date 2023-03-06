import { Sequelize, DataTypes } from 'sequelize'
import moment from 'moment'
import sequelize from './sequelize'

// 举报信息
const JubaoxinxiModel = sequelize.define('JubaoxinxiModel', {
	id: {
		type: DataTypes.BIGINT,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
		comment: '主键id'
	},
	jubaobianhao: {
		type: DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: '举报编号'
	},
	jubaobiaoti: {
		type: DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: '举报标题'
	},
	jubaozhanghao: {
		type: DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: '举报账号'
	},
	yonghuxingming: {
		type: DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: '举报姓名'
	},
	jubaoshijian: {
		type: DataTypes.DATE,
		allowNull: true,
		get() {
            return moment(this.getDataValue('jubaoshijian')).format('YYYY-MM-DD HH:mm:ss')
        },
		comment: '举报时间'
	},
	jubaoneirong: {
		type: DataTypes.TEXT,
		defaultValue: '',
		allowNull: true,
		comment: '举报内容'
	},
	yonghuzhanghao: {
		type: DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: '用户账号'
	},
	sfsh: {
		type: DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: '是否审核'
	},
	shhf: {
		type: DataTypes.TEXT,
		defaultValue: '',
		allowNull: true,
		comment: '审核回复'
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
	tableName: 'jubaoxinxi'
})

export default JubaoxinxiModel
