import { Component, inject } from '@angular/core';
import { Firestore, addDoc, collection, getDocs, query, where } from '@angular/fire/firestore';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { SharedService } from '../shared.service';
import { Router } from '@angular/router';
interface Days {
  description: string,
  name: string
};
@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})

export class LandingPageComponent {
  title = 'Practice-Hosting';
  // constructor(private service:SharedService){}
  // day$: Observable<Days[]>;
  firestore: Firestore = inject(Firestore);
  form: FormGroup;
  submitButtonDisabled = true;
  allDays: any[] = [];
  duplicateDays : any[] = [];
  result : any[] = [];
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
  }
// formEvent: FormGroup;
// constructor(private router: Router, private service:SharedService, private fb: FormBuilder, private db: Firestore) {
//   this.formEvent = this.fb.group({
//     name: [''], // Text input for the name
//     })

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
  this.form.reset();
  this.getBestDays()
  // const q = query(collectionInstance, where("name", "==", "Monday"));
  // const q = query(collection(this.db, "days"), where("selectedDays", "array-contains-any", ['Monday', 'Tuesday', 'Wednesday', 'Friday', 'Saturday', 'Sunday']));

  // const querySnapshot = await getDocs(q);
  // querySnapshot.forEach((doc) => {
  //   // doc.data() is never undefined for query doc snapshots
  //   this.allDays.push(doc.data()['selectedDays'])
  //   console.log(doc.id, " => ", doc.data());
  // });
  // const flatDays = this.allDays.flat()
  // this.res = Array.from(new Set(flatDays)).map(a =>
  //   ({name:a, y: flatDays.filter(f => f === a).length}));
  //   this.bestDay = this.res[0].name
  //   console.log(this.res)
}

days:any=[] as Observable<Days>[];
async getBestDays(){
  const q = query(collection(this.db, "days"), where("selectedDays", "array-contains-any", ['Monday', 'Tuesday', 'Wednesday', 'Friday', 'Saturday', 'Sunday']));

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    this.allDays.push(doc.data()['selectedDays'])
    console.log(doc.id, " => ", doc.data());
  });
  const flatDays = this.allDays.flat()
  this.result = Array.from(new Set(flatDays)).map(a =>
    ({name:a, y: flatDays.filter(f => f === a).length}));
    this.bestDay = this.result[0].name
    this.result = this.result.sort((a, b) => b.y - a.y)
    console.log(this.result.sort((a, b) => b.y - a.y));
    return this.result;
}

refreshDays(){
  this.service.getDays().subscribe((res) => {
  this.days = res;
  })
}
ngOnInit(){
  this.refreshDays();
  this.getBestDays();
}
deleteDays(id:string){
  this.service.deleteDay(id).then((res) => {
    console.log(res);
    this.refreshDays();
  })
}
};

// navigateToMainApplication() {
//   this.router.navigate(['/main']);
// }
// async onSubmit() {
//   console.log("Enter")
//   this.navigateToMainApplication();
// }
// }

