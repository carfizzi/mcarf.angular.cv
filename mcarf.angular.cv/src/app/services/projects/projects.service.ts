import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Project } from '../../interfaces/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  constructor(
    private firestore: Firestore,
  ) { }

  public getAllProjects(): Observable<Project[]> {
    let projectCollection = collection(this.firestore, 'projects');
    return collectionData(projectCollection) as Observable<Project[]>;
  }
}
