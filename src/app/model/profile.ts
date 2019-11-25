export class Profile {
    public gender: boolean;
    public age: number;
    public height: number;
    public weight: number;
    public fatPercentage: number;
    public bodyType: string;
    public activityLevel: string;

    public sleepTime: number;

    public physicalSetback: boolean;

    public objectives: number;

    public session: number;

    public experience: string;


    public mealAmount: number;

    public macroType: string;

    constructor(values: any = {}) {
        this.gender = values.boolean || true;
        this.age = values.age || 13;
        this.height = values.height || 36;
        this.weight = values.weight || 60;
        this.fatPercentage = values.fatPercentage || 2;
        this.bodyType = values.bodyType || '';
        this.activityLevel = values.activityLevel || '';

        this.sleepTime = values.sleepTime || 8;

        this.physicalSetback = values.physicalSetback || false;

        this.objectives = values.objectives || 0;

        this.session = values.session || 1;

        this.experience = values.experience || '';

        this.mealAmount = values.mealAmount || 1;
        this.macroType = values.macroType || 'Moderate';
    }

    public get getGenderString() {
        return this.gender ? 'Male' : 'Female';
    }

    public get getBodyProfile(): any {
        return {
            sex: this.gender ? 'Male' : 'Female',
            age: this.age + " yrs old",
            weight: this.weight + " lbs",
            height: this.height + " in.",
            bodyFat: this.fatPercentage + "%",
            bodyType: this.bodyType,
            activityLevel: this.activityLevel,
            goal: this.objectives + " lbs/week"
        };
    }

    public get getHeightString() {
        let firstVal = Math.trunc(this.height / 12);
        let secondVal = this.height % 12;
        return firstVal + ' ft. ' + secondVal + ' in.';
    }

    public get getTraining(): any {
        return {

        };
    }

    public get getNutrition(): any {
        return {
            mealFrequency: this.mealAmount,
            dietSelection: this.macroType
        };
    }

    public get getPhysicalSetbackString() {
        return this.physicalSetback ? 'Do' : 'Do Not';
    }

    public get getObjectivesString() {
        return (this.objectives > 0 ? 'Gain ' : 'Lose ') + this.objectives; 
    }
}
