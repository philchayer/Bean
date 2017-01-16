import { IBaseObject } from '../shared/base';
import { Status } from '../shared/enums';

interface IBinder {
    id: number;
    description: string;
    // families: 
    status: Status;
}

export class Binder implements IBinder, IBaseObject {

    isNew = true;

    id = 0;
    description = "";
    status = Status.Enabled;
}