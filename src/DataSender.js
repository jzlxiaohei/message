/**
 * Created by zilong on 9/20/14.
 */



var DataSennder =function(data){
    this.data = data||{}
}
DataSennder.prototype={
    upsertProp:function(key,value){
        if(key in data){
            //update
        }else{
            //insert
        }
        this.data[key] = value;
    },
    deleteProp:function(key){
        delete this.data[key]
    }
}

