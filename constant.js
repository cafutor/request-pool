const errorObj = {
  insError:
    'request method must return a promise ins @request-pool,please check the method requestPool.push()',
  doneCbError:
    'the finish callback must be a function,please check the method request.done()',
  nanError: 'number is needed,check new RequestPool()',
  naMinusOrZero: 'not a minus or zero,check new RequestPool()',
};

export default errorObj;
