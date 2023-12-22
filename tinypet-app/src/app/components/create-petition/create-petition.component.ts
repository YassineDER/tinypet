import {Component, isDevMode} from '@angular/core';
import {TagService} from "../../services/tag.service";
import {Tag} from "../../models/tag";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {PetitionService} from "../../services/petition.service";
import {UserService} from "../../services/user.service";
import {SnackBarService} from "../../services/snack-bar.service";
import {Router} from "@angular/router";

declare var $: any; // jquery

@Component({
    selector: 'app-create-petition',
    templateUrl: './create-petition.component.html',
    styleUrl: './create-petition.component.css'
})

export class CreatePetitionComponent {
    step = 1;
    tags: Tag[] = [];
    addingPetition: boolean = false;
    createPetitionForm: FormGroup;
    selectedImage?: File;
    imagePreview?: string;
    selectedTags: Tag[] = [];
    goal: number = 50;


    constructor(private tagService: TagService, private petitionService: PetitionService, private router : Router,
                private userService: UserService, private builder: FormBuilder, private snack: SnackBarService) {
        this.createPetitionForm = this.builder.group({
            id: new FormControl(Math.floor(Math.random() * 1000000), [Validators.required]),
            tags: new FormArray([], [Validators.minLength(1), Validators.required]),
            title: new FormControl('', [
                Validators.minLength(8),
                Validators.maxLength(40),
                Validators.required]),
            description: new FormControl('', [
                Validators.minLength(8),
                Validators.maxLength(600),
                Validators.required]),
            image: new FormControl('https://dummyimage.com/500x300/cccccc/fff.png&text=Image+non+disponible', [Validators.required]),
            creationDate: new FormControl(new Date()),
            signatureGoal: new FormControl(50, [
                Validators.min(5),
                Validators.max(1000000),
                Validators.required]),
            signatureCount: new FormControl(1, [
                Validators.min(1)]),
            author: new FormControl(this.userService.actualUser?.name, [Validators.required]),
        })
    }


    ngOnInit() {
        this.tagService.getTags().subscribe({
            next: tags => this.tags = tags,
            error: err => this.snack.alert(err.message, 3000)
        })

        document.addEventListener('keydown', (event) => {
            const key = event.key;
            const digit = parseInt(key, 10); // Attempt to parse the key as a digit
            if (!isNaN(digit) && digit >= 1 && digit <= 4 && isDevMode())
                this.step = digit
        })
    }

    public onCheckChange(event) {
        // add or remove tag from selectedTags variable
        if (event.target.checked) {
            this.selectedTags.push({ name: event.target.value });
        } else {
            const index = this.selectedTags.findIndex(tag => tag.name === event.target.value);
            if (index !== -1)
                this.selectedTags.splice(index, 1);
        }

        // sync selectedTags with formTags
        this.formTags.clear();
        this.selectedTags.forEach(tag => this.formTags.push(new FormControl(tag)));
    }


    public createPetition() {
        let petitionData = this.createPetitionForm.value
        if (this.createPetitionForm.valid && !this.noTagSelected()) {
            this.addingPetition = true;
            this.petitionService.createPetition(petitionData).subscribe({
                next: petition => this.router.navigateByUrl('/mypetitions'),
                error: err => {
                    this.snack.alert(err.message, 3000)
                    this.addingPetition = false;
                }
            })
        }
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


    public onImageSelected(event: any) {
        this.selectedImage = event.target.files[0];
        if (!this.selectedImage) return;
        const reader = new FileReader();
        reader.readAsDataURL(this.selectedImage);
        reader.onload = () => {
            this.createPetitionForm.patchValue({image: reader.result})
            this.imagePreview = reader.result as string;
        }
    }

    public nextStep() {
        if (this.step < 4)
            this.step++;
    }
    public prevStep() {
        if (this.step > 1)
            this.step--;
    }

    public noTagSelected() {
        return this.selectedTags.length == 0;
    }

    test() {
        console.log(this.createPetitionForm.value)
    }
}
