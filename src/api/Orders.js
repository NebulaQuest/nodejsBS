import { version } from '../../package.json'
import { Router } from 'express'
import { Sequelize, Op, QueryTypes } from 'sequelize'
import sequelize from '../models/sequelize'
import toRes from '../lib/toRes'
import OrdersModel from '../models/OrdersModel'
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
			let orderid = req.query.orderid
			if (orderid) {

				if (orderid.indexOf('%') != -1) {
					where.orderid = {
						[Op.like]: orderid
					}
				} else {
					where.orderid = {
						[Op.eq]: orderid
					}
				}
			}
			let tablename = req.query.tablename
			if (tablename) {

				if (tablename.indexOf('%') != -1) {
					where.tablename = {
						[Op.like]: tablename
					}
				} else {
					where.tablename = {
						[Op.eq]: tablename
					}
				}
			}
			let userid = req.query.userid
			if (userid) {

				if (userid.indexOf('%') != -1) {
					where.userid = {
						[Op.like]: userid
					}
				} else {
					where.userid = {
						[Op.eq]: userid
					}
				}
			}
			let goodid = req.query.goodid
			if (goodid) {

				if (goodid.indexOf('%') != -1) {
					where.goodid = {
						[Op.like]: goodid
					}
				} else {
					where.goodid = {
						[Op.eq]: goodid
					}
				}
			}
			let goodname = req.query.goodname
			if (goodname) {

				if (goodname.indexOf('%') != -1) {
					where.goodname = {
						[Op.like]: goodname
					}
				} else {
					where.goodname = {
						[Op.eq]: goodname
					}
				}
			}
			let picture = req.query.picture
			if (picture) {

				if (picture.indexOf('%') != -1) {
					where.picture = {
						[Op.like]: picture
					}
				} else {
					where.picture = {
						[Op.eq]: picture
					}
				}
			}
			let buynumber = req.query.buynumber
			if (buynumber) {

				if (buynumber.indexOf('%') != -1) {
					where.buynumber = {
						[Op.like]: buynumber
					}
				} else {
					where.buynumber = {
						[Op.eq]: buynumber
					}
				}
			}
			let price = req.query.price
			if (price) {

				if (price.indexOf('%') != -1) {
					where.price = {
						[Op.like]: price
					}
				} else {
					where.price = {
						[Op.eq]: price
					}
				}
			}
			let discountprice = req.query.discountprice
			if (discountprice) {

				if (discountprice.indexOf('%') != -1) {
					where.discountprice = {
						[Op.like]: discountprice
					}
				} else {
					where.discountprice = {
						[Op.eq]: discountprice
					}
				}
			}
			let total = req.query.total
			if (total) {

				if (total.indexOf('%') != -1) {
					where.total = {
						[Op.like]: total
					}
				} else {
					where.total = {
						[Op.eq]: total
					}
				}
			}
			let discounttotal = req.query.discounttotal
			if (discounttotal) {

				if (discounttotal.indexOf('%') != -1) {
					where.discounttotal = {
						[Op.like]: discounttotal
					}
				} else {
					where.discounttotal = {
						[Op.eq]: discounttotal
					}
				}
			}
			let type = req.query.type
			if (type) {

				if (type.indexOf('%') != -1) {
					where.type = {
						[Op.like]: type
					}
				} else {
					where.type = {
						[Op.eq]: type
					}
				}
			}
			let status = req.query.status
			if (status) {

				if (status.indexOf('%') != -1) {
					where.status = {
						[Op.like]: status
					}
				} else {
					where.status = {
						[Op.eq]: status
					}
				}
			}
			let address = req.query.address
			if (address) {

				if (address.indexOf('%') != -1) {
					where.address = {
						[Op.like]: address
					}
				} else {
					where.address = {
						[Op.eq]: address
					}
				}
			}
			let tel = req.query.tel
			if (tel) {

				if (tel.indexOf('%') != -1) {
					where.tel = {
						[Op.like]: tel
					}
				} else {
					where.tel = {
						[Op.eq]: tel
					}
				}
			}
			let consignee = req.query.consignee
			if (consignee) {

				if (consignee.indexOf('%') != -1) {
					where.consignee = {
						[Op.like]: consignee
					}
				} else {
					where.consignee = {
						[Op.eq]: consignee
					}
				}
			}
			let remark = req.query.remark
			if (remark) {

				if (remark.indexOf('%') != -1) {
					where.remark = {
						[Op.like]: remark
					}
				} else {
					where.remark = {
						[Op.eq]: remark
					}
				}
			}
			let logistics = req.query.logistics
			if (logistics) {

				if (logistics.indexOf('%') != -1) {
					where.logistics = {
						[Op.like]: logistics
					}
				} else {
					where.logistics = {
						[Op.eq]: logistics
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
            if (jwt.decode(req.headers.token).role != '管理员') {
				where.userid = {
					[Op.eq]: req.session.userinfo === undefined ? jwt.decode(req.headers.token).id : req.session.userinfo.id
				}
            }
			// let tableName = req.session.userinfo.tableName
			let tableName = req.session.userinfo === undefined ? jwt.decode(req.headers.token).tableName : req.session.userinfo.tableName
			if(tableName == 'yonghu') {
				where.yonghuzhanghao = {
					[Op.eq]: req.session.userinfo === undefined ? jwt.decode(req.headers.token).username : req.session.userinfo.yonghuzhanghao
				}
				if (where['userid'] != undefined) {
					delete where.userid
				}
			}

			let result = await OrdersModel.findAndCountAll({
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
			let userid = req.query.userid
			if (userid) {
				where.userid = {
					[Op.eq]: userid
				}
			}
			let orderid = req.query.orderid
			if (orderid) {

				if (orderid.indexOf('%') != -1) {
					where.orderid = {
						[Op.like]: orderid
					}
				} else {
					where.orderid = {
						[Op.eq]: orderid
					}
				}
			}
			let goodname = req.query.goodname
			if (goodname) {

				if (goodname.indexOf('%') != -1) {
					where.goodname = {
						[Op.like]: goodname
					}
				} else {
					where.goodname = {
						[Op.eq]: goodname
					}
				}
			}
			let status = req.query.status
			let type   = req.query.type
			if (status) {
				where.status = {
					[Op.eq]: status
				}
			}
			if (type) {
				where.type = {
					[Op.eq]: type
				}
			}


			let result = await OrdersModel.findAndCountAll({
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

			if (!req.body.userid) {
				req.body.userid = req.session.userinfo === undefined ? jwt.decode(req.headers.token).id : req.session.userinfo.id
			}


			const userinfo = await OrdersModel.create(req.body)

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

			req.body.userid = req.session.userinfo === undefined ? jwt.decode(req.headers.token).id : req.session.userinfo.id


			const userinfo = await OrdersModel.create(req.body)

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



			await OrdersModel.update(req.body, {
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

			await OrdersModel.destroy({
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


			toRes.record(res, 0, await OrdersModel.findOne({ where: { id: req.params.id } }))
		} catch(err) {

			toRes.session(res, 500, '服务器错误！', '', 500)
		}
	})

    // 详情接口（前端）
	api.all('/detail/:id', async (req, res) => {

		try {


			toRes.record(res, 0, await OrdersModel.findOne({ where: { id: req.params.id } }))
		} catch(err) {

			toRes.session(res, 500, '服务器错误！', '', 500)
		}
	})

	// 获取需要提醒的记录数接口
	api.get('/remind/:columnName/:type', async (req, res) => {

		try {

			let sql = 'SELECT 0 AS count'
			
			if (req.params.type == 1) {
				if (req.query.remindstart) sql = "SELECT COUNT(*) AS count FROM orders WHERE " + req.params.columnName + " >= '" + req.query.remindstart + "'"
				if (req.query.remindend) sql = "SELECT COUNT(*) AS count FROM orders WHERE " + req.params.columnName + " <= '" + req.query.remindend + "'"

				if (req.query.remindstart && req.query.remindend) {
					sql = "SELECT COUNT(*) AS count FROM orders WHERE " + req.params.columnName + " >= '" + req.query.remindstart + "' AND " + req.params.columnName + " <= '" + req.query.remindend + "'"
				}
			}

			if (req.params.type == 2) {
				if (req.query.remindstart) {
					let remindStart = util.getDateTimeFormat(0 + Number(req.query.remindstart), "yyyy-MM-dd")
					sql = "SELECT COUNT(*) AS count FROM orders WHERE " + req.params.columnName + " >= '" + remindStart + "'"
				}
				if (req.query.remindend) {
					let remindEnd = util.getDateTimeFormat(req.query.remindend, "yyyy-MM-dd")
					sql = "SELECT COUNT(*) AS count FROM orders WHERE " + req.params.columnName + " <= '" + remindEnd + "'"
				}

				if (req.query.remindstart && req.query.remindend) {
					let remindStart = util.getDateTimeFormat(0 + Number(req.query.remindstart), "yyyy-MM-dd")
					let remindEnd = util.getDateTimeFormat(req.query.remindend, "yyyy-MM-dd")
					sql = "SELECT COUNT(*) AS count FROM orders WHERE " + req.params.columnName + " >= '" + remindStart + "' AND " + req.params.columnName + " <= '" + remindEnd + "'"
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
			// let tableName = "orders"
			let where = " WHERE 1 = 1 "
			let tableName = req.session.userinfo === undefined ? jwt.decode(req.headers.token).tableName : req.session.userinfo.tableName
			if(tableName == 'yonghu') {
				where += " AND yonghuzhanghao = '" + jwt.decode(req.headers.token).username + "' ";
			}
			sql = "SELECT COUNT(*) AS total, " + columnName + " FROM orders " + where + " GROUP BY " + columnName + " LIMIT 10" 
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
			// let tableName = "orders"
			let where = " WHERE 1 = 1 "
			let tableName = req.session.userinfo === undefined ? jwt.decode(req.headers.token).tableName : req.session.userinfo.tableName
			if(tableName == 'yonghu') {
				where += " AND yonghuzhanghao = '" + jwt.decode(req.headers.token).username + "' ";
			}
			if ("orders" == "orders") {
				where += " AND status IN ('已支付', '已发货', '已完成') ";
			}

			sql = "SELECT " + xColumnName + ", SUM(" + yColumnName + ") AS total FROM orders " + where + " GROUP BY " + xColumnName + " DESC LIMIT 10"
			
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
			let tableName = "orders"
			let where = " WHERE 1 = 1 "
			if (jwt.decode(req.headers.token).role != '管理员') {
				where += " AND yonghuzhanghao = '" + jwt.decode(req.headers.token).username + "' ";
			}
			if ("orders" == "orders") {
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
