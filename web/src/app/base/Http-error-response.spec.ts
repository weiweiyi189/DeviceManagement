// import {ErrorMessage} from '../common/error-message';
import {HttpErrorResponse} from './Http-error-response';

describe('HttpErrorResponse', () => {
  it('construct', () => {
    const httpErrorResponse = new HttpErrorResponse({
      error: {message: 'test'}
    });
    expect(httpErrorResponse.error.message).toEqual('test');
  });
});
