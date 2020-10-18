import {getItems} from '../../Suppliers/Functions/suppliers-get-functions'


var assert = require('assert');
describe('the function' , function(){
    it('works' , function(){
        assert.equal( getItems() , 'hello suppliers');
    });
});
