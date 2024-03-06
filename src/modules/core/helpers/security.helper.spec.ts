import { basicAuthMiddleware } from './security.helper';
import * as mocks from 'node-mocks-http';

describe('Security Helpers', () => {
  const user = 'test';
  const password = 'test';
  const token = Buffer.from(`${user}:${password}`).toString('base64');
  const wrongToken = Buffer.from(`${user}-1:${password}-1`).toString('base64');
  const req = mocks.createRequest({
    path: '/tests',
    auth: {
      user,
      password,
    },
    headers: {
      authorization: `Basic ${token}`,
    },
  });
  const wrongAuthReq = mocks.createRequest({
    path: '/tests',
    headers: {
      authorization: `Basic ${wrongToken}`,
    },
  });
  wrongAuthReq.res = mocks.createResponse();
  req.res = mocks.createResponse();
  const nextFn = () => {
    return null;
  };
  const nextFnSuccess = () => {
    return 200;
  };
  it('should be defined', () => {
    const middleware = basicAuthMiddleware({ [user]: password }, ['/test']);
    expect(middleware).toBeTruthy();
  });
  it('empty paths', () => {
    const middleware = basicAuthMiddleware({ [user]: password }, []);
    expect(middleware(req, req.res, nextFn)).toBeNull();
  });
  it('should resolve paths', () => {
    const middleware = basicAuthMiddleware({ [user]: password }, ['/tests']);
    expect(middleware(req, req.res, nextFn)).toBeDefined();
  });
  it('should auth', () => {
    const middleware = basicAuthMiddleware({ [user]: password }, ['/tests']);
    const response = middleware(req, req.res, nextFnSuccess);
    expect(response).toBe(200);
  });
  it('should do anything', () => {
    const middleware = basicAuthMiddleware({ [user]: password }, ['/testing']);
    const response = middleware(req, req.res, nextFnSuccess);
    expect(response).toBe(200);
  });
  it('should unauth', () => {
    const middleware = basicAuthMiddleware({ [user]: password }, ['/tests']);
    delete req.auth;
    delete req.headers.authorization;
    const response = middleware(req, req.res, nextFn);
    expect(response.statusCode).toBe(401);
  });
  it('wrong password', () => {
    const middleware = basicAuthMiddleware({ [user]: `${password}-1` }, ['/tests']);
    const response = middleware(req, req.res, nextFn);
    expect(response.statusCode).toBe(401);
  });
  it('wrong token', () => {
    const middleware = basicAuthMiddleware({ [user]: `${password}` }, ['/tests']);
    const response = middleware(wrongAuthReq, wrongAuthReq.res, nextFn);
    expect(response.statusCode).toBe(401);
  });
});
