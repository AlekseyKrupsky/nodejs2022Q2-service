import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class PasswordInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next
            .handle()
            .pipe(map((data) => {
                if (!data || (data.password === undefined && !Array.isArray(data))) {
                    return data;
                }

                if (data.password !== undefined) {
                    return this.getClonedItemWithoutPassword(data);
                }

                return data.map((item) => {
                    return this.getClonedItemWithoutPassword(item);
                });
            }));
    }

    getClonedItemWithoutPassword(object) {
        const clonedItem = Object.create(Object.getPrototypeOf(object), Object.getOwnPropertyDescriptors(object));

        delete clonedItem.password;

        return clonedItem;
    }
}