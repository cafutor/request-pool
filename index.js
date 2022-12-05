import ErrorObj from './constant';

export const isNumber = (num) => {
  if (Object.prototype.toString.call(num) !== '[object Number]') return false;
  const j = 0;
  if (num + j - num !== j) return false;
  return true;
};

export const isMinusOrZero = (num) => {
  if (num < 1) return true;
  return false;
};

/**
 * request pool
 * @param{number} maxRequestNum
 * */
function RequestPool(maxRequestNum = 3) {
  if (!isNumber(maxRequestNum)) throw new Error(ErrorObj.nanError);
  if (isMinusOrZero(maxRequestNum)) throw new Error(ErrorObj.naMinusOrZero);
  this.maxRequestNum = maxRequestNum;
  this.currentRequestNum = 0;
  this.requestQueue = [];
  this.done = (cb) => {
    if (Object.prototype.toString.call(cb) !== '[object Function]') {
      throw new Error(ErrorObj.doneCbError);
    }
    this.doneCb = cb;
  };
  this.push = (request) => {
    if (this.currentRequestNum < this.maxRequestNum) {
      const processing = request();
      if (!processing instanceof Promise) {
        throw new Error(ErrorObj.insError);
      }
      this.currentRequestNum++;
      processing.finally(() => {
        this.currentRequestNum--;
        if (this.requestQueue.length !== 0) {
          const nextReq = this.requestQueue.pop();
          this.push(nextReq);
        }
        if (this.currentRequestNum === 0 && this.doneCb) {
          this.doneCb();
        }
      });
    } else {
      this.requestQueue.unshift(request);
    }
  };
}

export default RequestPool;
