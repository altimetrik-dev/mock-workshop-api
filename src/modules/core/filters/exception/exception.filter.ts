import { ArgumentsHost, Catch, HttpException, Logger } from '@nestjs/common';
import { ExceptionFilter as BaseExceptionFilter } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements BaseExceptionFilter {
  logger: Logger = new Logger(HttpExceptionFilter.name);
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    let message = exception.message;
    if ((exception as any).response?.message) {
      if ((exception as any).response?.message?.legnth) {
        message = `${message}. \n Error List: ${(exception as any).response?.message.map((msg) => msg)}`;
      } else {
        message = `${message}. \n Error List: ${(exception as any).response?.message}`;
      }
    }
    this.logger.error(
      `Error(${status}): ${message}`,
      exception.stack,
      exception.name,
    );
    response.status(status).json({
      success: false,
      error: {
        status,
        message: `${exception.name} => ${message}`,
        path: request.url,
      },
    });
  }
}
