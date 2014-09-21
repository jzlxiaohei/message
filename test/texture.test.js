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