import { ParameterizedContext, Request } from 'koa'

type StrapiExtendedRequest = Request & { body?: any }

declare module 'koa' {
    interface Context extends ParameterizedContext {
        request: StrapiExtendedRequest
    }
}
