import { IBaseObject } from '../shared/base';
import { Status } from '../shared/enums';

interface IPlant {
    id: number;
    name: string;
    latinName: string;
    familyId: number;
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
    companionPlants: Plant[],
    harmfulPlants: Plant[],
    status: Status;
}

export class Plant implements IPlant, IBaseObject {

    isNew = true;

    id = 0;
    name = "";
    latinName = "";
    familyId = 0;
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
    companionPlants = new Plant[0]();
    harmfulPlants = new Plant[0]();
    status = Status.Enabled;

    constructor() { }
}