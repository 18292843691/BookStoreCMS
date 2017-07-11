var mongoose = require('mongoose')

var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId

var bcrypt = require('bcryptjs')
var SALT_WORK_FACTOR = 10

var UserSchema = new Schema({
  username: String,
  password: String,
  email: String,
  address: [{
    type:String
  }],
  age: {
    type: Number,
    default: 18
  },
  sex: {
    type: String,
    default: "男"
  },
  birth: {
    type: Date,
    default: Date.now()
  },
  tel: Number,
  range: {
    type: Number,
    default: 10
  },
  summary: String,
  // 0: nomal user
  // 1: verified user
  // 2: professonal user
  // >10: admin
  // >50: super admin
  role: {
    type: Number,
    default: 1
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
  orders: [{
      type: ObjectId,
      ref: 'Order'
  }],
  carts: [{
      type: ObjectId,
      ref: 'Cart'
  }],
})

UserSchema.pre('save', function(next) {
  var user = this

  if (this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now()
  }
  else {
    this.meta.updateAt = Date.now()
  }

  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) return next(err)

    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) return next(err)
      // console.log(this)
      user.password = hash
      next()
    })
  })
})


UserSchema.methods = {
  comparePassword: function(_password, cb) {
    bcrypt.compare(_password, this.password, function(err, isMatch) {
      if (err) return cb(err)

      cb(null, isMatch)
    })
  }
}


UserSchema.statics = {
  fetch: function(cb) {
    return this
      .find({})
      .sort('role')
      .exec(cb)
  },
  findById: function(id, cb) {
    return this
      .findOne({_id: id})
      .exec(cb)
  }
}

module.exports = UserSchema