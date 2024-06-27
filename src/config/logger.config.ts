import type { Request } from 'express';
import type { Params } from 'nestjs-pino';
import { multistream } from 'pino';
import type { ReqId } from 'pino-http';

const passUrl = new Set(['/PATH_THAT_IGNORE_LOGGING']);

export const loggerOptions: Params = {
  pinoHttp: [
    {
      quietReqLogger: true,
      genReqId: (req): ReqId => (<Request>req).header('X-Request-Id'),
      ...{
        level: 'debug',
        transport: {
          target: 'pino-pretty',
          options: { sync: true, singleLine: true },
        },
      },
      autoLogging: {
        ignore: (req) => passUrl.has((<Request>req).originalUrl),
      },
    },
    multistream(
      [
        { level: 'debug', stream: process.stdout },
        { level: 'error', stream: process.stderr },
        { level: 'fatal', stream: process.stderr },
      ],
      { dedupe: true },
    ),
  ],
};
