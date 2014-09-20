(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 *
 * Created by zilong on 9/20/14.
 */

var utils = {
    mixin:function(target,source,overwrite){
        if(overwrite){
            for(var i in source){
                target[i] = source[i]
            }
        }else{
            for(var i in source){
                if(!(i in target)){
                   target[i] =source[i]
                }
            }
        }
        return target;
    }
}

module.exports=utils

},{}],2:[function(require,module,exports){
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
},{"../src/utils.js":1}]},{},[2])