const RequestPool=require('../index.js');

const requestPool=new RequestPool(3);

// eslint-disable-next-line prefer-spread
const requests=Array.apply(null, {length: 5})
    .map(()=>()=>(new Promise(((res)=>{
      setTimeout(()=>{
        res('value');
      }, 1000);
    }))));

test('The requests are executed sequentially', ()=>{
  requests.forEach((request)=>{
    requestPool.push(request);
  });

  expect(requestPool.currentRequestNum).toBe(3);
  expect(requestPool.requestQueue.length).toBe(2);
});

test('the request is finished', (done)=>{
  expect.assertions(1);
  requestPool.done(()=>{
    expect(requestPool.currentRequestNum).toBe(0);
    done();
  });
});
