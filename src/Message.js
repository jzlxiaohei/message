/**
 * Created by zilong on 9/20/14.
 */
var utils = require('./utils')

//watcher:function or (object with handleMsg)
var Message = function(name,listeners,sender,options){
    this.listeners = listeners || [];
    this.sender = sender;
    this.name=name;
    if(options){
        this.beforeSend = options.beforeSend;
        this.afterSend = options.afterSend;
    }
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
    send:function(data){
        var ctx={
            from:tthis.sender,
            type:this.type
        }
        utils.mixin(ctx,data);
        if(typeof this.beforeSend =='function'){
            var result = this.beforeSend();
            if(result && result =='stop'){
                return;
            }
        }

        this.listeners.forEach(function(item,index){
            if(typeof item === 'function'){
                item(ctx)
            }else{
                item.handleMsg(ctx);
            }
        })

        if(typeof this.afterSend =='function'){
            this.afterSend();
        }

    }
}

var Sender = function(messages){
    this.msgs = messages || [];
}
Sender.prototype={
    publish_all:function(data){
        this.msgs.forEach(function(item){
            item.send(data)
        })
    },
    publish:function(name,data){
        this.msgs.filter(function(item){
            return item.name===name;
        }).forEach(function(item){
            item.send(data);
        })
    }
}

var Listener =function(message){
    this.message = message;
    this.message.addListener(this)
}
Listener.prototype={
    handleMsg:function(){

    },
    removeMsg:function(){
        this.message.removeListener(this);
    }
}
module.exports = {
    Message:Message,
    Sender:Sender
}

