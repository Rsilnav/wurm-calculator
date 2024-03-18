import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-ql-number',
  standalone: true,
  imports: [],
  templateUrl: './ql-number.component.html',
  styleUrl: './ql-number.component.css'
})
export class QlNumberComponent {
  @Input() ql: number = 0;

  getColoredQl(ql: number) {
    if (ql < 20) {
      return 'grey';
    } else if (ql <= 29) {
      return 'red';
    } else if (ql <= 39) {
      return 'orange';
    } else if (ql <= 59) {
      return 'lightgreen';
    } else if (ql <= 79) {
      return 'lightblue';
    } else if (ql <= 94) {
      return 'violet';
    } else {
      return 'gold';
    }
  }
}
