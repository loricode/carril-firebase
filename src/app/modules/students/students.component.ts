import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Firestore, doc, getDocs, deleteDoc, addDoc, collection } from '@angular/fire/firestore';
import { CarrilService } from './services/carril.service';
import Sweet from 'sweetalert2';
import { Carril } from './interfaces/carril.interface';
import { Item } from './interfaces/item.interface';


@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit{

  openModal = false;

  firestore: Firestore = inject(Firestore);

  listCarriles:Carril[] = []
  
  studentForm: FormGroup = this.fb.group({
    nombre:[''],
    telefono: [''],
    codigoCarril: ['']
  });

  tabs = 0;
  studentsArray:Item[] = []

  constructor(private fb: FormBuilder,
    private carrilService: CarrilService,
    private router: Router
    ){ }

  ngOnInit(): void {
    this.getStudents();
    this.getListCarriles();
  }

  private getListCarriles = () => {

    this.carrilService.getCarriles().then(res => {
      
      this.listCarriles = res;

    })

  }

  public setTabs = (numberTab = 0) => {
    this.tabs = numberTab;
  }

  public deleteStudent = async(idDocument:string ) => {
    await deleteDoc(doc(this.firestore, "estudiantes", idDocument));
    this.getStudents();
  }

  public getStudents = async () => {

    let arrayTemp:Item[] = [] 
    
    const querySnapshot = await getDocs(collection(this.firestore, "estudiantes"));
    querySnapshot.forEach((doc) => {

      const o = { id:doc.id, ...doc.data()} as Item
      arrayTemp.push(o);

    });

    this.studentsArray = arrayTemp;
  }

  public handleOpenModal = () => {

    this.openModal = !this.openModal ;

  }

  public saveStudent = async() => {

    const { codigoCarril }  = this.studentForm.value

   const found = this.listCarriles.find(x => x.codigo === codigoCarril )

   if(!found){
     return;
   }

    await addDoc(collection(this.firestore, "estudiantes"), {
      ...this.studentForm.value,
      carrilDescripcion:found.descripcion
     })
     
    this.getStudents();
    this.studentForm.reset()
    this.openModal = false;

  }

  saveCarril = async (carril:string, code:string) => {

    this.saveCarrilArray(carril, code).then(x => {
      if(x){
        this.deletedCarril(carril);
      }
    })
    //quitar si no quiere que elimine al mostrarlo en los carriles
    
  }

  public saveCarrilArray = async (carril:string, code:string) => {
    return await new Promise((resolve) => {
     
    const list = this.studentsArray.filter(x => x.codigoCarril === code)

    if(list.length === 0){
      
      Sweet.fire({
        icon:'info',
        title:'Mensaje',
        text:'No hay información en el carril',
        timer:4000
      })
      
      return; 
    }


    list.forEach( async (item ) => {
        await addDoc(collection(this.firestore, carril), {
           ...item
          })

          let mensaje = ''; 
          list.forEach(x => {
           mensaje += x.nombre + "se fue en el "+ x.carrilDescripcion + "\n" 
          })

         Sweet.fire({
           icon:'success',
           title:'Mensaje',
           text:'Ok! ' + mensaje,
           timer:4000
         })

          setTimeout(() => {
            resolve(true);
          }, 2500);

    }, (err:any) => {
      resolve(false);
    })

  })
  }

  //eliminar del carril 
   public deletedCarril = async (collectionName:string) => {
     
       const querySnapshot = await getDocs(collection(this.firestore, collectionName));
        querySnapshot.forEach(async (dataDoc) => {

         await deleteDoc(doc(this.firestore, collectionName, dataDoc.id))

        });
     
    }  


    cerrarSesion = () => {

      localStorage.removeItem("auth")
      localStorage.removeItem("email")
      this.router.navigate([""])

    }


}
