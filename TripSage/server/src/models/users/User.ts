import { DependencyLifeTime, Injectable } from "@miracledevs/paradigm-web-di";

export interface IUser {
    id?: number;
    email: string;
    password?: string;
    name: string;
    last_name: string;
    status?: number;
}

@Injectable({ lifeTime: DependencyLifeTime.Transient })
export class User implements IUser {
    id?: number = 0;
    email: string = "";
    password?: string = "";
    name: string = "";
    last_name: string = "";
    status?: number = 1;
}
