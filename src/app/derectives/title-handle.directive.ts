import { Directive, inject, Injector, Input, OnInit } from '@angular/core';
import { COMPONENT_PROVIDERS, getHostComponent } from '../utils/host-component';

@Directive({
  selector: '[extract]',
  standalone: true,
  providers: COMPONENT_PROVIDERS, // You'll need to create this
})
export class TitleHandleDirective implements OnInit {
  @Input() extract: string | undefined;

  injector = inject(Injector);

  ngOnInit() {
    const host = getHostComponent(this.injector);

    if (host) {
      if (this.extract) {
        console.log(`Extracted ${this.extract}:`, host[this.extract]);
      } else {
        console.log('Title:', host.title);
      }
    }
  }
}
