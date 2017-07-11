var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId

var BookSchema = new Schema({
  title: String,
  author: String, 
  publisher: String,
  price: Number,
  repertory: {
    type: Number,
    default: 0
  },
  image: {
    small: String,
    big: String,
    mid: String
  },
  imageName: String,
  category: {
    type: ObjectId,
    ref: 'Category'
  },
  summary: String,
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

// var ObjectId = mongoose.Schema.Types.ObjectId
BookSchema.pre('save', function(next) {
  if (this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now()
  }
  else {
    this.meta.updateAt = Date.now()
  }

  next()
})

BookSchema.statics = {
  fetch: function(cb) {
    return this
      .find({})
      .sort('category')
      .exec(cb)
  },
  findById: function(id, cb) {
    return this
      .findOne({_id: id})
      .exec(cb)
  },
  findByCategory: function(category, cb) {
    return this
      .findOne({category: category})
      .exec(cb)
  }
}

module.exports = BookSchema