import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PageComponent} from './page.component';
import {By} from '@angular/platform-browser';
import {FormTest} from '../../testing/formTest';
import {PartTestingController} from '../part-testing/part-testing-controller';
import {FormsModule} from '@angular/forms';
import {SizeSelectComponent} from '../part-testing/size-select/size-select.component';

describe('PageComponent', () => {
  let component: PageComponent;
  let fixture: ComponentFixture<PageComponent>;
  const totalPages = 1;
  const page = 0;
  const size = 2;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageComponent, SizeSelectComponent ],
      imports: [FormsModule],
      providers: [
        PartTestingController
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageComponent);
    component = fixture.componentInstance;
    component.totalPages = totalPages;
    component.page = page;
    component.size = size;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('当前页、总页数、每页大小', () => {
    /* 获取分页信息 */
    const debugElement = fixture.debugElement.query(By.css('#pageInfo'));
    const pageInfoDiv: HTMLDivElement = debugElement.nativeElement;
    const text = pageInfoDiv.textContent;

    /* 断言绑定了C层的分页值 */
    expect(text).toContain(`第${component.page + 1}/${component.totalPages}页`);
    expect(text).toContain(`第${component.page + 1}/${component.totalPages}页 每页 size-select works! 条`);
  });

  // it('分页 -> 首页样式测试', () => {
  //   /* 获取首页按钮 */
  //   const debugElement = fixture.debugElement.query(By.css('ul.pagination > li:first-child'));
  //   const htmlliElement: HTMLLIElement = debugElement.nativeElement;
  //
  //   /* 当前页为首页，则添加禁用样式 */
  //   component.page = 0;
  //   fixture.detectChanges();
  //   expect(htmlliElement.classList.contains('disabled')).toBe(true);
  //
  //   /* 当前页非首页，则移除禁用样式 */
  //   component.page = 1;
  //   fixture.detectChanges();
  //   expect(htmlliElement.classList.contains('disabled')).toBe(false);
  // });

  // it('上一页 样式测试', () => {
  //   /* 获取首页按钮 */
  //   const debugElement = fixture.debugElement.query(By.css('ul.pagination > li:nth-child(2)'));
  //   const htmlliElement: HTMLLIElement = debugElement.nativeElement;
  //
  //   /* 当前页为首页，则添加禁用样式 */
  //   component.page = 0;
  //   fixture.detectChanges();
  //   expect(htmlliElement.classList.contains('disabled')).toBe(true);
  //
  //   /* 当前页非首页，则移除禁用样式 */
  //   component.page = 1;
  //   fixture.detectChanges();
  //   expect(htmlliElement.classList.contains('disabled')).toBe(false);
  // });


  // it('上一页 点击测试', () => {
  //   spyOn(component, 'onPage');
  //
  //   component.page = 3;
  //   fixture.detectChanges();
  //
  //   /* 获取上一页按钮并点击 */
  //   const formTest = new FormTest(fixture);
  //   formTest.clickButton('ul.pagination > li:nth-child(2)');
  //
  //   expect(component.onPage).toHaveBeenCalledWith(2);
  // });

  // it('makePages', () => {
  //   /* 更好的做法是使用两个随机的数字进行测试 */
  //   const result = component.makePages(0, 4);
  //   expect(result.length).toEqual(5);
  //
  //   /* 断言起始为0 */
  //   expect(result[0]).toEqual(0);
  //
  //   /* 断言后一个元素比前一个元素大1 */
  //   for (let i = 0; i < 4; i++) {
  //     expect(result[i] + 1).toEqual(result[i + 1]);
  //   }
  // });

  it('makePagesByTotalPages', () => {
    /* 总页数为0 */
    expect(component.makePagesByTotalPages(0, 0).length).toEqual(0);

    /* 总页数小于等于5 */
    expect(component.makePagesByTotalPages(2, 5).length).toEqual(5);
    expect(component.makePagesByTotalPages(2, 5)[0]).toEqual(0);

    /* 总页数大于5，首2页 */
    expect(component.makePagesByTotalPages(1, 10).length).toEqual(5);
    expect(component.makePagesByTotalPages(1, 10)[4]).toEqual(4);

    /* 总页数大于5，尾2页 */
    expect(component.makePagesByTotalPages(8, 10).length).toEqual(5);
    expect(component.makePagesByTotalPages(8, 10)[4]).toEqual(9);

    /* 总页数大于5， 中间页 */
    expect(component.makePagesByTotalPages(5, 10).length).toEqual(5);
    expect(component.makePagesByTotalPages(5, 10)[0]).toEqual(3);
  });

  it('loadData', () => {
    const mockResult = new Array<number>();
    spyOn(component, 'makePagesByTotalPages').and.returnValue(mockResult);
    component.loadData();
    expect(component.makePagesByTotalPages).toHaveBeenCalled();
    expect(component.pages).toBe(mockResult);
  });
  //
  // /**
  //  * V层分页测试BEFORE
  //  */
  // const viewPageBefore = (): HTMLUListElement => {
  //   component.pages = new Array<number>(3, 4, 5, 6, 7);
  //   fixture.detectChanges();
  //
  //   /* 获取分页 */
  //   const debugElement = fixture.debugElement.query(By.css('ul.pagination'));
  //   return HTMLUListElement = debugElement.nativeElement;
  // };
  //
  // it('页码渲染个数', () => {
  //   const ulElement: HTMLUListElement = viewPageBefore();
  //
  //   /* 断言分页个数 */
  //   expect(ulElement.getElementsByTagName('li').length).toEqual(9);
  // });

  // it('测试页码号', () => {
  //   const ulElement: HTMLUListElement = viewPageBefore();
  //   const liElements: HTMLCollection = ulElement.getElementsByTagName('li');
  //
  //   /* 依次获取第3 4 5 6 7页，断言对应的页码为4，5，6，7，8 */
  //   for (let i = 2; i < 7; i++) {
  //     expect(liElements[i].textContent).toContain((i + 2).toString());
  //   }
  // });

  // it('页码点击测试', () => {
  //   const ulElement: HTMLUListElement = viewPageBefore();
  //   const liElements: HTMLCollection = ulElement.getElementsByTagName('li');
  //
  //   spyOn(component, 'onPage');
  //
  //   for (let i = 2; i < 7; i++) {
  //     const htmlLiElement = liElements[i] as HTMLLIElement;
  //     htmlLiElement.click();
  //     expect(component.onPage).toHaveBeenCalledWith(i + 1);
  //   }
  // });

  // it('选中当前页测试', () => {
  //   component.page = 4;
  //   const ulElement: HTMLUListElement = viewPageBefore();
  //   const liElements: HTMLCollection = ulElement.getElementsByTagName('li');
  //
  //   /* 断言只有ul元素下只有一个active子元素，且该子元素的位置符合预期 */
  //   expect(ulElement.getElementsByClassName('active').length).toBe(1);
  //   const htmlLiElement = liElements[3] as HTMLLIElement;
  //   expect(htmlLiElement.classList.contains('active')).toBe(true);
  //
  //   /* 断言该li元素中存在class为sr-only的元素 */
  //   const elements = htmlLiElement.getElementsByClassName('sr-only');
  //   expect(elements.length).toEqual(1);
  //   expect(elements[0].textContent).toContain('(current)');
  // });
  //
  // it('点击下一页', () => {
  //   /* 获取分页元素 */
  //   const debugElement = fixture.debugElement.query(By.css('ul.pagination>li:nth-last-child(2)'));
  //   const liElement: HTMLLIElement = debugElement.nativeElement;
  //   expect(liElement.textContent).toContain('下一页');
  //
  //   spyOn(component, 'onPage');
  //   const currentPage = component.page;
  //   liElement.click();
  //   expect(component.onPage).toHaveBeenCalledWith(currentPage + 1);
  // });
  //
  // it('下一页(尾页）样式', () => {
  //   /* 定义两个选择器后缀 */
  //   const cssSelector = new Array<string>('nth-last-child(2)', 'last-of-type');
  //
  //   /* 循环测试下一页及尾页 */
  //   cssSelector.forEach((value) => {
  //     /* 当前第3页，总共4页 */
  //     component.page = 2;
  //     component.totalPages = 4;
  //     fixture.detectChanges();
  //
  //     /* 下一页（尾页）可点击 */
  //     const debugElement = fixture.debugElement.query(By.css(`ul.pagination>li:${value}`));
  //     const liElement: HTMLLIElement = debugElement.nativeElement;
  //     expect(liElement.classList.contains('disabled')).toBe(false);
  //
  //     /* 总页数为3页，下一页（尾页)不可点击 */
  //     component.totalPages = 3;
  //     fixture.detectChanges();
  //     expect(liElement.classList.contains('disabled')).toBe(true);
  //   });
  // });
  //
  // it('点击尾页', () => {
  //   /* 获取分页元素 */
  //   const debugElement = fixture.debugElement.query(By.css('ul.pagination>li:last-of-type'));
  //   const liElement: HTMLLIElement = debugElement.nativeElement;
  //   expect(liElement.textContent).toContain('尾页');
  //
  //   spyOn(component, 'onPage');
  //   liElement.click();
  //   expect(component.onPage).toHaveBeenCalledWith(component.totalPages - 1);
  // });
  //
  // it('选择每页大小', () => {
  //   const controller = TestBed.get(PartTestingController) as PartTestingController;
  //   const sizeComponent = controller.get(SizeSelectComponent) as SizeSelectComponent;
  //   expect(sizeComponent.size).toBe(component.size);
  //
  //   spyOn(component, 'onSizeSelected');
  //   const emitSize = 4;
  //   sizeComponent.changeSize.emit(emitSize);
  //   expect(component.onSizeSelected).toHaveBeenCalledWith(4);
  //
  // });
});
