export interface UseCase<IRequest, IResponse> {
  identify(request?: IRequest): Promise<IResponse> | IResponse;
}
