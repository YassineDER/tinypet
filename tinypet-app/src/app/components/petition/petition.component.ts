import {Component, OnInit} from '@angular/core';
import {Petition} from "../../models/petition";
import {ActivatedRoute, Router} from "@angular/router";
import {PetitionService} from "../../services/petition.service";
import {SnackBarService} from "../../services/snack-bar.service";

@Component({
  selector: 'app-petition',
  templateUrl: './petition.component.html',
  styleUrl: './petition.component.css'
})
export class PetitionComponent implements OnInit{
    pet? : Petition;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private snack: SnackBarService,
                private petitionService: PetitionService) {
    }

    ngOnInit() {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.petitionService.getPetitionById(id).subscribe({
                next: (pet) => this.pet = pet,
                error: (err) => this.router.navigateByUrl('/')
                    .then(() => this.snack.alert('Petition not found', 3000))
            })
        } else this.router.navigateByUrl('/')
                .then(() => this.snack.alert('Invalid petition id', 3000))

    }


}
