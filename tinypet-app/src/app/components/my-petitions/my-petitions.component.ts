import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {User} from "../../models/user";
import {Petition} from "../../models/petition";
import {SnackBarService} from "../../services/snack-bar.service";
import {PetitionService} from "../../services/petition.service";
declare var $: any;

@Component({
  selector: 'app-my-petitions',
  templateUrl: './my-petitions.component.html',
  styleUrl: './my-petitions.component.css'
})
export class MyPetitionsComponent implements OnInit {
    user? :User;
    tab = 1;
    myPetitions?: Petition[];
    signedPetitions?: Petition[];

    constructor(private userService: UserService, private snack: SnackBarService,
                private petService: PetitionService) { }

    ngOnInit() {
        this.user = this.userService.actualUser;
        this.petService.getPetitions().subscribe(petitions =>
            this.myPetitions = this.petService.convertEntityListToPetitions(petitions))


    }

    test() {
      console.log(this.myPetitions);
    }

    formatDate(date: Date) {
        return date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
    }

}
