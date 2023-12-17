import { Component, OnInit } from '@angular/core';
import { Petition } from 'src/app/models/petition';
import { PetitionService } from 'src/app/services/petition.service';
declare var $: any;

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
    items? : Petition[];
    count = 139;
    
    constructor(private petitonsService: PetitionService) {}

    ngOnInit() {
        this.petitonsService.getPetitions().subscribe(petitions => this.items = petitions);
        
        setInterval(() => {
            this.count += Math.floor(Math.random() * 4);
            $('#count').text(this.count);
        }, 600);
    }
}
