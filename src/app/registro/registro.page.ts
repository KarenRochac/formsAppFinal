import { StorageService } from './../services/storage.service';
import { Usuario } from './../models/Usuario';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  formCadastro: FormGroup;
  usuario: Usuario = new Usuario();

  mensagens = {
    nome: [
      {tipo: 'required', mensagem: 'O campo nome é obrigatório'},
      {tipo: 'minlength', mensagem: 'O campo nome tem que ter pelo menos 3 caracteres'}
    ],
    sobrenome: [
      {tipo: 'required', mensagem: 'O campo sobrenome é obrigatório'},
      {tipo: 'minlength', mensagem: 'O campo sobrenome tem que ter pelo menos 3 caracteres'}
    ],
    cpf: [
    {tipo: 'required', mensagem: 'O campo CPF é obrigatório'},
    {tipo: 'minlength', mensagem: 'O campo CPF tem que ter 11 caracteres e sem traços ou pontos'}
  ],
    email:[
      {tipo: 'required', mensagem: 'O campo email é obrigatório'},
      {tipo: 'email', mensagem: 'Email inválido'}
    ],
    senha:[
      {tipo: 'required', mensagem: 'O campo senha é obrigatório'},
      {tipo: 'minlength', mensagem: 'A senha deve possuir no mínimo 8 dígitos'}
    ],
    confirmarSenha:[
      {tipo: 'required', mensagem: 'O confirmar a senha é obrigatório'},
      {tipo: 'minlength', mensagem: 'A senha deve possuir no mínimo 8 dígitos'}
    ],
  };

  constructor(private formBuilder: FormBuilder, private storageService: StorageService, private route: Router) {
    this.formCadastro = this.formBuilder.group({
      nome: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      sobrenome:['', Validators.compose([Validators.required, Validators.minLength(3)])],
      cpf:['', Validators.compose([Validators.required, Validators.minLength(11)])],
      email:['', Validators.compose([Validators.required, Validators.email])],
      senha: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
      confirmarSenha: ['', Validators.compose([Validators.required, Validators.minLength(8)])]
    });
   }

  ngOnInit() {
  }


  async salvarCadastro(){
   if(this.formCadastro.valid){
    this.usuario.nome = this.formCadastro.value.nome;
    this.usuario.sobrenome = this.formCadastro.value.sobrenome;
    this.usuario.cpf = this.formCadastro.value.cpf;
    this.usuario.senha = this.formCadastro.value.senha;
    await this.storageService.set(this.usuario.email, this.usuario);
    this.route.navigateByUrl('/tabs/tab2');
   }
   else{
    alert('Foemulário inválido');
   }
  }
}
