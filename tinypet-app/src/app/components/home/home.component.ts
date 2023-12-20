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
    count = 139;
    petitions: Petition[] = [];
    victoires: Petition[] = [];

    constructor(private petitonsService: PetitionService) {}

    ngOnInit() {
        this.petitonsService.getPetitions().subscribe(petitions =>
            this.victoires = this.petitonsService.convertEntityListToPetitions(petitions)
                .filter(petition => petition.signatureCount == petition.signatureGoal));

        this.petitonsService.getPetitions().subscribe(petitions =>
            this.petitions = this.petitonsService.convertEntityListToPetitions(petitions)
                .sort((a, b) => 0.5 - Math.random()).slice(0, 3))



        setInterval(() => {
            this.count += Math.floor(Math.random() * 4);
            $('#count').text(this.count);
        }, 600);
    }

}
