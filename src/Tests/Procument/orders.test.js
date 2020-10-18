import {displayOrderDetails} from './Functions/orders-get-functions'


var assert = require('assert');
describe('the function' , function(){
    it('works' , function(){
        assert.equal( displayOrderDetails() , 'all orders received successfully');
    });
});