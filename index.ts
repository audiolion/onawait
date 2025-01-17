type AsyncAction = Promise<any> | ((...args: any[]) => Promise<AsyncResult>);

type AsyncResult = {
  error?: any;
  response?: any;
};

export const onawait = (action: AsyncAction): Promise<AsyncResult> => {
  return new Promise(async resolve => {
    try {
      const response = await action;

      const isAsyncResponse: boolean =
        response.response !== undefined || response.error !== undefined;

      const asyncResponse = isAsyncResponse ? response : { response };

      return resolve(asyncResponse);
    } catch (error) {
      const isAsyncError: boolean =
        error.error !== undefined || error.error !== undefined;

      const asyncError = isAsyncError ? error : { error };

      return resolve(asyncError);
    }
  });
};

export default onawait;
