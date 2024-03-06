import { HttpException, HttpStatus } from '@nestjs/common';
import { DESExceptionFilter, HttpExceptionFilter } from './exception.filter';
import { DESException } from '../../exceptions/des.exception';
const mockJson = jest.fn();
const mockStatus = jest.fn().mockImplementation(() => ({
  json: mockJson,
}));
const mockGetResponse = jest.fn().mockImplementation(() => ({
  status: mockStatus,
}));
const mockHttpArgumentsHost = jest.fn().mockImplementation(() => ({
  getResponse: mockGetResponse,
  getRequest: jest.fn().mockImplementation(() => ({
    path: '',
  })),
}));

const mockArgumentsHost = {
  switchToHttp: mockHttpArgumentsHost,
  getArgByIndex: jest.fn(),
  getArgs: jest.fn(),
  getType: jest.fn(),
  switchToRpc: jest.fn(),
  switchToWs: jest.fn(),
};
describe('HttpExceptionFilter', () => {
  it('should be defined', () => {
    expect(new HttpExceptionFilter()).toBeDefined();
  });
  it('should catch http exception', () => {
    const filter = new HttpExceptionFilter();
    jest.spyOn(filter.logger, 'error').mockImplementation(() => {
      return;
    });
    filter.catch(new HttpException('Http exception', HttpStatus.BAD_REQUEST), mockArgumentsHost);
    expect(mockHttpArgumentsHost).toHaveBeenCalledTimes(1);
    expect(mockHttpArgumentsHost).toHaveBeenCalledWith();
    expect(mockGetResponse).toHaveBeenCalledTimes(1);
    expect(mockGetResponse).toHaveBeenCalledWith();
    expect(mockStatus).toHaveBeenCalledTimes(1);
    expect(mockStatus).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
    expect(mockJson).toHaveBeenCalledTimes(1);
  });
  it('should catch des exception', () => {
    const filter = new DESExceptionFilter();
    jest.spyOn(filter.logger, 'error').mockImplementation(() => {
      return;
    });
    new DESExceptionFilter().catch(new DESException(new Error('Http exception')), mockArgumentsHost);
    expect(mockHttpArgumentsHost).toHaveBeenCalledTimes(1);
    expect(mockHttpArgumentsHost).toHaveBeenCalledWith();
    expect(mockGetResponse).toHaveBeenCalledTimes(1);
    expect(mockGetResponse).toHaveBeenCalledWith();
    expect(mockStatus).toHaveBeenCalledTimes(1);
    expect(mockJson).toHaveBeenCalledTimes(1);
  });
});
