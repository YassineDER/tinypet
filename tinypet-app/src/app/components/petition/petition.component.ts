import {Component, isDevMode, OnInit} from '@angular/core';
import {Petition} from "../../models/petition";
import {ActivatedRoute, Router} from "@angular/router";
import {PetitionService} from "../../services/petition.service";
import {SnackBarService} from "../../services/snack-bar.service";
import {PETITIONS} from "../../../assets/mocks/petitions.mock";
import {User} from "../../models/user";
import {UserService} from "../../services/user.service";

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
                public userService: UserService,
                private petitionService: PetitionService) {
    }

    ngOnInit() {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.petitionService.getPetitionById(id).subscribe({
                next: (pet) => {
                    if (pet)
                        this.pet = this.petitionService.convertEntityToPetition(pet)
                    else this.router.navigateByUrl('/')
                        .then(() => this.snack.alert('Petition not found', 3000))
                    },
                error: (err) => this.router.navigateByUrl('/').then(() => console.error(err))
            })
        } else this.router.navigateByUrl('/')
                .then(() => this.snack.alert('Invalid petition id', 3000))

    }

    formatDate(date: Date | undefined) {
        return new Date(date!!).toLocaleDateString();
    }


    signPet(pet: Petition | undefined) {
        if (pet?.author === this.userService.actualUser?.name) {
            return this.snack.alert('You cannot sign your own petition', 3000);
        }
        this.snack.alert('Fonctionnalité en cours de développement', 2000);
        // if (pet && this.userService.actualUser && !isDevMode()) {
        //     this.petitionService.updatePetition(pet.id, this.userService.actualUser.id).subscribe({
        //         next: (user) => {
        //             try {
        //                 this.userService.actualUser!!.signedPetitions.push(pet);
        //                 this.userService.updateUser(this.userService.actualUser!!);
        //                 this.snack.alert('Petition signed', 3000);
        //             } catch (e) {
        //                 console.error(e);
        //             }
        //         },
        //         error: (err) => this.snack.alert('Error signing petition', 3000)
        //     })
        // }
    }
}
