

const errorObj=require('./constant');
/**
 * request pool
 * @param{number} maxRequestNum
 * */
function RequestPool(maxRequestNum) {
  this.maxRequestNum=maxRequestNum||3;
  this.currentRequestNum=0;
  this.requestQueue=[];
  this.done=(cb)=>{
    if (Object.prototype.toString.call(cb)!=='[object Function]') {
      throw new Error(errorObj.doneCbError);
    }
    this.doneCb=cb;
  };
  this.push=(request)=>{
    if (this.currentRequestNum<this.maxRequestNum) {
      const processing=request();
      if (!processing instanceof Promise) {
        throw new Error(errorObj.insError);
      }
      this.currentRequestNum++;
      processing.finally(()=>{
        this.currentRequestNum--;
        if (this.requestQueue.length!==0) {
          const nextReq=this.requestQueue.pop();
          this.push(nextReq);
        }
        if (this.currentRequestNum===0&&this.doneCb) {
          this.doneCb();
        }
      });
    } else {
      this.requestQueue.unshift(request);
    }
  };
}

module.exports=RequestPool;
