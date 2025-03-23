export type MiddlewareResponse = {
  pass: boolean;
  message?: string;
  status?: number;
  data?: any;
  passedData?: any[];
};

interface HandleMiddlewareProps {
  middleware: ((
    data?: any,
    passedData?: any[]
  ) => Promise<MiddlewareResponse>)[];
  data?: any;
}

export async function handleMiddleware({
  middleware,
  data,
}: HandleMiddlewareProps): Promise<MiddlewareResponse> {
  const passedData = [];

  /*
    Middleware is an array of functions that will be executed in order.

    Params:
    - data?: The data that will be passed to the middleware functions
    - passedData?: The data that will be passed to the next middleware function

    Retuns:
    - pass: Whether the middleware passed or not
    - data: The data that will be passed to the next middleware function
      data is an array of data that will be passed to the next middleware function

    - message: The message that will be returned if the middleware did not pass
    - status: The status code that will be returned if the middleware did not pass

    Data is passed to the middleware function for the middleware to use.
  */

  for (const callback of middleware) {
    const response: any = await callback(data, passedData);

    if (!response.pass) {
      return response;
    }

    if (response.data) {
      passedData.push(response.data);
    }
  }

  return { pass: true, passedData: passedData };
}
