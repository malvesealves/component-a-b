import { Component, Input } from '@angular/core';
import { FormGroup, FormControl, FormGroupDirective } from '@angular/forms';
import { ViaCepService } from '../external-api/via-cep.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-owner',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.css']
})
export class OwnerComponent {
  constructor(private viaCepService: ViaCepService,
    private rootFormGroup: FormGroupDirective) { }

  private eventsSubscription: Subscription = new Subscription();
  @Input() events: Observable<void> = new Observable<void>;

  @Input() formGroupName: string = '';
  form: FormGroup = new FormGroup('');

  ngOnInit() {
    this.form = this.rootFormGroup.control.get(this.formGroupName) as FormGroup;
    this.eventsSubscription = this.events.subscribe(() => this.clearOwnerForm(false))
  }

  searchCep(param: any) {
    const viaCep = this.viaCepService.externalSearchCep(param.value.cep);

    this.viaCepService.currentMessage.subscribe((data: any) => {
      if (data != 'null') {
        this.updateAddressFields(data);
      }
    });
  }

  updateAddressFields(result: any) {
    this.clearOwnerForm(true);

    this.form.controls['address'].get('logradouro')?.setValue(result.logradouro);
    this.form.controls['address'].get('bairro')?.setValue(result.bairro);
    this.form.controls['address'].get('localidade')?.setValue(result.localidade);
    this.form.controls['address'].get('uf')?.setValue(result.uf);
  }

  clearOwnerForm(onlyAddress: boolean) {
    if (onlyAddress) {      
      this.form.controls['address'].get('logradouro')?.setValue('');
      this.form.controls['address'].get('bairro')?.setValue('');
      this.form.controls['address'].get('localidade')?.setValue('');
      this.form.controls['address'].get('uf')?.setValue('');
    } else {
      this.form.setValue({
        name: '',
        contact: {
          ddd: '',
          number: ''
        },
        address: {
          cep: '',
          logradouro: '',
          complemento: '',
          bairro: '',
          localidade: '',
          uf: ''
        }
      });
    }
  }
}
