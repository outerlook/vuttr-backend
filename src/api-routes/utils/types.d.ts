export type BaseRequest = {
  query?: {[key: string]: any} | undefined,
  headers?: {[key: string]: any},
  body?: {[key: string]: any},
  params?: {[key: string]: any}
}

// FIXME: not a good name
export type DefinedRequest<T extends BaseRequest> = T
type BaseResponse = {
  status: number,
  body?: {[key: string]: any}
}

// FIXME: not a good name
export type DefinedResponse<T extends BaseResponse> = T

export type BaseHandler = (request: DefinedRequest<BaseRequest>) => Promise<DefinedResponse<BaseResponse>>