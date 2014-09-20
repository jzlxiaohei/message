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
