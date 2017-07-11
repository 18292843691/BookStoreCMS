var mongoose = require('mongoose');
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId
// var bcrypt = require('bcryptjs')
// var SALT_WORK_FACTOR = 5

var OrderSchema = new Schema({
	orderId: String,
	bookId: String,
	userId: String,
	books: {
		type: ObjectId,
    	ref: 'Book'
	},
	meta: {
		createAt: {
	      type: Date,
	      default: Date.now()
	    },
	    updateAt: {
	      type: Date,
	      default: Date.now()
	    }
	},
	user: {
		type:ObjectId,
		ref: 'User'
	},
	admin: {
		type: ObjectId,
		ref: 'User'
	},
	price: Number,
	count: Number,
	isBuy: {
		type: Boolean,
		default: false
	}
})

OrderSchema.pre('save', function (next) {
	var order = this
	if(this.isNew) {
		this.meta.createAt = this.meta.updateAt = Date.now();
	} else {
		this.meta.updateAt = Date.now();
	}

	// var _random = parseInt(Math.random() * (10000000 - 1000000) + 1000000); //生成随机订单号->时间原因这里没有考虑验证订单的重复性
	// var nowTime = Date.now();
	
	//生成随机订单号
	var _orderId = parseInt(Math.random() * (1000000000000 - 100000000000) + 100000000000) + parseInt(Date.now());

	order.orderId = _orderId;
	
	next()
})

OrderSchema.statics = {
	fetch: function(cb) {
		return this
			.find({})
			.sort('meta.updateAt')
			.exec(cb)
	},
	findById: function(id, cb) {
		return this
			.find({_id: id})
			.exec(cb)
	}
}

module.exports = OrderSchema