import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ProjectsService } from '../../../services/projects/projects.service';
import { Observable } from 'rxjs';
import { Project } from '../../../interfaces/project';
import { Experience } from '../../../interfaces/experience';
import { ExperiencesService } from '../../../services/experiences/experiences.service';
import { ExperienceSortPipe } from "../../../pipes/experience-sort.pipe";


@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        CommonModule,
        ExperienceSortPipe
    ]
})
export class HomeComponent implements OnInit {
    public projects$: Observable<Project[]> = new Observable<Project[]>();
    public experiences$: Observable<Experience[]> = new Observable<Experience[]>();

    constructor(
        private projectsService: ProjectsService,
        private experienceService: ExperiencesService,
    ) { }

    ngOnInit(): void {
        this.projects$ = this.projectsService.getAllProjects();
        this.experiences$ = this.experienceService.getAllExperiences();
    }
 }
