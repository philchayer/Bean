import { IBaseObject } from '../shared/base';
import { Status } from '../shared/enums';
import { Binder } from '../binders/binder';
import { Plant } from '../plants/plant';

interface IFamily {
    id: number;
    binderId?: number;
    binder: Binder;
    name: string;
    plants: Plant[];
    status: Status;
}

export class Family implements IFamily, IBaseObject {

    isNew = true;

    id = 0;
    binderId = 0;
    binder = new Binder();
    name = "";
    plants = Plant[0];
    status = Status.Enabled;
}