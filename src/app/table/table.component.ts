import { Component, Input } from '@angular/core';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  private eventsSubscription: Subscription = new Subscription();
  @Input() events: Observable<void> = new Observable<void>;
  dataList: object[] = [];

  ngOnInit() {
    this.eventsSubscription = this.events.subscribe(() => this.listData())
  }

  /*
  --------------------------------------------------------------------------------------
  Função para obter a lista existente do servidor via requisição GET
  --------------------------------------------------------------------------------------
  */
  listData() {
    const getList = async () => {
      let url = 'http://127.0.0.1:8000/pets';
      fetch(url, {
        method: 'get',
      })
        .then((response) => response.json())
        .then((data) => {
          this.dataList = [];
          data.pets.forEach((item: any) => this.insertList(item.tipo, item.nome, item.responsavel))
        })
        .catch((error) => {
          console.error('Erro ao consultar pets:', error);
        });
    }
  }

  /*
  --------------------------------------------------------------------------------------
  Função para inserir pets na lista apresentada
  --------------------------------------------------------------------------------------
  */
  insertList(tipo: any, nome: any, responsavel: any) {        
    this.dataList.push({
      "tipo": tipo,
      "nome": nome,
      "responsavel": responsavel
    })
  }

  /*
  --------------------------------------------------------------------------------------
  Função para deletar pet na lista apresentada através do nome
  --------------------------------------------------------------------------------------
  */
  deleteItem(nomePet: any)
  {
    const getList = async () => {
      let url = 'http://127.0.0.1:8000/pet?nome=' + nomePet;
      fetch(url, {
        method: 'delete',
      })
        .then((response) => response.json())       
        .catch((error) => {
          console.error('Erro ao deletar pets:', error);
        });
    }
  }
}
