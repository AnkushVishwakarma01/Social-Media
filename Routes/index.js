var express = require('express');
var router = express.Router();
var url = require('url');
var {Session} = require('./session');
var session = new Session();
var {customer, post, notification, followList, message, likes, comment} = require('../database/db');
const { ObjectId } = require('mongodb');
var login = false;

//Get Request
router.get('/', (req, res) => {
    res.render('login');
})

router.get('/register', (req, res) => {
    res.render('register');
})

router.get('/home', async (req, res) => {
    if(login){
        await post.find().then((posts) => {
            likes.find({to: session.email}).then((likeCount) => {
                comment.find().then((data) => {
                    res.render('home', {data: posts, user: session, likes: likeCount, comments: data});
                })
            });
        })
    }else{
        res.render('login');
    }
})

router.get('/post', async (req, res) => {
    if(login){
        await post.find({email: session.email}).then((posts) => {
            likes.find({to: session.email}).then((likeCount) => {
                comment.find().then((data) => {
                    res.render('home', {data: posts, user: session, likes: likeCount, comments: data});
                })
            });
        }).catch(err => console.log(err));
    }else{
        res.redirect('/');
    }
})

router.get('/chat', async (req, res) => {
    if(login){
        await followList.find({from: session.email}).then((result) => {
            likes.find({to: session.email}).then((likeCount) => {
                res.render('chat', {user: session, data: result, likes: likeCount});
            })
        })
    }else{
        res.redirect('/');
    }
    
})

router.get('/follow/:from&:to', (req, res) => {
    let newfollower = new followList({
        from: req.params.from,
        to: req.params.to 
    })

    newfollower.save().then((result) => {
        console.log(result);
    }).catch(err => console.log(err));
})

router.get('/log_out', (req, res) => {
    session.destroy();
    res.redirect('/');
})

//Post Request
router.post('/commentHandler', (req, res) => {
    let body = req.body;

    let newComment = new comment({
        from: session.email,
        to: body.email,
        post: body.id,
        comment: body.comment
    })

    newComment.save().then(()=>{
        res.redirect('/home');
    }).catch(err => console.log(err));
})

router.post('/like', (req, res) => {
    let body = req.body;
    let newLike = new likes({
        from: session.email,
        to: body.post_email,
        post: body.post_id
    })

    newLike.save().then((result) => {
        res.redirect('/home');
    }).catch(err => console.log(err));
})

router.post('/uploadHandler', (req, res, next) => {
    let _file = req.body.file;
    let newPost = new post({
        post: _file,
        email: session.email
    })

    newPost.save().then(() => {
        res.redirect('/home');
    }).catch(err => console.log(err));
})

router.post('/loginHandler', (req, res) => {
    let body = req.body;

    customer.find({Email: body.email}).then((result) => {
        if(result.length > 0){
            for(let i = 0; i < result.length; i++){
                if(result[i].Email == body.email && result[i].Password == body.password){
                    login = true;
                    session.start(result[i]);
                    res.redirect('/home');
                }else{
                    res.send("password was incorrect!");
                }
            }
        }else{
            res.send("Email was not found!");
        }
    })
})

router.post('/registerHandler', (req, res) => {
    let body = req.body;
    let _pass = req.body.password;
    let _confirmPass = req.body.confirm_password;

    customer.findOne({Name: body.name, Email: body.email}).then((result) => {
        console.log(result);
        if(result != null){
            res.send("This username or Email already exits!");
        }else{
            if(_pass == _confirmPass){
                let user = new customer({
                    Name: req.body.name,
                    Email: req.body.email,
                    Phone_Number: req.body.phone_number,
                    Country: req.body.country,
                    Password: req.body.password
                })
        
                user.save().then(() => {
                    res.redirect('/');
                }).catch(err => console.log(err));
            }
        }
    }).catch(err => console.log(err));
})

module.exports = router;