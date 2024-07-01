import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import { Router } from "@angular/router";
import { LoginService } from "../shared/service/login.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private loginService: LoginService, private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const usuarioAutenticado = localStorage.getItem('usuarioAutenticado');
    let authReq = req;

    if (usuarioAutenticado) {
      authReq = req.clone({
        setHeaders: { idSessao: JSON.parse(usuarioAutenticado).idSessao }
      });
    }

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.loginService.sair();
          this.router.navigate(['/login']);
        }
        return throwError(error);
      })
    );
  }
}