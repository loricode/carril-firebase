import { Injectable, inject } from '@angular/core';
import { Firestore, doc, getDocs, deleteDoc, addDoc, collection } from '@angular/fire/firestore';
import { Carril } from '../interfaces/carril.interface';

@Injectable({
  providedIn: 'root'
})
export class CarrilService {

  firestore: Firestore = inject(Firestore);

  constructor() { }

  public getCarriles = async () => {

    let arrayTemp:Carril[] = [] 
    
    const querySnapshot = await getDocs(collection(this.firestore, "carriles"));
    querySnapshot.forEach((doc) => {

      const o = { id:doc.id, ...doc.data()} as Carril
      arrayTemp.push(o);

    });

    return arrayTemp.sort(function(a:Carril, b:Carril) {
      var n = a.descripcion.toLocaleLowerCase().localeCompare(b.descripcion.toLocaleLowerCase());
      return n === 0 && a !== b ? b.descripcion.localeCompare(a.descripcion) : n;
    });
  }


}
