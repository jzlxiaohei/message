/**
 * Created by zilong on 9/21/14.
 */

var utils = require('./utils')
function createGetterSetter(data,cb){
    var obj= {};
    for(var i in data){
        !function(i) {
            obj['set_' + i] = function (value, cb) {
                var oldValue = data[i];
                data[i] = value;
                if (typeof cb == 'function'){
                    cb.call(obj, i, value, oldValue);
                }else{
                    if(obj.cb){
                        obj.cb(i,value,oldValue)
                    }
                }

            };
            obj['get_' + i] = function () {
                return data[i]
            }
        }(i)
    }
    return obj;
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
    return obj;
}
function getElement(id){
    return document.getElementById(id);
}
function initReplace(elem){
    var regex = /.*{{(\w+)}}.*'/g;

    _cache = {};
    var attrs = elem.attributes

    for(var i=0;i<attrs.length;i++)
    {
        var attr = attrs[i]

        var attrStr =function(attr) {
            var originStr = attr.value;
            var resultStr = originStr.replace(regex, function (match, key) {
                _cache[elem] = _cache[elem] || {}
                _cache[elem][attr.name] = originStr;
                return data[key];
            })
            return resultStr;
        }(attr)
        attrs[i].value = attrStr
    }
    var originText = elem.textContent;
    elem.textContent = originText.replace(regex,function(match,key){
        _cache['textContent'] = originText;
        return data[key]
    })
    return _cache
}
var DataBridger = function(data,ids){
    this.DataObject = createObserver(data);
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

}

DataBridger.prototype = {
    init: function () {
        this.cache = {};
        for (var i = 0; i < this.elems.length; i++) {
            utils.mixin(initReplace(this.elems[i]))
        }
    },
    addElem: function (id) {
        this.ids.push(id);
        this.elems.push(getElement(id))
    },
    removeElem: function (id) {
        var ids = this.ids,
            elems = this.elems;
        for (var i = 0; i < ids.length; i++) {
            if (ids[i] == id) {
                ids.splice(i, 1);
                return elems.splice(i, 1);
            }
        }
    },
    callback: function (e) {
        if (e.type == 'update') {
            for (var i  in this.cache) {
                if (i == 'textContent') {
                    continue;
                }
                for (var j in this.cache[j]) {
                    var str = this.cache[i][j].replace(regex, function (match, key) {
                        return e.object[key];
                    })
                    this.cache[i].setAttribute(j, '')
                }
            }
        }
    },
    before: utils.noop,
    after: utils.noop

}
module.exports = DataBridger