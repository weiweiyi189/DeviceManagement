import {TestBed} from '@angular/core/testing';

import {CommonService} from './common.service';
import {Router} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';

describe('CommonService', () => {
  let service: CommonService;
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      RouterTestingModule
    ]
  }));

  beforeEach(() => {
    const router = TestBed.inject(Router) as Router;
    service = new CommonService(router);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getBrowserInfo', () => {
    const navigator = {
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36'
    };
    spyOnProperty(window, 'navigator').and.returnValue(navigator);

    // chrome浏览器
    expect(service.getBrowserTypeAndVersion().type).toEqual('chrome');
    expect(service.getBrowserTypeAndVersion().version).toEqual('83.0.4103.116');

    // firefox浏览器
    navigator.userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.13; rv:77.0) Gecko/20100101 Firefox/77.0';
    expect(service.getBrowserTypeAndVersion().type).toEqual('firefox');
    expect(service.getBrowserTypeAndVersion().version).toEqual('77.0');

    // Safari
    // tslint:disable:max-line-length
    navigator.userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1.1 Safari/605.1.15';
    expect(service.getBrowserTypeAndVersion().type).toEqual('safari');
    expect(service.getBrowserTypeAndVersion().version).toEqual('13.1.1');

    // edge
    navigator.userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36 Edge/16.16299';
    expect(service.getBrowserTypeAndVersion().type).toEqual('edge');
    expect(service.getBrowserTypeAndVersion().version).toEqual('16.16299');
    navigator.userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.140 Safari/537.36 Edge/17.17134';
    expect(service.getBrowserTypeAndVersion().type).toEqual('edge');
    expect(service.getBrowserTypeAndVersion().version).toEqual('17.17134');
    navigator.userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36 Edg/83.0.478.56';
    expect(service.getBrowserTypeAndVersion().type).toEqual('edge');
    expect(service.getBrowserTypeAndVersion().version).toEqual('83.0.478.56');

    // ie10
    ['Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; WOW64; Trident/6.0)',
      'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2)',
      'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; WOW64; Trident/6.0)',
      'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; Trident/6.0)',
      'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; WOW64; Trident/6.0)'
    ].forEach(value => {
      navigator.userAgent = value;
      expect(service.getBrowserTypeAndVersion().type).toEqual('msie');
      expect(service.getBrowserTypeAndVersion().version).toEqual('10.0');
    });

    // ie11
    ['Mozilla/5.0 CK={} (Windows NT 6.1; WOW64; Trident/7.0; rv:11.0) like Gecko',
      'Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; rv:11.0) like Gecko',
      'Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; rv:11.0) like Gecko',
      'Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; .NET4.0C; .NET4.0E; .NET CLR 2.0.50727; .NET CLR 3.0.30729; .NET CLR 3.5.30729; rv:11.0) like Gecko',
      'Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; Touch; rv:11.0) like Gecko',
      'Mozilla/5.0 (Windows NT 6.1; Win64; x64; Trident/7.0; rv:11.0) like Gecko',
      'Mozilla/5.0 (compatible, MSIE 11, Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko',
      'Mozilla/5.0 (compatible, MSIE 11, Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko',
      'Mozilla/5.0 (compatible, MSIE 11, Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko',
    ].forEach(value => {
      navigator.userAgent = value;
      expect(service.getBrowserTypeAndVersion().type).toEqual('msie');
      expect(service.getBrowserTypeAndVersion().version).toContain('11');
    });
  });

  it('compareVersion', () => {
    expect(service.compareVersion('10.2.3.0', '9.0.0.0')).toEqual(1);
    expect(service.compareVersion('10.2.3.0', '10.2.3.0')).toEqual(0);
    expect(service.compareVersion('9.0.0.0', '10.2.3.0')).toEqual(-1);
  });

  it('checkBrowserTypeAndVersion', () => {
    spyOn(service, 'compareVersion').and.returnValue(1);
    spyOn(service, 'getBrowserTypeAndVersion').and.returnValue({type: 'chrome', version: '10.2.3.0'});
    expect(service.checkBrowserTypeAndVersion('chrome', '9.0.0.0')).toEqual(true);
  });
});

