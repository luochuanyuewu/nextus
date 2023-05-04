export const useStrapi: typeof useFetch = (request, opts?) => {
    const config = useRuntimeConfig()

    return useFetch(request, { baseURL: config.public.baseURL + "/api/", ...opts })
}

export const useStrapiMedia = (url: string) => {
    const config = useRuntimeConfig()
    return config.public.baseURL + url
}