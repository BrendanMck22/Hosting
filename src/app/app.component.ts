import { Component } from '@angular/core';
import { SharedService } from './shared.service';
import { Firestore, collectionData, collection, addDoc, query, where, getDocs, DocumentData, SnapshotOptions  } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule  } from '@angular/forms';
import { getDatabase, ref, onValue  } from "firebase/database";


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
  form: FormGroup;
  submitButtonDisabled = true;
  allDays: any[] = [];
  duplicateDays : any[] = [];
  res : any[] = [];
  bestDay: any[] = [];
  constructor(private service:SharedService, private fb: FormBuilder, private db: Firestore) {
    this.form = this.fb.group({
      name: [''], // Text input for the name
      description: this.fb.group({
        Monday: [false],
        Tuesday: [false],
        Wednesday: [false],
        Thursday: [false],
        Friday: [false],
        Saturday: [false],
        Sunday: [false],
      }),
    });
    // const daysCollection = collection(this.firestore, 'days');
    // this.day$ = collectionData(daysCollection) as Observable<Days[]>;
  }
  // updateSubmitButtonState() {
  //   const nameControl = (this.form.get('name') as FormGroup).controls;;
  //   const descriptionControl = (this.form.get('description') as FormGroup).controls;;

  //   // Enable the submit button if the name is not empty and at least one checkbox is checked
  //   this.submitButtonDisabled = nameControl.invalid || !Object.values(descriptionControl.value).some(val => val);
  // }
  async onSubmit() {
    const selectedDays = [];
    // const allDays: ((options?: SnapshotOptions | undefined) => DocumentData)[] = []
    const descriptionControls = (this.form.get('description') as FormGroup).controls;

    for (const day in descriptionControls) {
      if (descriptionControls.hasOwnProperty(day) && descriptionControls[day].value) {
        selectedDays.push(day);
      }
    }
    const formData = this.form.value;
    // Create a new object with the collected data
    const dataToAdd = {
      name: formData.name,
      selectedDays: selectedDays,
    };
    // Send the formData to Firebase
    const collectionInstance = collection(this.db, 'days');
    addDoc(collectionInstance, dataToAdd);
    // const q = query(collectionInstance, where("name", "==", "Monday"));
    const q = query(collection(this.db, "days"), where("selectedDays", "array-contains-any", ['Monday', 'Tuesday', 'Wednesday', 'Friday', 'Saturday', 'Sunday']));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      this.allDays.push(doc.data()['selectedDays'])
      console.log(doc.id, " => ", doc.data());
    });
    const flatDays = this.allDays.flat()
    this.res = Array.from(new Set(flatDays)).map(a =>
      ({name:a, y: flatDays.filter(f => f === a).length}));
      this.bestDay = this.res[0].name
      console.log(this.res)
  //   function removeDuplicates(arr: any[]) {
  //     let unique: any[] = [];
  //     arr.forEach(element => {
  //         if (!unique.includes(element)) {
  //             unique.push(element);
  //         }
  //     });
  //     return unique;
  // }
  // this.duplicateDays = removeDuplicates(flatDays)
  // let intersection =  this.duplicateDays.filter(x =>flatDays.includes(x));

  // console.log('Selected Days:', intersection);
  // console.log('Selected Days:', this.duplicateDays);
  // console.log('Selected Days:', this.allDays);
  // console.log('Selected Days:', flatDays);



    
    
    // this.db.list('/days').push(formData); // Replace 'people' with your Firebase path
    // You can add more logic here, such as clearing the form or displaying a success message.
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
  // addDays(f: any) {
  //   const collectionInstance = collection(this.firestore, 'days');
  //   addDoc(collectionInstance, f.value)
  //   .then(() => {
  //     console.log('Data Saved Successfully');
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   })
  // }

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
