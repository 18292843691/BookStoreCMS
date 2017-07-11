var mongoose = require('mongoose');

var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId

var CartSchema = new Schema({
	books: [{
		type: ObjectId,
    	ref: 'Book'
	}],
	users: {
		type: ObjectId,
    	ref: 'User'
	},
	bookId: String,
	price: Number,
	count: Number,
	meta: {
		createAt: {
	      type: Date,
	      default: Date.now()
	    },
	    updateAt: {
	      type: Date,
	      default: Date.now()
	    }
	}
})

CartSchema.pre('save', function (next) {
	
	var cart = this

	if(this.isNew) {
		this.meta.createAt = this.meta.updateAt = Date.now();
	} else {
		this.meta.updateAt = Date.now();
	}
	next()
})

CartSchema.statics = {
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

module.exports = CartSchema