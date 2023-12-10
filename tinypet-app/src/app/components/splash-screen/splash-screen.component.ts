import { Component } from '@angular/core';
import { SplashScreenStateService } from 'src/app/services/splash-screen-state.service';

@Component({
    selector: 'app-splash-screen',
    template: `
    <div *ngIf="showSplash" class="app-splash-screen" [ngStyle]="{'opacity': opacity, 'transition': splashTransition}">
        <img src="/assets/images/Logo.png" alt="logo">
    </div>`,
    styleUrl: './splash-screen.component.css',
})


export class SplashScreenComponent {
    constructor(private splashService: SplashScreenStateService) {}

    public opacity = 1;
    public splashTransition;
    public showSplash = true;
    readonly ANIMATION_DURATION = 1;

    ngOnInit() {
        // Somewhere the stop method has been invoked
        this.splashService.subscribe((res) => {
            this.hideSplashAnimation();
        });
    }

    private hideSplashAnimation() {
        // Setting the transition
        this.splashTransition = `opacity ${this.ANIMATION_DURATION}s`;
        this.opacity = 0;

        setTimeout(() => {
            // After the transition is ended the showSplash will be hided
            this.showSplash = !this.showSplash;
        }, 1000);
    }
}
