import { Component } from '@angular/core';
import { SharedService } from './shared.service';
import { Firestore, collectionData, collection, addDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { inject } from '@angular/core';

interface Days {
  description: string,
  name: string
};
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Practice-Hosting';
  // constructor(private service:SharedService){}
  // day$: Observable<Days[]>;
  firestore: Firestore = inject(Firestore);
  constructor(private service:SharedService) {
    // const daysCollection = collection(this.firestore, 'days');
    // this.day$ = collectionData(daysCollection) as Observable<Days[]>;
  }
  days:any=[] as Observable<Days>[];

  refreshDays(){
    this.service.getDays().subscribe((res) => {
      this.days = res;
    })
  }
  
  ngOnInit(){
    this.refreshDays();
  }
  addDays(f: any) {
    const collectionInstance = collection(this.firestore, 'days');
    addDoc(collectionInstance, f.value)
    .then(() => {
      console.log('Data Saved Successfully');
    })
    .catch((err) => {
      console.log(err);
    })
  }
  // addDays(newDays:string){
  //   this.service.addDays(newDays).then((res) => {
  //     console.log(res);
  //     this.refreshDays();
  //   })
  // }
  deleteDays(id:string){
    this.service.deleteDay(id).then((res) => {
      console.log(res);
      this.refreshDays();
    })
  }

}
