import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-pet',
  templateUrl: './pet.component.html',
  styleUrls: ['./pet.component.css']
})
export class PetComponent {
  petTypeList = [
    { id: 1, name: "Cachorro" },
    { id: 2, name: "Gato" }
  ];

  petForm = new FormGroup({
    petType: new FormControl(''),
    petName: new FormControl(''),
    petAge: new FormControl('')
  });
}
