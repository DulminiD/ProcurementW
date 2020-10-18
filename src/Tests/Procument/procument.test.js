import {getItems, getOrder} from "./Functions/procument-get-function";

var assert = require('assert');
describe('the function' , function(){
    it('should not be null' , function(){
        assert.notEqual(getOrder(), null)
    });
});


var assert = require('assert');
describe('the function' , function(){
    it('works' , function(){
        assert.equal( getOrder() , 'Object for order receieved successfully');
    });
});

var assert = require('assert');
describe('the function' , function(){
    it('works' , function(){
        assert.equal( getItems() , 'Items assigned successfully');
    });
});