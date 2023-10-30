import { Component, inject } from '@angular/core';
import { Firestore, QueryDocumentSnapshot, DocumentData, doc, getDocs, where , query,  collectionData, DocumentReference, collection } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

interface Usuario {
  usuario:string;
  correo:string;
  contrasena:string
}

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {

  firestore: Firestore = inject(Firestore);

  authForm: FormGroup = this.fb.group({
    correo:[''],
    contrasena: ['', Validators.maxLength(6)],
  });

  constructor(private fb: FormBuilder, private router: Router){ }

  public validUser = async() => {

    const dbRef = collection(this.firestore, 'usuarios')
   
    const { correo, contrasena  } = this.authForm.value

    const q = query(dbRef, 
      where("contrasena", "==", contrasena), 
      where("correo", "==", correo));

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc:QueryDocumentSnapshot<DocumentData>) => {
   
       const data = doc.data() as Usuario
        if(data){
          localStorage.setItem("email", data.correo)
          localStorage.setItem("auth", JSON.stringify({state:true}))
          this.router.navigate(["students"])
        }

      });

  }


}
