import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Firestore, doc, getDocs, deleteDoc, onSnapshot, collectionData, collection } from '@angular/fire/firestore';

interface Item {
  id:string;
  nombre: string;
  telefono:string;
};


@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.css']
})
export class PortalComponent {

  firestore: Firestore = inject(Firestore);
  carrilOne$: Observable<Array<Item>> = new Observable<Array<Item>>;
  carrilTwo$: Observable<Array<Item>> = new Observable<Array<Item>>;
  carrilThree$: Observable<Array<Item>> = new Observable<Array<Item>>;
  
  constructor(){
    const itemCollection1 = collection(this.firestore, 'carrilUno');
    this.carrilOne$ = collectionData(itemCollection1) as Observable<Array<Item>>
    const itemCollection2 = collection(this.firestore, 'carrilDos');
    this.carrilTwo$ = collectionData(itemCollection2) as Observable<Array<Item>>
    const itemCollection3 = collection(this.firestore, 'carrilTres');
    this.carrilThree$ = collectionData(itemCollection3) as Observable<Array<Item>>
  }



}
