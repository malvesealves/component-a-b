import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-pet',
  templateUrl: './pet.component.html',
  styleUrls: ['./pet.component.css']
})
export class PetComponent {
  petForm: FormGroup = new FormGroup('');

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.petForm = this.fb.group({
      petType: new FormControl(''),
      petName: new FormControl(''),
      petAge: new FormControl(''),
      owner: this.fb.group({
        name: new FormControl(''),
        contact: this.fb.group({
          ddd: new FormControl(''),
          number: new FormControl(''),
        }),
        address: this.fb.group({
          cep: new FormControl(''),
          logradouro: new FormControl(''),
          complemento: new FormControl(''),
          bairro: new FormControl(''),
          localidade: new FormControl(''),
          uf: new FormControl('')
        })
      })
    });

    setTimeout(() => {
      this.listData();
    }, 10);
  }

  eventsSubject: Subject<void> = new Subject<void>();
  eventsSubjectTable: Subject<void> = new Subject<void>();

  emitEventToChild() {
    this.eventsSubject.next();
  }

  emitEventToChildTable() {
    this.eventsSubjectTable.next();
  }

  petTypeList = [
    { id: 1, name: "Cachorro" },
    { id: 2, name: "Gato" }
  ];

  clearForm() {
    this.petForm.setValue({
      petType: '',
      petName: '',
      petAge: '',
      owner: {
        name: '',
        contact: {
          ddd: '',
          number: '',
        },
        address: {
          cep: '',
          logradouro: '',
          complemento: '',
          bairro: '',
          localidade: '',
          uf: ''
        }
      }
    });

    this.emitEventToChild();
  }

  submitForm() {
    const formData = new FormData();
    formData.append('', this.petForm.value);
    let url = 'http://127.0.0.1:8000/item';
    fetch(url, {
      method: 'post',
      body: formData
    })
      .then((response) => response.json())
      .catch((error) => {
        console.error('Erro:', error);
      });


    console.log(this.petForm.value);
  }

  listData() {
    this.emitEventToChildTable();
  }
}
