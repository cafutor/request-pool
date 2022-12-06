# request-pool

### useage

```javascript
import RequestPool from 'request-limit-pool';

//set the maximum number of requests to 3. default is 3.
const requestPool = new RequestPool(3);

// the request method must return a promise instance
const request = () => {
  return fetchUser().then((data) => {
    // processing data
  });
};

// then push the request to the queue and request-pool will excute it
requestPool.push(request);
requestPool.push(request);
requestPool.push(request);
requestPool.push(request);

// when all requests are finished,the callback will be called
const unsubscribe = requestPool.done(() => {
  // is done
  //...
  unsubscribe();
});

// you can subscribe multiple times.
requestPool.done(() => {
  // is done
});
```
