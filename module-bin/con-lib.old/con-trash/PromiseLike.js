export class PromiseLike{
    _resolve(val){
        if (this.isFulfilled || this.isRejected) throw new Error('PromiseLike is already finished.');
        this.isFulfilled = true;
        this.resolvedValue = val;
        for (const runs of this.run) {
            runs.res(val);
        }
        delete this.run;

    }
    _reject(er){
        if (this.isFulfilled || this.isRejected) throw new Error('PromiseLike is already finished.');
        this.isRejected = true;
        this.rejectedValue = er;
        for (const runs of this.run) {
            runs.rej(er);
        }
        delete this.run;
    }
    isRejected = false;
    resolvedValue = undefined;
    rejectedValue = undefined;
    isFulfilled = false;
    run = [];
    constructor(thens){
        thens(this._resolve.bind(this), this._reject.bind(this));
    }
    then(res, rej){
        if(this.isRejected){
            return new PromiseLike((resolve,reject)=>{
                try {
                    if(rej != undefined) resolve(rej(this.rejectedValue));
                    else reject(this.rejectedValue); 
                } catch (error) {
                    reject(error);
                }
            });
        } else if(this.isFulfilled){
            return new PromiseLike((resolve,reject)=>{
                try {
                    resolve(res(this.resolvedValue));
                } catch (error) {
                    reject(error);
                }
            });
        } else {
            return new PromiseLike((resolve, reject)=>{
                this.run.push({
                    res: (a)=>{
                        try {
                            resolve(res(a));
                        } catch (error) {
                            reject(error);
                        }
                    },
                    rej: (e)=>{
                        try {
                            if(rej != undefined) resolve(rej?.(e));
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
            return new PromiseLike((resolve,reject)=>{
                try {
                    callBack();
                    reject(this.rejectedValue);
                } catch (error) {
                    reject(error);
                }
            });
        } else if(this.isFulfilled){
            return new PromiseLike((resolve,reject)=>{
                try {
                    callBack();
                    resolve(this.resolvedValue);
                } catch (error) {
                    reject(error);
                }
            });
        } else {
            return new PromiseLike((resolve, reject)=>{
                this.run.push({
                    res: (a)=>{
                        try {
                            callBack();
                            resolve(a);
                        } catch (error) {
                            reject(error);
                        }
                    },
                    rej: (e)=>{
                        try {
                            callBack();
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
            return new PromiseLike((resolve,reject)=>{
                try {
                    resolve(rej(this.rejectedValue));
                } catch (error) {
                    reject(error);
                }
            });
        } else if(this.isFulfilled){
            return new PromiseLike((resolve)=>resolve(this.resolvedValue));
        } else {
            return new PromiseLike((resolve, reject)=>{
                this.run.push({
                    res: resolve,
                    rej: (e)=>{
                        try {
                            resolve(rej(e));
                        } catch (error) {
                            reject(error);
                        }
                    }
                });
            });
        }
    };
}