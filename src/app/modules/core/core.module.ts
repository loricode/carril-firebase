import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule} from '@angular/forms';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDyjboU9jb_RNWd5YyUZgJSmgr5IHAHnoA",
  authDomain: "carril-9ed0d.firebaseapp.com",
  projectId: "carril-9ed0d",
  storageBucket: "carril-9ed0d.appspot.com",
  messagingSenderId: "432088645795",
  appId: "1:432088645795:web:2f990854d0c357745e3f16",
  measurementId: "G-D1LSD02J9Y"
};

@NgModule({
  declarations: [
  
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),
  ],
  exports:[
    ReactiveFormsModule,
 
    
  ]
})
export class CoreModule { }
