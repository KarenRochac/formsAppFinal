import { StorageService } from './../services/storage.service';
import { Produto } from './../models/Produto';
import { Component } from '@angular/core';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  listarProdutos: Produto[] =[];
  constructor(private storageService: StorageService) {}

  async buscarProdutos(){
    this.listarProdutos = await this.storageService.getAll();
  }
  ionViewDidEnter(){
    this.buscarProdutos();
  }

  async excluirCadastroProduto(nome: string){
    await this.storageService.remove(nome);
    this.buscarProdutos();
  }

}
