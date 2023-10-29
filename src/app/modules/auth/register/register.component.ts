import { Component ,inject} from '@angular/core';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  firestore: Firestore = inject(Firestore);

  registerForm: FormGroup = this.fb.group({
    usuario:[''],
    correo: ['', [Validators.required]],
    contrasena: ['', Validators.maxLength(6)],
  })

constructor(private fb: FormBuilder){ }

 public addUser = async () => {

    const docRef = await addDoc(collection(this.firestore, "usuarios"), {
     ...this.registerForm.value
    })
  
   console.log("Document written with ID: ", docRef.id);
 }

}
