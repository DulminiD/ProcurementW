import {getSites} from './Function/site-get-function'

var assert = require('assert');
describe('the function' , function(){
    it('should not be null' , function(){
        assert.notEqual(getSites(), null)
    });
});
