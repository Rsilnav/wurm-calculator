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

  getColoredQl() {
    if (this.ql < 20) {
      return 'grey';
    } else if (this.ql <= 29) {
      return 'red';
    } else if (this.ql <= 39) {
      return 'orange';
    } else if (this.ql <= 59) {
      return 'lightgreen';
    } else if (this.ql <= 79) {
      return 'lightblue';
    } else if (this.ql <= 94) {
      return 'violet';
    } else {
      return 'gold';
    }
  }
}
