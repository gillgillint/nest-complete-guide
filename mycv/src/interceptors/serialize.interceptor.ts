import {
    UseInterceptors,
    NestInterceptor,
    ExecutionContext,
    CallHandler
} from '@nestjs/common'

import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { plainToClass } from 'class-transformer'

export class SerializeInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        // Run before a request is handled
        console.log('run before the request handler', context)


        return next.handle().pipe(
            map((data: any) => {
                // Run before a response is sent out
                console.log('run before the response handler',data)
            })
        )
    }
}