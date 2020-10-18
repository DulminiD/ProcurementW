import {getBudget} from './Function/budget-get-function'

var assert = require('assert');
describe('the function' , function(){
    it('should not be null' , function(){
        assert.notEqual(getBudget(), null)
    });
});
