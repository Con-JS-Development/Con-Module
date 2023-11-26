export class SyncPromise{
    isRejected = false;
    resolvedValue = undefined;
    rejectedValue = undefined;
    isFulfilled = false;
    get value(){
        if(this.isFulfilled) return this.resolvedValue;
        if(this.isRejected) return this.rejectedValue;
        return undefined;
    }
    run = [];
    static resolve(value){
        return new SyncPromise(res=>res(value));
    }
    static reject(value){
        return new SyncPromise((res,rej)=>rej(value));
    }
    getResolver(){
        return (val)=>{
            if (this.isFulfilled || this.isRejected) throw new Error('SyncPromise is already finished.');
            try {
                if(typeof val?.then === "function") return val.then(this.getResolver(),this.getRejecter());
            } catch (error) {}
            this.isFulfilled = true;
            this.resolvedValue = val;
            for (const runs of this.run) {
                runs.res(val);
            }
            delete this.run;
        }
    }
    getRejecter(){
        return (er)=>{
            if (this.isFulfilled || this.isRejected) throw new Error('SyncPromise is already finished.');
            try {
                if(typeof er?.then === "function") return er.then(this.getRejecter(),this.getRejecter());
            } catch (error) {}
            this.isRejected = true;
            this.rejectedValue = er;
            for (const runs of this.run) {
                runs.rej(er);
            }
            delete this.run;
        }
    }
    constructor(thens){
        thens(this.getResolver(),this.getRejecter());
    }
    then(res, rej){
        if(this.isRejected){
            return new SyncPromise((resolve,reject)=>{
                try {
                    if(rej != undefined) resolve(rej(this.rejectedValue));
                    else reject(this.rejectedValue); 
                } catch (error) {
                    reject(error);
                }
            });
        } else if(this.isFulfilled){
            return new SyncPromise((resolve,reject)=>{
                try {
                    if(res != undefined) resolve(res(this.resolvedValue));
                    else resolve(this.resolvedValue);
                } catch (error) {
                    reject(error);
                }
            });
        } else {
            return new SyncPromise((resolve, reject)=>{
                this.run.push({
                    res: (a)=>{
                        try {
                            if(res != undefined) resolve(res(a));
                            else resolve(a);
                        } catch (error) {
                            reject(error);
                        }
                    },
                    rej: (e)=>{
                        try {
                            if(rej != undefined) resolve(rej(e));
                            else reject(e);
                        } catch (error) {
                            reject(error);
                        }
                    }
                });
            });
        }
    };
    finally(callBack){
        if(this.isRejected){
            return new SyncPromise((resolve,reject)=>{
                try {
                    callBack?.();
                    reject(this.rejectedValue);
                } catch (error) {
                    reject(error);
                }
            });
        } else if(this.isFulfilled){
            return new SyncPromise((resolve,reject)=>{
                try {
                    callBack?.();
                    resolve(this.resolvedValue);
                } catch (error) {
                    reject(error);
                }
            });
        } else {
            return new SyncPromise((resolve, reject)=>{
                this.run.push({
                    res: (a)=>{
                        try {
                            callBack?.();
                            resolve(a);
                        } catch (error) {
                            reject(error);
                        }
                    },
                    rej: (e)=>{
                        try {
                            callBack?.();
                            reject(e);
                        } catch (error) {
                            reject(error);
                        }
                    }
                });
            });
        }
    };
    catch(rej){
        if(this.isRejected){
            return new SyncPromise((resolve,reject)=>{
                try {
                    if(rej != undefined) resolve(rej(this.rejectedValue));
                    else reject(this.rejectedValue); 
                } catch (error) {
                    reject(error);
                }
            });
        } else if(this.isFulfilled){
            return new SyncPromise((resolve)=>resolve(this.resolvedValue));
        } else {
            return new SyncPromise((resolve, reject)=>{
                this.run.push({
                    res: resolve,
                    rej: (e)=>{
                        try {
                            if(rej != undefined) resolve(rej(this.rejectedValue));
                            else reject(this.rejectedValue); 
                        } catch (error) {
                            reject(error);
                        }
                    }
                });
            });
        }
    };
}