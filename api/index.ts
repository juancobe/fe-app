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

    async apiFetch(route: string) {
        const res = await fetch(buildAPIUrl(route), { cache: 'no-cache' })
        if (!res.ok) {
            // This will activate the closest `error.js` Error Boundary
            throw new Error('Failed to fetch data')
        }

        return res.json()
    }
}

const api = new API()

export default api