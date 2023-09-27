import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ViaCepService } from '../external-api/via-cep.service';

@Component({
  selector: 'app-owner',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.css']
})
export class OwnerComponent {
  constructor(private viaCepService: ViaCepService) { }

  ownerForm = new FormGroup({
    ownerName: new FormControl(''),
    ownerContact: new FormGroup({
      ddd: new FormControl(''),
      number: new FormControl(''),
    }),
    ownerAddress: new FormGroup({
      cep: new FormControl(''),
      logradouro: new FormControl(''),
      complemento: new FormControl(''),
      bairro: new FormControl(''),
      localidade: new FormControl(''),
      uf: new FormControl('')
    }),
  });

  searchCep(param: any) {
    const viaCep = this.viaCepService.externalSearchCep(param.value);

    this.viaCepService.currentMessage.subscribe((data: any) => {
      if (data != 'null') {
        this.updateAddressFields(data);
      } else {
        window.alert('Erro ao consultar CEP com webservice ViaCep');
      }
    });
  }

  updateAddressFields(result: any) {
    this.ownerForm.controls['ownerAddress'].controls['logradouro'].setValue(result.logradouro);
    this.ownerForm.controls['ownerAddress'].controls['bairro'].setValue(result.bairro);
    this.ownerForm.controls['ownerAddress'].controls['localidade'].setValue(result.localidade);
    this.ownerForm.controls['ownerAddress'].controls['uf'].setValue(result.uf);
  }
}
