import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SimulateService} from "./simulate.service";
import {NgIf, PercentPipe} from "@angular/common";
import {AdvisorTextComponent} from "@shared/advisor-text/advisor-text.component";

@Component({
  selector: 'app-enchant-simulator',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgIf,
    PercentPipe,
    AdvisorTextComponent
  ],
  templateUrl: './enchant-simulator.component.html',
  styleUrl: './enchant-simulator.component.css'
})
export class EnchantSimulatorComponent {
  simulator = inject(SimulateService);
  enchantingForm = new FormGroup({
    // Basic
    channeling: new FormControl(+(localStorage.getItem('channeling') ?? 50)),
    religion: new FormControl(+(localStorage.getItem('religion') ?? 50)),
    difficulty: new FormControl(+(localStorage.getItem('difficulty') ?? 60)),
    itemQL: new FormControl(+(localStorage.getItem('itemQL') ?? 50)),

    // Advanced
    armourFactor: new FormControl(+(localStorage.getItem('armourFactor') ?? 0)),
    alignment: new FormControl(+(localStorage.getItem('alignment') ?? 0)),
    deedBonus: new FormControl(+(localStorage.getItem('deedBonus') ?? 0)),
    benediction: new FormControl(localStorage.getItem('benediction') === 'true'),
    numLinks: new FormControl(+(localStorage.getItem('numLinks') ?? 0)),
  });

  success: number | undefined;
  intact: number | undefined;
  cracks: number | undefined;
  shatters: number | undefined;
  simulating: boolean = false;

  simulated: boolean = false;

  simulate() {
    const data: Partial<{
      channeling: number | null,
      religion: number | null,
      difficulty: number | null,
      itemQL: number | null,
      armourFactor: number | null,
      alignment: number | null,
      deedBonus: number | null,
      benediction: boolean | null,
      numLinks: number | null
    }> = this.enchantingForm.value;
    this.simulating = true;
    const results = this.simulator.simulate(data);
    this.success = results.success;
    this.intact = results.intact;
    this.cracks = results.cracks;
    this.shatters = results.shatters;
    this.simulated = true;
    this.simulating = false;

    localStorage.setItem("channeling", '' + this.enchantingForm.value.channeling);
    localStorage.setItem("religion", '' + this.enchantingForm.value.religion);
    localStorage.setItem("difficulty", '' + this.enchantingForm.value.difficulty);
    localStorage.setItem("itemQL", '' + this.enchantingForm.value.itemQL);
    localStorage.setItem("armourFactor", '' + this.enchantingForm.value.armourFactor);
    localStorage.setItem("alignment", '' + this.enchantingForm.value.alignment);
    localStorage.setItem("deedBonus", '' + this.enchantingForm.value.deedBonus);
    localStorage.setItem("benediction", '' + this.enchantingForm.value.benediction);
    localStorage.setItem("numLinks", '' + this.enchantingForm.value.numLinks);
  }
}
