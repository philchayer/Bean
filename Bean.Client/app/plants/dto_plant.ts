interface IDTO_Plant {
    Id: number;
    Name: string;
    LatinName: string;
    Family: string;
    Binder: string;
}

export class DTO_Plant implements IDTO_Plant {
    Id = 0;
    Name = "";
    LatinName = "";
    Family = "";
    Binder = "";
}