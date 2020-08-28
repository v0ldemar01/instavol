'use strict';
const UserService = require('../services/insta.services');
exports.searchUsers = async (req, res) => {  
  const {value } = req.body;  
  const igClient = UserService.IgClient;  
  const {users} = await igClient.user.search(value);
  if (!users) {
    return res.status(204).json({error: "No user has found"});
  }  
  const info = users.map(({username, full_name, profile_pic_url})  => ({username, full_name, profile_pic_url}))
  res.status(200).json({
    info
  });  
}