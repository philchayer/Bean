interface IBaseObject {
    isNew: boolean;
}

interface IPlant {
    id: number;
    name: string;
    latinName: string;
    FamilyId: number;
    family: string;
    binder: string;
    plantingIn: Date;
    transplantOut: Date;
    directOut: Date;
    directGHSummer: Date;
    directGHWinter: Date;
    distanceBetweenPlants: number;
    distanceBetweenRows: number;
    yield: number;
    comment: string;
    coldHardy: boolean;
    quantityOnHand: number;
    CompanionPlants: Plant[],
    HarmfulPlants: Plant[],
    status: number;
}

export class Plant implements IPlant, IBaseObject {

    isNew = true;

    id = 0;
    name = "";
    latinName = "";
    FamilyId = 0;
    family = "";
    binder = "";
    plantingIn = new Date();
    transplantOut = new Date();
    directOut = new Date();
    directGHSummer = new Date();
    directGHWinter = new Date();
    distanceBetweenPlants = 0;
    distanceBetweenRows = 0;
    yield = 0;
    comment: string;
    coldHardy: boolean;
    quantityOnHand = 0;
    CompanionPlants = new Plant[0]();
    HarmfulPlants = new Plant[0]();
    status = 0;

    constructor() { }
}