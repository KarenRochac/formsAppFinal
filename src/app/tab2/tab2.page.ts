import { StorageService } from './../services/storage.service';
import { Usuario } from './../models/Usuario';
import { Component } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  listaUsuarios: Usuario[] = [];
  constructor(private storageService: StorageService) {}

  async buscarUsuarios(){
    this.listaUsuarios = await this.storageService.getAll();
  }
  ionViewDidEnter(){
    this.buscarUsuarios();
  }

  async excluirCadastro(email: string){
    await this.storageService.remove(email);
    this.buscarUsuarios();
  }
}
