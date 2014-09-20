/**
 * Created by zilong on 9/20/14.
 */
var utils = require('./utils')
//watcher:function or (object with handleMsg)
var Message = function(name,sender,listeners,type){
    this.listeners = listeners || [];
    this.type = type;
    this.sender = sender;
    this.name=name;
}

Message.prototype={
    addListener:function(listener){
        this.listeners.push(listener);
    },
    removeListener:function(listener){
        var ltns = this.listeners
        for(var i =0;i<ltns.length;i++){
           if(ltns[i]==listener){
              ltns.splice(i,1)
           }
        }
    },
    trigger:function(data){
        var ctx={
            from:tthis.sender,
            type:this.type
        }
        utils.mixin(ctx,data);
        this.listeners.forEach(function(item,index){
            if(typeof item === 'function'){
                item(ctx)
            }else{
                item.handleMsg(ctx);
            }
        })
    }
}

var Sender = function(messages){
    this.msgs = messages || [];

}

module.exports = {
    Message:Message,
    Sender:Sender
}

