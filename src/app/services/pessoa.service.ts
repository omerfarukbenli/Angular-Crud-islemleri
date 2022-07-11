import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pessoa } from '../models/pessoa';



const httpOptions = {
  headers:new HttpHeaders({
    'Content-Type' : 'application/json'
  })
}



@Injectable({
  providedIn: 'root'
})
export class PessoaService {
  url='https://localhost:7062/api/Pessoas';


  constructor(private http:HttpClient) { }

  PegarTodos(): Observable<Pessoa[]>{
    return this.http.get<Pessoa[]>(this.url);
  }

  PegarPeloId(id:number): Observable<Pessoa>{
    const apiUrl = `${this.url}/${id}`;
    return this.http.get<Pessoa>(apiUrl);
  }

  SalvarPessoa(pessoa:Pessoa) : Observable<any>{
    return this.http.post<Pessoa>(this.url, pessoa, httpOptions);
  }

  AutalizarPessoa(pessoa:Pessoa) : Observable<any>{
    return this.http.put<Pessoa>(this.url, pessoa, httpOptions);
  }

  ExcluirPessoa(id:number):Observable<any>{
    const apiUrl = `${this.url}/${id}`;
    return this.http.delete<number>(apiUrl, httpOptions);
  } 
}
