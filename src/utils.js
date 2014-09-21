/**
 *
 * Created by zilong on 9/20/14.
 */

function defaultFilter(item1,item2){
    return item1 ===item2;
}

var utils = {
    noop:function(){

    },
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
    },
    removeOne:function(arr,item,filter){
        filter = filter || defaultFilter
        for(var i = 0;i<arr.length;i++){
            if(filter(arr,item)){
                return arr.splice(i,1);
            }
        }
    }
}

module.exports=utils
