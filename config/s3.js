const AWS = require('aws-sdk');
const s3 = new AWS.S3({
    accessKeyId: process.env.IAM_USER_KEY,
    secretAccessKey: process.env.IAM_USER_SECRET,
    Bucket: "recipe_app"
});


module.exports = s3;