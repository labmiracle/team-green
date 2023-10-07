import { DependencyLifeTime, Injectable } from "@miracledevs/paradigm-web-di";

export interface IUser {
    id?: number;
    firstName: string;
    lastName: string;
    email: string;
    passwordHash?: string;
    status?: number;
}

@Injectable({ lifeTime: DependencyLifeTime.Transient })
export class User implements IUser {
    id?: number = 0;
    firstName: string = "";
    lastName: string = "";
    email: string = "";
    passwordHash?: string = "";
    status?: number = 1;
}
