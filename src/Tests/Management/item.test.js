import {getItems} from '../../Management/Function/item-get-function'


var assert = require('assert');
describe('the function' , function(){
    it('works' , function(){
        assert.equal( getItems() , 'hello');
    });
});
