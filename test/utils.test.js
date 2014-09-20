/**
 * Created by zilong on 9/20/14.
 */

var utils = require('../src/utils.js')

describe('utils test suite',function(){

    it('simple mixin',function(){
        var target = utils.mixin({},{a:1});
        expect(target).toEqual({a:1})
    })

    it('mixin with overwrite',function(){
        var target={a:1,b:2}
        utils.mixin(target,{a:3},true);
        expect(target).toEqual({a:3,b:2})
    })

    it('mixin without overwrite',function(){
        var target={a:1,b:2}
        utils.mixin(target,{a:3});
        expect(target).toEqual({a:1,b:2})
    })
})