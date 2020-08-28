'use strict';
const { Schema, model} = require('mongoose');
const bcrypt = require('bcryptjs');
const HerrSchema = new Schema({
  username: {
    type: String,
    required: true,       
    unique: true,
  },   
  password: {
    type: String,
    required: true,        
  }, 
  token: {
    type: String        
  }, 
  userId: {
    type: Number
  },  
  cookies: {
    type: String        
  },    
  public_ip: {
    type: [String],        
  },
});

HerrSchema.pre("save", async function (next) {
	if (!this.isModified("password")) {
		return next();
  }
  const salt = await bcrypt.genSalt(12);
	this.password = await bcrypt.hash(this.password, salt);	
	next();
});

HerrSchema.methods.comparePassword = async function (candidatePassword) {
	return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = model('HerrUser', HerrSchema);