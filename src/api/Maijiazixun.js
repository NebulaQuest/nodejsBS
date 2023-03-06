import { version } from '../../package.json'
import { Router } from 'express'
import { Sequelize, Op, QueryTypes } from 'sequelize'
import sequelize from '../models/sequelize'
import toRes from '../lib/toRes'
import MaijiazixunModel from '../models/MaijiazixunModel'
import md5 from 'md5-node'
import util from '../lib/util'
import jwt from 'jsonwebtoken'
import moment from 'moment'


export default ({ config, db }) => {
	let api = Router()


	// 分页接口（后端）
	api.get('/page', async (req, res) => {

		try {

			let page = parseInt(req.query.page) || 1
			let limit = parseInt(req.query.limit) || 10
			let sort = req.query.sort || 'id'
			let order = req.query.order || 'asc'

			let where = {}
			let zixunbianhao = req.query.zixunbianhao
			if (zixunbianhao) {

				if (zixunbianhao.indexOf('%') != -1) {
					where.zixunbianhao = {
						[Op.like]: zixunbianhao
					}
				} else {
					where.zixunbianhao = {
						[Op.eq]: zixunbianhao
					}
				}
			}
			let zixunbiaoti = req.query.zixunbiaoti
			if (zixunbiaoti) {

				if (zixunbiaoti.indexOf('%') != -1) {
					where.zixunbiaoti = {
						[Op.like]: zixunbiaoti
					}
				} else {
					where.zixunbiaoti = {
						[Op.eq]: zixunbiaoti
					}
				}
			}
			let zixunshijian = req.query.zixunshijian
			if (zixunshijian) {

				if (zixunshijian.indexOf('%') != -1) {
					where.zixunshijian = {
						[Op.like]: zixunshijian
					}
				} else {
					where.zixunshijian = {
						[Op.eq]: zixunshijian
					}
				}
			}
			let zixunneirong = req.query.zixunneirong
			if (zixunneirong) {

				if (zixunneirong.indexOf('%') != -1) {
					where.zixunneirong = {
						[Op.like]: zixunneirong
					}
				} else {
					where.zixunneirong = {
						[Op.eq]: zixunneirong
					}
				}
			}
			let yonghuzhanghao = req.query.yonghuzhanghao
			if (yonghuzhanghao) {

				if (yonghuzhanghao.indexOf('%') != -1) {
					where.yonghuzhanghao = {
						[Op.like]: yonghuzhanghao
					}
				} else {
					where.yonghuzhanghao = {
						[Op.eq]: yonghuzhanghao
					}
				}
			}
			let yonghuxingming = req.query.yonghuxingming
			if (yonghuxingming) {

				if (yonghuxingming.indexOf('%') != -1) {
					where.yonghuxingming = {
						[Op.like]: yonghuxingming
					}
				} else {
					where.yonghuxingming = {
						[Op.eq]: yonghuxingming
					}
				}
			}
			let maijiazhanghao = req.query.maijiazhanghao
			if (maijiazhanghao) {

				if (maijiazhanghao.indexOf('%') != -1) {
					where.maijiazhanghao = {
						[Op.like]: maijiazhanghao
					}
				} else {
					where.maijiazhanghao = {
						[Op.eq]: maijiazhanghao
					}
				}
			}
			let sfsh = req.query.sfsh
			if (sfsh) {

				if (sfsh.indexOf('%') != -1) {
					where.sfsh = {
						[Op.like]: sfsh
					}
				} else {
					where.sfsh = {
						[Op.eq]: sfsh
					}
				}
			}
			let shhf = req.query.shhf
			if (shhf) {

				if (shhf.indexOf('%') != -1) {
					where.shhf = {
						[Op.like]: shhf
					}
				} else {
					where.shhf = {
						[Op.eq]: shhf
					}
				}
			}
            let sessionInfo = jwt.decode(req.headers.token)
			let orwhere = []
            if(sessionInfo['tableName'] == 'yonghu') {
                orwhere.push({ yonghuzhanghao: sessionInfo['username'] })
            }
            if(sessionInfo['tableName'] == 'yonghu') {
                orwhere.push({ maijiazhanghao: sessionInfo['username'] })
            }
            if(orwhere.length > 0) {
                where[Op.or] = orwhere
            }

			let result = await MaijiazixunModel.findAndCountAll({
				order: [[sort, order]],
				where,
				offset: (page - 1) * limit,
				limit
			})
			
			result.currPage = page
			result.pageSize = limit

			toRes.page(res, 0, result)
		} catch(err) {

			toRes.session(res, 500, '服务器错误！', '', 500)
		}
	})

    // 分页接口（前端）
	api.get('/list', async (req, res) => {

		try {

			let page = parseInt(req.query.page) || 1
			let limit = parseInt(req.query.limit) || 10
			let sort = req.query.sort || 'id'
			let order = req.query.order || 'asc'

			let where = {}
			let sfsh = req.query.sfsh
			if (sfsh) {
				where.sfsh = {
					[Op.eq]: sfsh
				}
			}
			let zixunbiaoti = req.query.zixunbiaoti
			if (zixunbiaoti) {

				if (zixunbiaoti.indexOf('%') != -1) {
					where.zixunbiaoti = {
						[Op.like]: zixunbiaoti
					}
				} else {
					where.zixunbiaoti = {
						[Op.eq]: zixunbiaoti
					}
				}
			}
			let yonghuxingming = req.query.yonghuxingming
			if (yonghuxingming) {

				if (yonghuxingming.indexOf('%') != -1) {
					where.yonghuxingming = {
						[Op.like]: yonghuxingming
					}
				} else {
					where.yonghuxingming = {
						[Op.eq]: yonghuxingming
					}
				}
			}


			let result = await MaijiazixunModel.findAndCountAll({
				order: [[sort, order]],
				where,
				offset: (page - 1) * limit,
				limit
			})
			
			result.currPage = page
			result.pageSize = limit

			toRes.page(res, 0, result)
		} catch(err) {
			
			toRes.session(res, 401, '您的权限不够！', '', 200)
		}
	})


	// 保存接口（后端）
	api.post('/save', async (req, res) => {

		try {

			Object.keys(req.body).forEach(item=>{
				if(req.body[item] == '')  delete req.body[item]
			})



			const userinfo = await MaijiazixunModel.create(req.body)

			if (userinfo === null) {

				toRes.session(res, -1, '添加失败！')
			} else {

				toRes.session(res, 0, '添加成功！')
			}
		} catch(err) {
			
			toRes.session(res, 500, '服务器错误！', '', 500)
		}
	})

    // 保存接口（前端）
	api.post('/add', async (req, res) => {

		try {

			Object.keys(req.body).forEach(item=>{
				if(req.body[item] == '')  delete req.body[item]
			})

			if (jwt.decode(req.headers.token) == null) {
				toRes.session(res, 401, '请登录后再操作', '', 401)
			}



			const userinfo = await MaijiazixunModel.create(req.body)

			if (userinfo === null) {

				toRes.session(res, -1, '添加失败！')
			} else {

				toRes.session(res, 0, '添加成功！')
			}
		} catch(err) {
			
			toRes.session(res, 500, '服务器错误！', '', 500)
		}
	})

	// 更新接口
	api.post('/update', async (req, res) => {

		try {



			await MaijiazixunModel.update(req.body, {
				where: {
				  id: req.body.id || 0
				}
			})


			toRes.session(res, 0, '编辑成功！')
		} catch(err) {
			
			toRes.session(res, 500, '服务器错误！', '', 500)
		}
	})

	// 删除接口
	api.post('/delete', async (req, res) => {

		try {

			await MaijiazixunModel.destroy({
				where: {
				  id: {
					[Op.in]: req.body
				  }
				}
			})

			toRes.session(res, 0, '删除成功！')
		} catch(err) {

			toRes.session(res, 500, '服务器错误！', '', 500)
		}
	})

	// 详情接口（后端）
	api.all('/info/:id', async (req, res) => {

		try {


			toRes.record(res, 0, await MaijiazixunModel.findOne({ where: { id: req.params.id } }))
		} catch(err) {

			toRes.session(res, 500, '服务器错误！', '', 500)
		}
	})

    // 详情接口（前端）
	api.all('/detail/:id', async (req, res) => {

		try {


			toRes.record(res, 0, await MaijiazixunModel.findOne({ where: { id: req.params.id } }))
		} catch(err) {

			toRes.session(res, 500, '服务器错误！', '', 500)
		}
	})

	// 获取需要提醒的记录数接口
	api.get('/remind/:columnName/:type', async (req, res) => {

		try {

			let sql = 'SELECT 0 AS count'
			
			if (req.params.type == 1) {
				if (req.query.remindstart) sql = "SELECT COUNT(*) AS count FROM maijiazixun WHERE " + req.params.columnName + " >= '" + req.query.remindstart + "'"
				if (req.query.remindend) sql = "SELECT COUNT(*) AS count FROM maijiazixun WHERE " + req.params.columnName + " <= '" + req.query.remindend + "'"

				if (req.query.remindstart && req.query.remindend) {
					sql = "SELECT COUNT(*) AS count FROM maijiazixun WHERE " + req.params.columnName + " >= '" + req.query.remindstart + "' AND " + req.params.columnName + " <= '" + req.query.remindend + "'"
				}
			}

			if (req.params.type == 2) {
				if (req.query.remindstart) {
					let remindStart = util.getDateTimeFormat(0 + Number(req.query.remindstart), "yyyy-MM-dd")
					sql = "SELECT COUNT(*) AS count FROM maijiazixun WHERE " + req.params.columnName + " >= '" + remindStart + "'"
				}
				if (req.query.remindend) {
					let remindEnd = util.getDateTimeFormat(req.query.remindend, "yyyy-MM-dd")
					sql = "SELECT COUNT(*) AS count FROM maijiazixun WHERE " + req.params.columnName + " <= '" + remindEnd + "'"
				}

				if (req.query.remindstart && req.query.remindend) {
					let remindStart = util.getDateTimeFormat(0 + Number(req.query.remindstart), "yyyy-MM-dd")
					let remindEnd = util.getDateTimeFormat(req.query.remindend, "yyyy-MM-dd")
					sql = "SELECT COUNT(*) AS count FROM maijiazixun WHERE " + req.params.columnName + " >= '" + remindStart + "' AND " + req.params.columnName + " <= '" + remindEnd + "'"
				}
			}

			const results = await sequelize.query(sql, {
				plain: true,
				raw: true,
				type: QueryTypes.SELECT
			})

			toRes.count(res, 0, results.count)
		} catch(err) {
			
			toRes.session(res, 500, '服务器错误！', '', 500)
		}
	})










	// 分组统计接口
	api.get('/group/:columnName', async (req, res) => {

		try {

			let sql = ""
			let columnName = req.params.columnName
			// let tableName = "maijiazixun"
			let where = " WHERE 1 = 1 "
			sql = "SELECT COUNT(*) AS total, " + columnName + " FROM maijiazixun " + where + " GROUP BY " + columnName + " LIMIT 10" 
			toRes.record(res, 0, await sequelize.query(sql, {
				plain: false,
				raw: true,
				type: QueryTypes.SELECT
			}))
		} catch(err) {

			toRes.session(res, 500, '服务器错误！', '', 500)
		}
	})

	// 统计指定字段
	api.get('/value/:xColumnName/:yColumnName', async (req, res) => {

		try {

			let sql = ""
			let xColumnName = req.params.xColumnName
			let yColumnName = req.params.yColumnName
			// let tableName = "maijiazixun"
			let where = " WHERE 1 = 1 "
			if ("maijiazixun" == "orders") {
				where += " AND status IN ('已支付', '已发货', '已完成') ";
			}

			sql = "SELECT " + xColumnName + ", SUM(" + yColumnName + ") AS total FROM maijiazixun " + where + " GROUP BY " + xColumnName + " DESC LIMIT 10"
			
			toRes.record(res, 0, await sequelize.query(sql, {
				plain: false,
				raw: true,
				type: QueryTypes.SELECT
			}))
		} catch(err) {

			toRes.session(res, 500, '服务器错误！', '', 500)
		}
	})

	// 按日期统计
	api.get('/value/:xColumnName/:yColumnName/:timeStatType', async (req, res) => {

		try {
			
			let sql = ""
			let xColumnName = req.params.xColumnName
			let yColumnName = req.params.yColumnName
			let timeStatType = req.params.timeStatType
			let tableName = "maijiazixun"
			let where = " WHERE 1 = 1 "
			if ("maijiazixun" == "orders") {
				where += " AND status IN ('已支付', '已发货', '已完成') ";
			}

            if (config.dbConnection.dbtype.toLowerCase() == "mysql") {
                if (timeStatType == "日")
                    sql = "SELECT DATE_FORMAT(" + xColumnName + ", '%Y-%m-%d') " + xColumnName + ", sum(" + yColumnName + ") total FROM " + tableName + where + " GROUP BY DATE_FORMAT(" + xColumnName + ", '%Y-%m-%d') LIMIT 10";
                if (timeStatType == "月")
                    sql = "SELECT DATE_FORMAT(" + xColumnName + ", '%Y-%m') " + xColumnName + ", sum(" + yColumnName + ") total FROM " + tableName + where + " GROUP BY DATE_FORMAT(" + xColumnName + ", '%Y-%m')  LIMIT 10";
                if (timeStatType == "年")
                    sql = "SELECT DATE_FORMAT(" + xColumnName + ", '%Y') " + xColumnName + ", sum(" + yColumnName + ") total FROM " + tableName + where + " GROUP BY DATE_FORMAT(" + xColumnName + ", '%Y')  LIMIT 10";
            } else {
                if (timeStatType == "日")
                    sql = "SELECT DATE_FORMAT(VARCHAR(10)," + xColumnName + ", 120) " + xColumnName + ", sum(" + yColumnName + ") total FROM " + tableName + where + " GROUP BY DATE_FORMAT(VARCHAR(10)," + xColumnName + ", 120)  LIMIT 10";
                if (timeStatType == "月")
                    sql = "SELECT DATE_FORMAT(VARCHAR(7)," + xColumnName + ", 120) " + xColumnName + ", sum(" + yColumnName + ") total FROM " + tableName + where + " GROUP BY DATE_FORMAT(VARCHAR(7)," + xColumnName + ", 120)  LIMIT 10";
                if (timeStatType == "年")
                    sql = "SELECT DATE_FORMAT(VARCHAR(4)," + xColumnName + ", 120) " + xColumnName + ", sum(" + yColumnName + ") total FROM " + tableName + where + " GROUP BY DATE_FORMAT(VARCHAR(4)," + xColumnName + ", 120)  LIMIT 10";
            }
			toRes.record(res, 0, await sequelize.query(sql, {
				plain: false,
				raw: true,
				type: QueryTypes.SELECT
			}))
		} catch(err) {

			toRes.session(res, 500, '服务器错误！', '', 500)
		}
	})







	return api
}
