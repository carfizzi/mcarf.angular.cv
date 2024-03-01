import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Experience } from '../../interfaces/experience';

@Injectable({
  providedIn: 'root'
})
export class ExperiencesService {

  constructor(
    private firestore: Firestore,
  ) { }

  public getAllExperiences(): Observable<Experience[]> {
    let experiencesCollection = collection(this.firestore, 'experiences');
    return collectionData(experiencesCollection) as Observable<Experience[]>;
  }
}
