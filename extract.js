'use strict';
var Promise = require('bluebird');
var AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});
var ec2 = new AWS.EC2({});

var params = {
  Filters: [
    {
      Name: 'group-name',
      Values: [
        '*AppName*'
      ]
    }
  ]
}

var extractPromise = function () {
  // console.log('Getting security groups');
  return ec2.describeSecurityGroups(params).promise();
}

module.exports = extractPromise;

// Output to console if called directly.
if (require.main === module) {
  module.exports().then(function (data) {
    console.log(JSON.stringify(data, null, 2));
  });
}
