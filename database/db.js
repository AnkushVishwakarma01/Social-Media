const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const customerSchema = new Schema({
    Name: String,
    Email: String,
    Phone_Number: String,
    Country: String,
    Password: String
});

const postSchema = new Schema({
    email: String,
    post: Buffer
})

const notificationSchema = new Schema({
    from: String,
    to: String,
    notification: String
});

const followListSchema = new Schema({
    from: String,
    to: String 
});

const messageSchema = new Schema({
    from: String,
    to: String,
    message: String
});

const likesSchema = new Schema({
    from: String,
    to: String,
    post: ObjectId
});

const commentSchema = ({
    from: String,
    to: String,
    post: ObjectId,
    comment: String
})

const customer = mongoose.model('customers', customerSchema);
const post = mongoose.model('posts', postSchema);
const notification = mongoose.model('notifications', notificationSchema);
const followList = mongoose.model('follow_list', followListSchema);
const message = mongoose.model('messages', messageSchema);
const likes = mongoose.model('likes', likesSchema);
const comment = mongoose.model('comment', commentSchema);



module.exports = {customer, post, notification, followList, message, likes, comment};