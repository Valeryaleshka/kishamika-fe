import { ElementRef, InjectionToken, Injector } from '@angular/core';

export const HOST_COMPONENT = new InjectionToken('TOKEN');

export const COMPONENT_PROVIDERS = [
  {
    provide: HOST_COMPONENT,
    useFactory: (injector: Injector) => {
      try {
        // This gets the nearest component up the injector tree
        return injector.get(Injector).get<any>(HOST_COMPONENT, null);
      } catch {
        return null;
      }
    },
    deps: [Injector],
  },
];

export function getHostComponent(injector: Injector): any {
  // Try to get the host component through various methods
  try {
    // Method 1: Through the component's own injector
    const component = injector.get(HOST_COMPONENT, null);
    if (component) return component;

    // Method 2: Through ElementRef (less reliable)
    const elementRef = injector.get(ElementRef, null);
    if (elementRef?.nativeElement?.__ngContext__) {
      return elementRef.nativeElement.__ngContext__.component;
    }

    return null;
  } catch {
    return null;
  }
}
