import { MonoTypeOperatorFunction, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

/**
 * create a symbol identify the observable I add to
 * the component so it doesn't conflict with anything.
 * I need this so I'm able to add the desired behavior to the component.
 */
export const destroy$ = Symbol('destroy$');

/**
 * @param component - "this", component reference
 * An operator that takes the component as a property
 * @returns - .pipe()-able RxJS operator
 */
export const untilDestroy = <T>(component: any): MonoTypeOperatorFunction<T> => {
  if (component[destroy$] === undefined) {
    // only hookup each component once.
    addDestroyObservableToComponent(component);
  }

  // pipe in the takeUntil destroy$ and return the source unaltered
  return takeUntil<T>(component[destroy$]);
};

/**
 * @internal
 */
export const addDestroyObservableToComponent = (component: any): any => {
  component[destroy$] = new Observable<void>(observer => {
    // keep track of the original destroy function,
    // the user might do something in there
    const originalDestroy = component.ngOnDestroy;
    if (typeof originalDestroy === 'undefined') {
      // angular (AOT) does not support dynamic added destroy methods
      // so make sure there is one.
      throw new Error('untilDestroy operator needs the component to have an ngOnDestroy method');
    }
    // replace the ngOnDestroy
    component.ngOnDestroy = () => {
      // fire off the destroy observable
      observer.next();
      // complete the observable
      observer.complete();
      // and at last, call the original destroy
      originalDestroy.call(component);
    };
    // return cleanup function.
    return (_: any) => (component[destroy$] = undefined);
  });
};