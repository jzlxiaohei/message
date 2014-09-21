(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * Created by zilong on 9/21/14.
 */


describe('jasmine fixtures test:',function(){
    it('should get textContent',function(){
        var f = jasmine.getFixtures();
        f.fixturesPath='base/test/fixtures'
        f.load('test.html');
        expect(document.getElementById('test').textContent).toBe('hehe')
    })


})
},{}]},{},[1])