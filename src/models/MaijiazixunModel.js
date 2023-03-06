import { Sequelize, DataTypes } from 'sequelize'
import moment from 'moment'
import sequelize from './sequelize'

// 卖家咨询
const MaijiazixunModel = sequelize.define('MaijiazixunModel', {
	id: {
		type: DataTypes.BIGINT,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
		comment: '主键id'
	},
	zixunbianhao: {
		type: DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: '咨询编号'
	},
	zixunbiaoti: {
		type: DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: '咨询标题'
	},
	zixunshijian: {
		type: DataTypes.DATEONLY,
		allowNull: true,
		get() {
            return moment(this.getDataValue('zixunshijian')).format('YYYY-MM-DD')
        },
		comment: '咨询时间'
	},
	zixunneirong: {
		type: DataTypes.TEXT,
		defaultValue: '',
		allowNull: true,
		comment: '咨询内容'
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
	maijiazhanghao: {
		type: DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: '买家账号'
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
	tableName: 'maijiazixun'
})

export default MaijiazixunModel
