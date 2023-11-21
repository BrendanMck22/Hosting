import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { SharedService } from './shared.service';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { LandingPageComponent } from './landing-page/landing-page.component';

const firebaseConfig = {
  apiKey: "AIzaSyArjcE6BnDJRJQ_qKWxjgfJnzFnv2ir0h0",
  authDomain: "practicehosting-42536.firebaseapp.com",
  databaseURL: "https://practicehosting-42536-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "practicehosting-42536",
  storageBucket: "practicehosting-42536.appspot.com",
  messagingSenderId: "981017724338",
  appId: "1:981017724338:web:7456905a34a0b8999290ab",
  measurementId: "G-N0EJLNQ924"
};

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()), 
  ],
  providers: [SharedService],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
