'use strict';
let Model = require('./');

module.exports = Model.extend({
  tableName: 'merchants',
  
  members: function () {
    const Member = require('./Member');
    return this.hasMany(Member, 'merchant_id');
  }
});
