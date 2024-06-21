// export type EventType = "Wedding" | "Club" | "Corporate"
export type EventType = string


// export type Location = "NYC" | "LA" | "Chicago"
export type Location = string


export interface User {
    id: number,
    name: string,
    location: Location,
    rates: number,
    eventTypes: EventType[]
    createdAt: string,
    updatedAt: string
}

export interface SearchUser {
    location: Location,
    eventType: EventType
}

export interface NewUser extends Omit<User, 'id' | 'createdAt' | 'updatedAt'> { }

export const buildAPIUrl = (route: string) => {
    return `${process.env.NEXT_PUBLIC_SERVER_URL}${route}`
}

class API {
    private buildAPIUrl(route: string): string {
        return `something`;
    }

    private async apiPost(route: string, data = {}) {
        // Default options are marked with *
        const response = await fetch(buildAPIUrl(route), {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, *same-origin, omit
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: "follow", // manual, *follow, error
            referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(data), // body data type must match "Content-Type" header
        });
        return response.json(); // parses JSON response into native JavaScript objects
    }

    private async apiFetch(route: string) {
        try {
            const res = await fetch(buildAPIUrl(route), { cache: 'no-cache' });

            if (!res.ok) {
                const errorData = await res.json()
                throw new Error(`HTTP error! ${errorData?.message ?? `Status: ${res.status}`}`);
            }

            return res.json();
        } catch (error: any) {
            throw new Error(`Failed to fetch data: ${error.message}`);
        }
    }

    async fetchAllUsers(): Promise<User[]> {
        return await this.apiFetch('/users')
    }

    async registerUser(newUser: NewUser): Promise<User> {
        return await this.apiPost('/users/register', newUser)
    }

    async searchUser(user: SearchUser) {
        const { location, eventType } = user
        return await this.apiFetch(`/users/search/${location}/${eventType}`)
    }
}

const api = new API()

export default api