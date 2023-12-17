import {Component} from '@angular/core';
import {TagService} from "../../services/tag.service";
import {Tag} from "../../models/tag";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {PetitionService} from "../../services/petition.service";
import {UserService} from "../../services/user.service";
import {SnackBarService} from "../../services/snack-bar.service";
import { MatSliderModule} from "@angular/material/slider";

declare var $: any; // jquery

@Component({
    selector: 'app-create-petition',
    templateUrl: './create-petition.component.html',
    styleUrl: './create-petition.component.css'
})

export class CreatePetitionComponent {
    public step = 1;
    public maxStep = 4;
    public tags: Tag[] = [];
    public createPetitionForm: FormGroup;
    selectedImage: File | null = null;
    public selectedTags: Tag[] = [];
    public goal: number = 50;


    constructor(private tagService: TagService, private petitionService: PetitionService,
                private userService: UserService, private builder: FormBuilder, private snack: SnackBarService) {
        this.createPetitionForm = this.builder.group({
            tags: new FormArray([], [Validators.minLength(1), Validators.required]),
            title: new FormControl('', [
                Validators.minLength(8),
                Validators.maxLength(90),
                Validators.required]),
            description: new FormControl('', [
                Validators.minLength(8),
                Validators.maxLength(600),
                Validators.required]),
            image: new FormControl('https://dummyimage.com/500x300/cccccc/fff.png&text=+'),
            creationDate: new FormControl(new Date()),
            comments: new FormControl([]),
            signatureGoal: new FormControl(50, [
                Validators.min(5),
                Validators.max(1000000),
                Validators.required]),
            signatureCount: new FormControl(0, [
                Validators.min(0),
                Validators.max(0)]),
            author: new FormControl(this.userService.actualUser, [Validators.required]),
        })
    }


    ngOnInit() {
        // onChange: (value: any) => this.createPetitionForm.get('signatureGoal')?.setValue(value)
        this.tagService.getTags().subscribe({
            next: tags => this.tags = tags,
            error: err => this.snack.alert(err.message, 3000)
        })
    }

    public onCheckChange(event) {
        // add or remove tag from selectedTags variable
        if (event.target.checked)
            this.selectedTags.push(event.target.value)
        else {
            let i: number = 0;
            this.selectedTags.forEach((item) => {
                if (item == event.target.value) {
                    this.selectedTags.splice(i, 1)
                    return;
                }
                i++;
            })
        }
        // sync selectedTags with formTags
        this.formTags.clear()
        this.selectedTags.forEach(tag => this.formTags.push(new FormControl(tag)))
    }


    public createPetition() {
        if (this.createPetitionForm.valid && !this.noTagSelected())
            this.snack.alert("Fonctionnalité en cours de développement", 3000)

        // this.uploadImage();
        // if (this.createPetitionForm.valid && !this.noTagSelected()) {
            // this.petitionService.createPetition(petitionData).subscribe({
            //     next: petition => console.log(petition),
            //     error: err => console.log(err)
            // })
        // }
        else this.snack.alert("Formulaire invalide. Veuillez vérifier les champs.", 3000)
    }

    public get formTags(): FormArray {
        return this.createPetitionForm.get('tags') as FormArray;
    }
    public get title() {
        return this.createPetitionForm.get('title');
    }
    public get description() {
        return this.createPetitionForm.get('description');
    }
    public get signatureGoal() {
        return this.createPetitionForm.get('signatureGoal');
    }
    public get author() {
        return this.createPetitionForm.get('author');
    }


    public onImageSelected($event: any) {
        this.selectedImage = ($event.target as HTMLInputElement).files![0];
    }

    uploadImage() {
        if (this.selectedImage) {
            const fd = new FormData();
            fd.append('image', this.selectedImage, this.selectedImage.name);

            this.petitionService.uploadImage(fd).subscribe({
                // next: res => this.createPetitionForm.get('image')?.setValue(res),
                next: res => console.log(res),
                error: err => console.error(err.message)
            })
        } else this.snack.alert("No image selected", 3000)
    }

    public nextStep() {
        if (this.step < this.maxStep)
            this.step++;
    }
    public prevStep() {
        if (this.step > 1)
            this.step--;
    }

    public noTagSelected() {
        return this.selectedTags.length == 0;
    }
}
