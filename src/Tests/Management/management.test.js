import {getBudget} from './Function/budget-get-function'
import {getLength} from './Function/budget-get-function'

var assert = require('assert');
describe('the function' , function(){
    it('should not be null' , function(){
        assert.notEqual(getBudget(), null)
    });
});

describe('the function' , function(){
    it('should not be null' , function(){
        let value;
        let len = getLength();
        if(len >= 0){
            value= true;
        }else{
            value= false;
        }
        assert.strictEqual(value, true, "Length is greater than 0")
    });
});
