import {IEventUser} from "@/app/types/IEventUser";

export interface IEvent {
    id: number;
    name: string;
    users: IEventUser[]
}