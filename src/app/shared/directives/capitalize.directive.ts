import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[capitalizeFirst]'
})
export class CapitalizeFirstDirective {

  constructor(private elementRef: ElementRef) {}

  @HostListener('input', ['$event'])
  onInput(event: any): void {
    if (event.target.value.length === 1) {
      const inputValue = event.target.value;
      this.elementRef.nativeElement.value = inputValue.charAt(0).toUpperCase() + inputValue.substring(1);
    }
  }

}
