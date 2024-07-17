const expect =  require('chai').expect;
const sinon = require('sinon');
const jwt = require('jsonwebtoken');

const authMiddleware = require('../middleware/is-auth');


describe('Auth Middleware', function(){
    it('should throw an error if no autherization header exists', function(){
        const req = {
            get: function(headerName){
                return null;
            }
        };
    
        expect(authMiddleware.bind(this, req, {}, ()=>{})).to.throw('UnAutherized Request');
    });
    
    it('should throw an error if the autherization header is only one string', function(){
        const req = {
            get: function(headerName){
                return 'xyz';
            }
        };
        expect(authMiddleware.bind(this, req, {}, ()=>{})).to.throw();
    });

    it('should throw an error if the token cannot be verified', function(){
        const req = {
            get: function(headerName){
                return 'Bearer xyz';
            }
        };
        expect(authMiddleware.bind(this, req, {}, ()=>{})).to.throw();
    });

    it('should yield a userId after decoding the token', function(){
        const req = {
            get: function(headerName){
                return 'Bearer nsdfcoishndfssdf';
            }
        };
        sinon.stub(jwt, 'verify');
        jwt.verify.returns({userId: 'abc'});
        authMiddleware(req, {}, ()=>{});
        expect(req).to.have.property('userId');
        jwt.verify.restore();
    })
})
