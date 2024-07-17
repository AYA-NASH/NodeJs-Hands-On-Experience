const expect = require('chai').expect;
const sinon = require('sinon');
const mongoose = require('mongoose');

const User = require('../models/user');
const AuthController = require('../controllers/auth');

describe('Auth Controller - Login', function() {
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

    it('should throw an error with code 500 if accessing the database fails', function(done) {
      sinon.stub(User, 'findOne');
      User.findOne.throws();
  
      const req = {
        body: {
          email: 'test@test.com',
          password: 'tester'
        }
      };
  
      AuthController.login(req, {}, () => {}).then(result => {
        expect(result).to.be.an('error');
        expect(result).to.have.property('statusCode', 500);
        done();
      });
  
      User.findOne.restore();
    });

    it('should send a response with a valid user status for an existing user', function(done){

        const req = {
            userId: '6665dd4f45fa5afe5d902399'
        };
        const res = {
            statusCode: 500,
            userStatus: null,
            status: function(code){
                this.statusCode = code;
                return this
            },
            json: function(data){
                this.userStatus = data.status;
            }
        };  

        AuthController.getUserStatus(req, res, ()=>{})
        .then(()=>{
            expect(res.statusCode).to.be.equal(200);
            expect(res.userStatus).to.be.equal('I am New');
            done();
        })
        
    });


    after(function(done){
        User.deleteMany({})
        .then(()=>{
            return mongoose.disconnect();
        })
        .then(()=>{
            done();
        });
    });
});