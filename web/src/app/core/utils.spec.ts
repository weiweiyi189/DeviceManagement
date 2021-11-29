import {TestBed} from '@angular/core/testing';
import {convertToLoadingFormat} from './secondUtils';



describe('utils', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: []
  }));

  it('convertToLoadingFormat', () => {
    expect(convertToLoadingFormat('请稍候')).toEqual('请稍候.');
    expect(convertToLoadingFormat('请稍候.')).toEqual('请稍候..');
    expect(convertToLoadingFormat('请稍候..')).toEqual('请稍候...');
    expect(convertToLoadingFormat('请稍候...')).toEqual('请稍候');
  });
});
