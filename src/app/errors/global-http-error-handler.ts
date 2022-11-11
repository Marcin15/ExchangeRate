import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpStatusCode } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, retry, throwError } from "rxjs";


@Injectable()
export class GlobalHttpErrorHandler implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if(navigator.onLine)
            return this.onlineErrorHandler(req, next);
        
        return this.offlineErrorHandler(req, next);
    }

    onlineErrorHandler(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            retry({
                count: 3,
                delay: 2500
            }),
            catchError(err => {
                return throwError(() => {
                    switch (err.status) {
                        case HttpStatusCode.InternalServerError:
                            return new Error('Internal server error. Please try again later.');
                        case HttpStatusCode.BadRequest:
                            return new Error('Bad request.');
                        default:
                            return new Error('Unhandled error.');
                    }
                })
            })
        );
    }

    offlineErrorHandler(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError(() => {
                return throwError(() => new Error('Something went wrong. Check your internet connection.'))
            })
        );
    }
}