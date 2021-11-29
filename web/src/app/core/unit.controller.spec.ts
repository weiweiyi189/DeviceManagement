import {UnitController} from './unit.controller';
import {TestBed} from '@angular/core/testing';

describe('unitController', () => {
  it('unitController add , get and remove', () => {
    const controller = TestBed.inject(UnitController) as UnitController;
    expect(controller).toBeDefined();

    const test = new Test();
    const foo = new Foo();
    const bar = new Bar();
    controller.add(foo);
    controller.add(bar);
    controller.add(test);

    expect(controller.get(Test)).toBe(test);
    expect(controller.get(Foo)).toBe(foo);
    expect(controller.get(Bar)).toBe(bar);

    controller.remove(test);
    expect(controller.get(Test)).toBeNull();
  });

  it('get by index', () => {
    const controller = new UnitController();
    const test = new Test();
    const test1 = new Test();

    controller.add(test);
    controller.add(test1);

    expect(controller.get(Test, 1)).toBe(test1);
    expect(controller.get(Test, 0)).toBe(test);

    controller.remove(test);
    controller.remove(test1);
    expect(controller.get(Test)).toBeNull();
  });

  it('get by token', () => {
    const controller = new UnitController();
    const test = new Test();
    const test1 = new Test();
    controller.add(test, 'ab');
    controller.add(test1, 'cd');

    expect(controller.get(Test, 0, 'ab')).toBe(test);
    expect(controller.get(Test, 0, 'cd')).toBe(test1);
  });

});

class Test {}

class Foo {}

class Bar {}

