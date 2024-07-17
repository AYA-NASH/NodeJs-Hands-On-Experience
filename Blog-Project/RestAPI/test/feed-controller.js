const expect = require('chai').expect;
const sinon = require('sinon');
const mongoose = require('mongoose');

const User = require('../models/user');
const FeedController = require('../controllers/feed');

describe('Feed Controller', function(){
    before(function(done){
        mongoose.connect(
            'mongodb+srv://ayanashaat99:H6rUIq2elSKY63gs@cluster0.u4n9mhf.mongodb.net/test-messages'
        ).then(res=>{
            const user = new User({
                email: 'test@test.com',
                password: 'password',
                name: 'test',
                posts: [],
                _id: '6665dd4f45fa5afe5d902399'
            });

            return user.save();
        }).then(()=>{
            done();
        })
    });

    it('should add a created post to the posts of the creator', function(done) {
        const req = {
            body: {
                title: 'Test Post',
                content: 'A Test Post'
            },
            file: {
                path: 'abc'
            },
            userId: '6665dd4f45fa5afe5d902399'
        };

        const res = {
            status: function() {
              return this;
            },
            json: function() {}
          };
      
          FeedController.createPost(req, res, () => {}).then(savedUser => {
            expect(savedUser).to.have.property('posts');
            done();
          });

    })

    after(function(done) {
        User.deleteMany({})
          .then(() => {
            return mongoose.disconnect();
          })
          .then(() => {
            done();
          });
    });
})