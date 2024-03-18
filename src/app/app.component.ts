import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
// @ts-ignore
import JavaRandom from 'java-random';
import {NgForOf, NgIf} from "@angular/common";
import {QlNumberComponent} from "./shared/ql-number/ql-number.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule, NgIf, NgForOf, QlNumberComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'wurm-calculator';
  oreLocationForm = new FormGroup({
    x: new FormControl(10),
    y: new FormControl(10),
    mapSize: new FormControl(4096)
  });
  oreQl: number = 0;

  offsets = [-4, -3, -2, -1, 0, 1, 2, 3, 4];

  ngOnInit(): void {
    this.oreQl = this.calculateQl(10, 10, 4096);

    this.oreLocationForm.valueChanges.subscribe((values) => {
      if (values.x === null || values.y === null || values.mapSize === null) {
        this.oreQl = -1;
        return;
      }
      this.oreQl = this.calculateQl(values.x!, values.y!, values.mapSize!);
    });
  }

  calculateQl(x: number, y: number, mapSize: number) {
    let rng = new JavaRandom((x + y * mapSize) * 789221);
    return Math.min(100, 20 + rng.nextInt(80));
  }

  getColoredQl(ql: number) {

  }
}
