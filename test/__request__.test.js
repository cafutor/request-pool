import RequestPool, { isNumber, isMinusOrZero } from '../index.js';

const requestPool = new RequestPool(3);

// eslint-disable-next-line prefer-spread
const requests = Array.apply(null, { length: 5 }).map(() => () =>
  new Promise((res) => {
    setTimeout(() => {
      res('value');
    }, 200);
  })
);

test('isNumber', () => {
  expect(isNumber(0)).toBeTruthy();
  expect(isNumber(NaN)).toBeFalsy();
  expect(isNumber(undefined)).toBeFalsy();
  expect(isNumber(null)).toBeFalsy();
  expect(isNumber('')).toBeFalsy();
  expect(isNumber(Symbol.for(''))).toBeFalsy();
  expect(isNumber(() => {})).toBeFalsy();
  expect(isNumber({})).toBeFalsy();
  expect(isNumber([])).toBeFalsy();
});

test('not a minus or zero', () => {
  expect(isMinusOrZero(0)).toBeTruthy();
  expect(isMinusOrZero(-1)).toBeTruthy();
  expect(isMinusOrZero(1)).toBeFalsy();
});

test('the requests are executed sequentially', () => {
  requests.forEach((request) => {
    requestPool.push(request);
  });

  expect(requestPool.currentRequestNum).toBe(3);
  expect(requestPool.requestQueue.length).toBe(2);
});

test('requests are finished', (done) => {
  expect.assertions(1);
  const unsubscribe = requestPool.done(() => {
    expect(requestPool.currentRequestNum).toBe(0);
    unsubscribe();
    done();
  });
});

describe('test done event', () => {
  // eslint-disable-next-line prefer-spread
  const reqs = Array.apply(null, { length: 5 }).map(() => () =>
    new Promise((res) => {
      setTimeout(() => {
        res('value');
      }, 100);
    })
  );
  const rp = new RequestPool(3);

  it('should fire the done event when all requests are finished', (done) => {
    expect.assertions(1);
    rp.onFinish(() => {
      expect(true).toBeTruthy();
      rp.offFinish();
      done();
    });
    reqs.forEach((request) => {
      rp.push(request);
    });
  });

  it('should not fire the done event', (done) => {
    expect.assertions(0);
    rp.done(() => {
      done();
    });
    rp.onFinish(() => {
      expect(true).toBeTruthy();
    });
    reqs.forEach((request) => {
      rp.push(request);
    });
    rp.offFinish();
  });

  it('should fire the done event once', (done) => {
    expect.assertions(1);
    const off = rp.onFinish(() => {
      expect(true).toBeTruthy();
    });
    off();
    rp.onFinish(() => {
      expect(true).toBeTruthy();
      rp.offFinish();
      done();
    });
    reqs.forEach((request) => {
      rp.push(request);
    });
  });

  it('should fire the done event twice', (done) => {
    expect.assertions(2);
    rp.onFinish(() => {
      expect(true).toBeTruthy();
      done();
    });
    rp.onFinish(() => {
      expect(true).toBeTruthy();
      rp.offFinish();
    });
    reqs.forEach((request) => {
      rp.push(request);
    });
  });
});
