import { Component } from '@angular/core';
import {TagService} from "../../services/tag.service";
import {Tag} from "../../models/tag";
import {Petition} from "../../models/petition";
import {PetitionService} from "../../services/petition.service";
declare var $: any;

@Component({
  selector: 'app-petitions-list',
  templateUrl: './petitions-list.component.html',
  styleUrl: './petitions-list.component.css'
})
export class PetitionsListComponent {
    tags? : Tag[];
    petitions : Petition[] = [];

    constructor(private tagService: TagService,
                private petitionService: PetitionService
    ) { }

    ngOnInit() {
        this.tagService.getTags().subscribe(tags => this.tags = tags)
        this.petitionService.getPetitions().subscribe(petitions =>
            this.petitions = this.petitionService
                .convertEntityListToPetitions(petitions)
                .filter(petition => petition.signatureCount < petition.signatureGoal))


        $('.clearable.ui.selection.dropdown.multiple').dropdown({ clearable: true})
        $('.ui.inline.dropdown').dropdown();
    }

    applyFilters() {

    }
}


