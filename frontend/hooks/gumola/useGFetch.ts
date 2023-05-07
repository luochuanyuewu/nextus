export const useStrapi: typeof fetch = (request, opts?) => {
    const config = process.env.NEXT_PUBLIC_BACKEND_URL

    return fetch(request, {...opts})
}