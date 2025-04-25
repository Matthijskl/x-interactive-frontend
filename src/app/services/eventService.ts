import {IEvent} from "@/app/types/IEvent";
import {environment} from "@/lib/environment";
import {IAddUserForm} from "@/app/types/IAddUserForm";

export const getEvents = async (): Promise<IEvent[]> => {
    const response: Response = await fetch(environment.apiUrl + "/events");

    if (!response.ok) {
        throw new Error("Failed to retrieve events");
    }

    return await response.json();
}

export const addUser = async (eventId: number, data: IAddUserForm): Promise<IEvent> => {
    const response: Response = await fetch(environment.apiUrl + `/events/add-user/${eventId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        throw new Error("Failed to add user");
    }

    return response.json();
}