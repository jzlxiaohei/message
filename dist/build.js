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

function createObserver(data,cb){
    var obj = {
        cb:cb|| utils.noop,
        put:function(key,value){
            var type='';
            var oldValue;
            if(key in data){
                type = 'update'
                oldValue = data[key]
            }else{
                type = 'add'
            }
            data[key] = value;
            this.cb({
                type: type, value: value, oldValue: oldValue, object: data
            })
        },
        del:function(key){
            if(key in data) {
                var oldValue = data[key];
                delete data[key];
                this.cb({
                    type: 'delete', value: undefined, oldValue: oldValue, object: data
                })
            }
        }

    }
    return obj
}
function getElement(id){
    return document.getElementById(id);
}
var regex = /{{(\w+)}}/g;
function initReplace(elem,data){
    _cache = {};
    var attrs = elem.attributes

    for(var i=0;i<attrs.length;i++)
    {
        var attr = attrs[i]

        var attrStr =function(attr) {
            var originStr = attr.value;
            var resultStr = originStr.replace(regex, function (match, key) {
                _cache[elem.id] = _cache[elem.id] || [];
                _cache[elem.id].push({elem:elem ,attrName:attr.name,originStr:originStr});
                return data[key];
            })
            return resultStr;
        }(attr)
        attrs[i].value = attrStr
    }
    var originText = elem.textContent;
    elem.textContent = originText.replace(regex,function(match,key){
        _cache[elem.id] =_cache[elem.id] || [];
        _cache[elem.id]['textContent'].push({elem:elem,originStr:originText});
        return data[key]
    })
    return _cache
}
var DataBridger = function(data,ids){
    this.DataObject = createObserver(data);
    this.data = data;
    this.ids = ids;
    this.elems =[];
    for(var i = 0;i<ids.length;i++){
        this.elems.push(getElement(ids[i]))
    }

    var self = this;
    this.DataObject.cb = function(chObj){
        if(self.before(chObj)=='stop'){
            return;
        }
        self.callback(chObj)
        self.after(chObj);
    }
    this.init();
}

DataBridger.prototype = {
    init: function () {
        this.cache = {};
        for (var i = 0; i < this.elems.length; i++) {
            utils.mixin(this.cache,initReplace(this.elems[i],this.data))
        }
    },
    addElem: function (id) {
        this.ids.push(id);
        this.elems.push(getElement(id))
    },
    removeElem: function (id) {
        var ids = this.ids,
            cache = this.cache;
        for (var i = 0; i < ids.length; i++) {
            if (ids[i] == id) {
                ids.splice(i, 1);
                return cache.splice(i, 1);
            }
        }
    },
    callback: function (e) {
        if (e.type == 'update') {
            for (var i  in this.cache) {
                //var elem = this.cache[i];
                for (var j in this.cache[i]) {
                    var item = this.cache[i][j];

                    if(j=='textContent'){
                        var el = item.elem,
                            originStr = item.originStr;
                        var str =  originStr.replace(regex, function (match, key) {
                            return e.object[key];
                        })
                        el.textContent = str;
                    }else{
                        var el = item.elem,
                            attrName = item.attrName,
                            originStr = item.originStr;
                        var str = originStr.replace(regex, function (match, key) {
                            return e.object[key];
                        })
                        el.setAttribute(attrName, str)
                    }

                }
            }
        }
    },
    before: utils.noop,
    after: utils.noop

}