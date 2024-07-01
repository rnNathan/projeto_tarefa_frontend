
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuarioDTO } from '../model/DTO/usuario.DTO';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private readonly API = 'http://localhost:8080//rest/login';
  
  constructor(private httpClient: HttpClient) { }

  autenticar(dto: UsuarioDTO): Observable<any> {
    return this.httpClient.post(this.API + '/autenticar', dto);
  }

  sair() {
    localStorage.removeItem('usuarioAutenticado');
  }
}