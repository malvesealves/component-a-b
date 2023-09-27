import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ViaCepService {
  private messageSource = new BehaviorSubject('null');
  currentMessage = this.messageSource.asObservable();

  constructor() { }

  externalSearchCep(parameter: any) {
    const url = `https://viacep.com.br/ws/${parameter}/json/`;

    fetch(url)
      .then(response => response.json())
      .then(data => this.displayResults(data))
      .catch(error => console.error('Erro ao comunicar com API ViaCEP:', error));
  }

  displayResults(result: any) {
    this.messageSource.next(result);
  }
}
