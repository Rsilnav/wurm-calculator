import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-advisor-text',
  standalone: true,
  imports: [],
  templateUrl: './advisor-text.component.html',
  styleUrl: './advisor-text.component.css'
})
export class AdvisorTextComponent {
  @Input()
  success: number = 0;
  @Input()
  intact: number = 0;
  @Input()
  cracks: number = 0;
  @Input()
  shatters: number = 0;

  getColor() {
    if (this.shatters > 0.5) {
      return 'red';
    }
    if (this.shatters + this.cracks > 0.5) {
      return 'orange';
    }
    if (this.shatters + this.cracks + this.intact > 0.5) {
      return 'yellow'
    }
    if (this.success + this.intact > 0.5) {
      return 'green'
    }
    if (this.success > 0.5) {
      return 'blue'
    }
    return '#dcdcdc'
  }

  getText() {
    if (this.shatters > 0.5) {
      return 'Hell no!';
    }
    if (this.shatters + this.cracks > 0.5) {
      return 'You better don\'t';
    }
    if (this.shatters + this.cracks + this.intact > 0.5) {
      return 'Not a good idea'
    }
    if (this.success + this.intact > 0.5) {
      return 'Could work fine'
    }
    if (this.success > 0.5) {
      return 'Hell yes!'
    }
    return "Unsure...";
  }
}
