import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Pessoa } from 'src/app/models/pessoa';
import { PessoaService } from 'src/app/services/pessoa.service';


@Component({
  selector: 'app-pessoa',
  templateUrl: './pessoa.component.html',
  styleUrls: ['./pessoa.component.css']
})
export class PessoaComponent implements OnInit {


  formulario:any;
  tituloFormulario:string;
  pessoas:Pessoa[];
  nomePessoa: string;
  id:number;

  visibilidadeTabela:boolean = true; //tablo gözüksün, gözükmesin diye yapılan şey
  visibilidadeFormlario:boolean = false;

  modalRef:BsModalRef;


  constructor(private pessoasService:PessoaService, private modalService:BsModalService) { }

  ngOnInit(): void {

    this.pessoasService.PegarTodos().subscribe(resultado=>{
      this.pessoas = resultado;
    });


    this.tituloFormulario = "başlık"

    this.formulario = new FormGroup({
      nome:new FormControl(null),
      sobrenome:new FormControl(null),
      idade:new FormControl(null),
      profissao: new FormControl(null),
    });
  }



  ExibirFormularioCadastro():void{ //kayıt formunu göster
    this.visibilidadeTabela = false;
    this.visibilidadeFormlario = true;

    this.tituloFormulario = 'yeni kişi'; //ekleme
    this.formulario = new FormGroup({
      nome:new FormControl(null),
      sobrenome:new FormControl(null),
      idade:new FormControl(null),
      profissao: new FormControl(null),
    });
  }




  ExibirFormularioAtualizacao(id:number):void{
    this.visibilidadeTabela = false;
    this.visibilidadeFormlario = true;

    this.pessoasService.PegarPeloId(id).subscribe(resultado =>{
      this.tituloFormulario = `Düzenle ${resultado.nome} ${resultado.sobrenome}`;
      this.formulario = new FormGroup({
        id: new FormControl(resultado.id),
        nome: new FormControl(resultado.nome),
        sobrenome: new FormControl(resultado.sobrenome),
        idade: new FormControl(resultado.idade),
        profissao: new FormControl(resultado.profissao)
      });
    });

  }


  EnviarFormulario():void{ //eklemek için
    const pessoa: Pessoa = this.formulario.value;

    if(pessoa.id>0){
      this.pessoasService.AutalizarPessoa(pessoa).subscribe(resultado =>{

        this.visibilidadeFormlario = false;
        this.visibilidadeTabela = true;
        alert('güncellendi');
        this.pessoasService.PegarTodos().subscribe(registros =>{
          this.pessoas = registros;
        });

      });
    }
    else{


    this.pessoasService.SalvarPessoa(pessoa).subscribe(resultado=>{
      this.visibilidadeFormlario = false;
      this.visibilidadeTabela = true;
      alert('eklendi');
      this.pessoasService.PegarTodos().subscribe(registros =>{
        this.pessoas = registros;
      });
    });
  }

  }

  Voltar():void{
    this.visibilidadeTabela = true;
    this.visibilidadeFormlario = false;
  }


  ExibirConfirmaExclusao(id:number, nomePessoa:string, conteudoModal:TemplateRef<any>): void{
this.modalRef = this.modalService.show(conteudoModal);
this.id = id;
this.nomePessoa = nomePessoa;
  }



  ExcluirPessao(id:number){
this.pessoasService.ExcluirPessoa(id).subscribe(resultado  =>{
  this.modalRef.hide();
  alert('silme başarılı');
  this.pessoasService.PegarTodos().subscribe(registros=>{
    this.pessoas = registros;
  });
});
  }
}
