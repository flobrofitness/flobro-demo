import { Component, ɵConsole, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Options } from 'ng5-slider';
import { Profile } from './model/profile';

import { HttpClient, HttpHeaders, HttpResponse, HttpParams } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
    title = 'flobro-demo';
    public capi: boolean = true;

    value: number = 100;
    options: Options = {
        floor: 0,
        ceil: 200
    };

    profile = new Profile();

    ageOptions: Options = {
        floor: 13,
        ceil: 90
    }

    heightOptions: Options = {
        floor: 36,
        ceil: 95
    }

    weightOptions: Options = {
        floor: 60,
        ceil: 400
    }

    fatPercentageOptions: Options = {
        floor: 2,
        ceil: 39
    }

    public bodyTypes: any[] = [
        { type: 'Ectomorph', selected: true },
        { type: 'Endomorph', selected: false },
        { type: 'Mesomorph', selected: false }
    ];


    public activityTypes: any[] = [
        { type: 'Sedantary', description: 'Little to no exercise/ desk job', selected: true },
        { type: 'Lightly Active', description: 'Light exercise: sports 1-3 days per week/ server, nurse', selected: false },
        { type: 'Moderately Active', description: 'Moderate exercise: sports 3-5 days per week/ usher, host', selected: false },
        { type: 'Very Active', description: 'Heavy exercise: sports 6-7 days per week/ mostly physical: farmer, construction', selected: false },
        { type: 'Extremely Active', description: 'Very heavy exercise: sports, training 2x/day, mostly physical: farmer, construction', selected: false },
    ];

    public sleepTimeOptions: Options = {
        floor: 2,
        ceil: 16
    }

    public setbackTypes: any[] = [
        { type: 'Head & Neck ', description: 'Head & Neck  Face, Forehead, Cheek, Chin, Eye, Nose, Mouth, Lips, Ear, Jaw, Mandible, Occiput, Scalp, Temple, Adam\'s apple, Throat, Nape', selected: false },
        { type: 'Arm', description: 'Shoulder, Axilla, Brachium, Elbow, Forearm, Wrist Hand, Finger: Thumb, Index, Middle, Ring, Little', selected: false },
        { type: 'Torso', description: 'Abdomen, Waist, Midriff, Navel, Back, Thorax, Breast, Pelvis, Sex organs', selected: false },
        { type: 'Leg', description: 'Buttocks, Hip, Thigh, Knee, Calf, Foot: Ankle, Heel, Toe, Sole', selected: false }
    ];

    public objectiveOptions: Options = {
        floor: -4,
        ceil: 4,
        vertical: true
    }

    public frequencyOptions: Options = {
        floor: 1,
        ceil: 6
    }

    public frequency: any = {
        days: 1,
        sessions: 1
    }
    public frequencyTypes: any[] = [
        { type: 'Day 1', selected: true, multipleDays: false, sessions: 1 },
        { type: 'Day 2', selected: false, multipleDays: false, sessions: 1 },
        { type: 'Day 3', selected: false, multipleDays: false, sessions: 1 },
        { type: 'Day 4', selected: false, multipleDays: false, sessions: 1 },
        { type: 'Day 5', selected: false, multipleDays: false, sessions: 1 },
        { type: 'Day 6', selected: false, multipleDays: false, sessions: 1 }
    ]


    public levelTypes: any[] = [
        { type: 'Beginner Novice, little to no exercise experience, less than 1 yr', shortDec: 'Beginner', selected: true },
        { type: 'Intermediate Proficient & skilled in exercise practices, 2-4 yrs experience', shortDec: 'Intermediate', selected: false },
        { type: 'Advance Seasoned, well-skilled in exercise practices, +5 yrs experience', shortDec: 'Advance', selected: false }
    ]

    public goalTypes: any[] = [
        { type: 'Calves', muscularity: false, strength: false, imgNames: ['muscles-19.jpg'] },
        { type: 'Quadriceps', muscularity: false, strength: false, imgNames: ['muscles-18.jpg'] },
        { type: 'Hamstrings', muscularity: false, strength: false, imgNames: ['muscles-15.jpg'] },
        { type: 'Back', muscularity: false, strength: false, imgNames: ['muscles-03.jpg', 'muscles-04.jpg'] },
        { type: 'Trapezius', muscularity: false, strength: false, imgNames: ['muscles-06.jpg'] },
        { type: 'Chest', muscularity: false, strength: false, imgNames: ['muscles-01.jpg', 'muscles-02.jpg'] },
        { type: 'Deltoids', muscularity: false, strength: false, imgNames: ['muscles-06.jpg', 'muscles-07.jpg', 'muscles-08.jpg'] },
        { type: 'Triceps', muscularity: false, strength: false, imgNames: ['muscles-11.jpg'] },
        { type: 'Biceps', muscularity: false, strength: false, imgNames: ['muscles-09.jpg'] },
        { type: 'Forearms', muscularity: false, strength: false, imgNames: ['muscles-10.jpg'] },
        { type: 'Glutes', muscularity: false, strength: false, imgNames: ['muscles-14.jpg'] },
        { type: 'Abductors', muscularity: false, strength: false, imgNames: ['muscles-17.jpg'] },
        { type: 'Adductors', muscularity: false, strength: false, imgNames: ['muscles-16.jpg'] }
    ]

    public mucleWeakneses: boolean = false;

    public mucleOptions: Options = {
        floor: 1,
        ceil: 1
    }

    public muscleTypes: any[] = [
        {
            type: 'Deltoids', description: 'Front Delts, Side Delts, Rear Delts', selected: false,
            subitems: [
                { subtype: 'Front Delts', sessions: 0 },
                { subtype: 'Side Delts', sessions: 0 },
                { subtype: 'Rear Delts', sessions: 0 }
            ]
        },
        {
            type: 'Chest', description: 'Upper, Lower', selected: false,
            subitems: [
                { subtype: 'Upper', sessions: 0 },
                { subtype: 'Lower', sessions: 0 }
            ]
        },
        {
            type: 'Back', description: 'Trapezius, Middle Back, Lats, Lower Back', selected: false,
            subitems: [
                { subtype: 'Trapezius', sessions: 0 },
                { subtype: 'Middle Back', sessions: 0 },
                { subtype: 'Lats', sessions: 0 },
                { subtype: 'Lower Back', sessions: 0 }
            ]
        },
        {
            type: 'Arm', description: 'Triceps, Biceps, Forearms', selected: false,
            subitems: [
                { subtype: 'Triceps', sessions: 0 },
                { subtype: 'Biceps', sessions: 0 },
                { subtype: 'Forearms', sessions: 0 }
            ]
        },
        {
            type: 'Core', description: 'Abdominals, Obliques', selected: false,
            subitems: [
                { subtype: 'Abdominals', sessions: 0 },
                { subtype: 'Obliques', sessions: 0 }
            ]
        },
        {
            type: 'Leg', description: 'Glutes, Hamstrings, Abductors, Quadriceps, Adductors, Calves', selected: false,
            subitems: [
                { subtype: 'Glutes', sessions: 0 },
                { subtype: 'Hamstrings', sessions: 0 },
                { subtype: 'Abductors', sessions: 0 },
                { subtype: 'Quadriceps', sessions: 0 },
                { subtype: 'Adductors', sessions: 0 },
                { subtype: 'Calves', sessions: 0 }
            ]
        }
    ]

    public trainingTypes: any[] = [
        { type: 'Barbell', selected: false, readOnly: false },
        { type: 'Dumbbell', selected: false, readOnly: false },
        { type: 'Kettlebell', selected: false, readOnly: false },
        { type: 'Cable', selected: false, readOnly: false },
        { type: 'Machine', selected: false, readOnly: false },
        { type: 'Bands', selected: false, readOnly: false },
        { type: 'Bodyweight', selected: true, readOnly: true }
    ]

    public mealOptions: Options = {
        floor: 0,
        ceil: 6
    }

    public macroTypes: any[] = [
        { type: 'Moderate', selected: true, imgSrc: 'assets/img/foods/moderate_diet.jpg' },
        { type: 'Moderate II', selected: false, imgSrc: 'assets/img/foods/moderate_II_diet.jpeg' },
        { type: 'Ketogenic', selected: false, imgSrc: 'assets/img/foods/ketogenic_diet.jpg' },
        { type: 'Low Fat', selected: false, imgSrc: 'assets/img/foods/low_fat_diet.jpeg' },
        { type: 'Anabolic', selected: false, imgSrc: 'assets/img/foods/anabolic_diet.png' },
        { type: 'Low Carb', selected: false, imgSrc: 'assets/img/foods/low_carb_diet.jpeg' },
        { type: 'Zone', selected: false, imgSrc: 'assets/img/foods/zone_diet.jpg' },
        { type: '5 Day Diet', selected: false, imgSrc: 'assets/img/foods/5_day_diet.jpg' }
    ]

    public profileSection: boolean = true;
    public trainingSection: boolean = false;
    public nutritionSection: boolean = false;
    public confirmSection: boolean = false;

    public images = [700, 533, 807, 124].map((n) => `https://picsum.photos/id/${n}/900/500`);

    public custInfoForm: FormGroup;

    constructor(
        private httpClient: HttpClient,
        private config: NgbCarouselConfig) {
        config.interval = 10000;
        config.wrap = true;
        config.keyboard = false;
        config.pauseOnHover = true;
    }

    ngOnInit() {
        this.setupForm();
    }

    public onGenderToggle(gender: boolean) {
        this.profile.gender = gender;
    }

    public onPhysicalSetBackToggle(hasSetback: boolean) {
        this.profile.physicalSetback = hasSetback;
    }

    public setupForm() {
        this.custInfoForm = new FormGroup({
            firstName: new FormControl(''),
            lastName: new FormControl(''),
            email: new FormControl('', [
                Validators.required,
                Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.+-]+\\.[a-zA-Z]{2,15}$')
            ]),
            terms: new FormControl(false, Validators.requiredTrue),
        });
    }

    public isFormInvalid(field: string) {
        return (this.custInfoForm.get(field).invalid && this.custInfoForm.get(field).touched);
    }

    public onSelect(index: number, type: string) {
        switch (type) {
            case 'TYPE':
                const body = this.bodyTypes.find((body) => (body.selected));
                body.selected = false;

                this.profile.bodyType = this.bodyTypes[index].type;
                this.bodyTypes[index].selected = true;
                break;
            case 'ACTIVITY':
                const activity = this.activityTypes.find((type) => (type.selected));
                activity.selected = false;

                this.profile.activityLevel = this.activityTypes[index].type;
                this.activityTypes[index].selected = true;
                break;
            case 'SETBACK':
                this.setbackTypes[index].selected = !this.setbackTypes[index].selected
                break;
            case 'LEVEL':
                const level = this.levelTypes.find((type) => (type.selected));
                level.selected = false;

                this.levelTypes[index].selected = true;
                break;
            case 'GOAL_M':
                this.goalTypes[index].muscularity = !this.goalTypes[index].muscularity;
                break;
            case 'GOAL_S':
                this.goalTypes[index].strength = !this.goalTypes[index].strength
                break;
            case 'MUSCLE':
                this.muscleTypes[index].selected = !this.muscleTypes[index].selected
                break;
            case 'FREQUENCY':
                const freq = this.frequencyTypes[index].multipleDays
                this.frequencyTypes[index].multipleDays = !freq
                this.frequencyTypes[index].sessions = !freq ? 2 : 1;

                let tempAmount = 0;
                for (let i = 0; i < this.frequencyTypes.length; i++) {
                    if (this.frequencyTypes[i].selected) {
                        tempAmount += this.frequencyTypes[i].sessions
                    }
                }

                this.frequency.sessions = tempAmount;
                this.mucleOptions.ceil = tempAmount;
                this.mucleOptions = { ...this.mucleOptions };
                break;
            case 'TRAINING':
                this.trainingTypes[index].selected = this.trainingTypes[index].readOnly ? true : !this.trainingTypes[index].selected;
                break;
            case 'MACRO':
                const macro = this.macroTypes.find((type) => (type.selected));
                macro.selected = false;

                this.profile.macroType = this.macroTypes[index].type;
                this.macroTypes[index].selected = true;
                break;
            default:
        }
    }

    public handleUserChange(type: string) {
        switch (type) {
            case 'FREQUENCY':
                this.frequencyTypes.forEach((type) => {
                    type.selected = false;
                    // type.multipleDays = false;
                })
                let tempAmount = 0;
                for (let i = 0; i < this.frequency.days; i++) {
                    this.frequencyTypes[i].selected = true;
                    if (this.frequencyTypes[i].selected) {
                        tempAmount += this.frequencyTypes[i].sessions
                    }
                }

                this.frequency.sessions = tempAmount;
                this.mucleOptions.ceil = tempAmount;
                this.mucleOptions = { ...this.mucleOptions };

                break;
            default:
        }
    }

    public onToggled() {
        this.mucleWeakneses = !this.mucleWeakneses;
    }

    public submitEmail() {
        let url = `https://us-central1-flobro-demo.cloudfunctions.net/emailMessage`
        let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });

        const body = this.createEmailBody();

        this.httpClient.post(url, body, { headers })
            .toPromise()
            .then((res) => {
                window.location.href = "http://flobrofitness.com/";
                console.log('Successfully submitted');
            }).catch((err) => {
                console.log(err);
            })
    }

    public createEmailBody() {
        return {
            customerProfile: {
                name: this.custInfoForm.get('firstName').value,
                lastName: this.custInfoForm.get('lastName').value,
                email: this.custInfoForm.get('email').value
            },
            bodyProfile: this.profile.getBodyProfile,
            training: {
                skill: this.getSkill,
                calves: this.getGoalTypeByIndex(0),
                quadriceps: this.getGoalTypeByIndex(1),
                hamstring: this.getGoalTypeByIndex(2),
                back: this.getGoalTypeByIndex(3),
                trapezius: this.getGoalTypeByIndex(4),
                chest: this.getGoalTypeByIndex(5),
                deltoids: this.getGoalTypeByIndex(6),
                triceps: this.getGoalTypeByIndex(7),
                biceps: this.getGoalTypeByIndex(8),
                forearms: this.getGoalTypeByIndex(9),
                glutes: this.getGoalTypeByIndex(10),
                abductors: this.getGoalTypeByIndex(11),
                adductors: this.getGoalTypeByIndex(12),
                days: this.getDaysFrequency(),
                problematicAreas: this.getProblematicAreas(),
                trainingStyles: this.trainingTypes.filter((t) => (t.selected)).map((t) => ({ name: t.type }))
            },
            nutrition: this.profile.getNutrition
        };
    }

    public get getSkill(): string {
        const level = this.levelTypes.find((l) => (l.selected));
        return level.shortDec
    }

    public getGoalTypeByIndex(index: number) {
        let goal = this.goalTypes[index].muscularity ? 'Shape/Tone' : 'Build Mass';
        goal = goal + ' & Increase ' + (this.goalTypes[index].strength ? 'Endurance' : 'Strength');
        return goal;
    }

    public getProblematicAreas() {
        let value = [];
        const areas = this.muscleTypes.filter((t) => (t.selected))
        areas.forEach((a) => {
            a.subitems.forEach((s) => {
                value.push({
                    name: s.subtype + ' ' + a.type,
                    value: s.sessions
                });
            });
        });
        return value;
    }

    public getDaysFrequency() {
        return this.frequencyTypes.filter((f) => (f.selected)).map((f) => ({
            name: f.type,
            value: f.sessions + ' Sessions'
        }));
    }

    public profileSectionComplete() {
        this.trainingSection = true;

        setTimeout(() => {
            document.getElementById('trainingSection').scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 1000);
    }

    public trainingSectionComplete() {
        this.nutritionSection = true;

        setTimeout(() => {
            document.getElementById('nutritionSection').scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 1000);
    }

    public nutritionSectionComplete() {
        this.confirmSection = true;

        setTimeout(() => {
            document.getElementById('confirmSection').scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 1000);
    }



    // getter

    public get getBodyTypeString() {
        const body = this.bodyTypes.find((body) => (body.selected));
        return body.type;
    }

    public get getActivityTypeString() {
        const body = this.activityTypes.find((body) => (body.selected));
        return body.type;
    }

    public get getTraningStylesString() {
        return this.trainingTypes.filter((t) => (t.selected)).map((t) => (t.type)).join(', ');
    }

    public get getMucleWeaknesesString() {
        return this.mucleWeakneses ? 'Do' : 'Do Not';
    }
}
