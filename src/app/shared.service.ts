import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private fs:Firestore) { }


  getDays(){
    let daysCollection = collection(this.fs, 'days');
    return collectionData(daysCollection, {idField:'id'});
  }

  addDays(desc:string){
    let data = {description:desc};
    let daysCollection = collection(this.fs, 'days');
    return addDoc(daysCollection, data);
  }
  deleteDay(id:string){
    let docRef = doc(this.fs,'days/'+id);
    return deleteDoc(docRef);
  }
}
