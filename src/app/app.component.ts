import { Component } from '@angular/core';
import { SharedService } from './shared.service';
import { Firestore, collectionData, collection, addDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { inject } from '@angular/core';

interface Days {
  description: string,
  name: string
};
// interface Names {
//   name: string
// };
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
  // selectedDays: any[] = [];
  // checkDays: any[]=[
  //   {name :'Monday', value: 'Monday', checked: false}, 
  //   {name :'Tuesday', value: 'Tuesday', checked: false},
  //   {name :'Wednesday', value: 'Wednesday', checked: false}, 
  //   {name :'Thursday', value: 'Thursday', checked: false},
  //   {name :'Friday', value: 'Friday', checked: false}, 
  //   {name :'Saturday', value: 'Saturday', checked: false},
  //   {name :'Sunday', value: 'Sunday', checked: false},
  // ];
  days:any=[] as Observable<Days>[];

  refreshDays(){
    this.service.getDays().subscribe((res) => {
      this.days = res;
    })
  }
  // get selectedOptions() { // right now: ['1','3']
  //   return this.checkDays
  //             .filter(opt => opt.checked)
  //             .map(opt => opt.value)
  // }
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

  // get selectedDaysSubjects(): any[] {
  //   return this.checkDays.filter((e,i) => this.selectedDays[i]);
  // }

  

}
