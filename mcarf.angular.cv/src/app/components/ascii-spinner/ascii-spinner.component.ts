import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Spinner } from '../../models/spinner';
import { interval } from 'rxjs';

@Component({
    selector: 'app-ascii-spinner',
    standalone: true,
    imports: [
        CommonModule,
    ],
    templateUrl: './ascii-spinner.component.html',
    styleUrl: './ascii-spinner.component.css',
    changeDetection: ChangeDetectionStrategy.Default,
})
export class AsciiSpinnerComponent implements OnInit { 
    private readonly dotsSpinner = new Spinner("dots", 80, ["⠋","⠙","⠹","⠸","⠼","⠴","⠦","⠧","⠇","⠏"]);
    private interval = interval(this.dotsSpinner.interval);

    public currentFrame: string = this.dotsSpinner.frames[0];

    constructor() {}

    ngOnInit(): void {
        // Move animation for each tick as defined in the interval observable
        this.interval.subscribe({
            next: (value) => {
            this.currentFrame = this.dotsSpinner.frames[value % this.dotsSpinner.frames.length];  
            }
        });
    }
}
