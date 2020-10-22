import { Component, OnInit } from '@angular/core';
import { CityI } from 'src/app/models/city/city.interface';
import { DataService } from "./data.service";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  cities: CityI[];
  editOn = false;
  selectedCity: CityI;
  showNew = false;
  newCity: CityI = {
    name: null
  };
  labelButtonNew:string = "Add new";

  constructor(private dataSvc: DataService) { }

  ngOnInit() {
    this.dataSvc.getAllCities().subscribe(data => (this.cities = data));
  }

  toggleShowNew() {
    if(this.showNew) {
      this.labelButtonNew = "Add new";
      this.showNew = false;
      this.saveNew();
    } else {
      this.showNew = true;
      this.labelButtonNew = "Save";
    }
  }

  onSelectCity(city: CityI): void {
    this.selectedCity = city;
  }

  toggleEditOn() {
    this.editOn = !this.editOn;
  }

  saveNew() {
    console.log('Save new ',this.newCity);
    this.dataSvc.addNewCity(this.newCity).subscribe(city => this.cities.push(city)); 
  }

  onUpdateCity(myCity: CityI): void {
    this.dataSvc.updateCities(myCity).subscribe(city => {
      /* Comprueba que city sea true, si es asi busca el indice de el arreglo 
         comprobando que ese indice sea igual al que esta en la api */
      const indexToUpdate = city ? this.cities.findIndex(c => c.id == city.id) : -1;
      if (indexToUpdate > -1) {
        this.cities[indexToUpdate] = city;
        this.toggleEditOn();
      }
    })
  }

  onDeleteCity(myCity: CityI): void {
    this.dataSvc.deleteCity(myCity.id).subscribe();
    this.cities = this.cities.filter(c => c.id != myCity.id);
  }




}
