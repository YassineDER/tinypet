import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
    count = 139;
    victories = [2345, 532, 8711];
    
    constructor() {}

    ngOnInit() {
        setInterval(() => {
            this.count += Math.floor(Math.random() * 4);
            $('#count').text(this.count);
        }, 600);
    }
}
