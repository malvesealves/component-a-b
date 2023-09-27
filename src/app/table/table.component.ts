import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
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
      let url = 'http://127.0.0.1:5000/pets';
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

  groups = [
    {
      "tipo": 1,
      "nome": "Leanne Graham",
      "responsavel": "Bret",

    },
    {
      "tipo": 2,
      "nome": "Ervin Howell",
      "responsavel": "Antonette"
    }
  ]

  /*
  --------------------------------------------------------------------------------------
  Função para inserir items na lista apresentada
  --------------------------------------------------------------------------------------
*/
  insertList(tipo: any, nome: any, responsavel: any) {        
    this.dataList.push({
      "tipo": tipo,
      "nome": nome,
      "responsavel": responsavel
    })
  }
}
