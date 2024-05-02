import {Injectable} from '@angular/core';
// @ts-ignore
import JavaRandom from 'java-random';

@Injectable({
  providedIn: 'root'
})
export class SimulateService {

  runs = 10000;
  random = new JavaRandom()

  constructor() {
  }

  simulate(data: Partial<{
    channeling: number | null;
    religion: number | null;
    difficulty: number | null;
    itemQL: number | null;
    armourFactor: number | null;
    alignment: number | null;
    deedBonus: number | null;
    benediction: boolean | null;
    numLinks: number | null
  }>): { success: number; intact: number; cracks: number; shatters: number } {

    let success: number = 0;
    let intact: number = 0;
    let cracks: number = 0;
    let shatters: number = 0;

    const channeling = data.channeling ?? 0;
    const religion = data.religion ?? 0;
    const difficulty = data.difficulty ?? 0;
    const itemQL = data.itemQL ?? 0;
    const armourFactor = data.armourFactor ?? 0;
    const alignment = data.alignment ?? 0;
    const deedBonus = data.deedBonus ?? 0;
    const benediction = data.benediction ?? false;
    const numLinks = data.numLinks ?? 0;

    for (let i = 0; i < this.runs; i++) {
      const bonus = this.calculateBonus(alignment, deedBonus, armourFactor);
      const power = this.getPower(difficulty + numLinks * 3, bonus, religion, channeling);
      const trimmedPower = this.trimPower(power, benediction);

      if (this.isSuccess(power, itemQL)) {
        success += 1;
      } else if (this.shallShatter(power, itemQL)) {
        shatters += 1;
      } else if (this.shallCrack(power, itemQL)) {
        cracks += 1;
      } else {
        intact += 1;
      }
    }

    return {
      success: success / this.runs,
      intact: intact / this.runs,
      cracks: cracks / this.runs,
      shatters: shatters / this.runs
    }
  }

  private getPower(difficulty: number, bonus: number, religion: number, channeling: number) {
    difficulty = Math.max(1, difficulty);

    // Religion Check
    const religionSkill = this.getReligionKnowledge(religion);
    const religionPower = this.rollGaussian(religionSkill, difficulty);
    bonus += religionPower / 10;

    // Channeling Check
    bonus = Math.min(70, bonus);
    const channelingSkill = this.getChannelingKnowledge(channeling, bonus);
    const channelingPower = this.rollGaussian(channelingSkill, difficulty);

    return channelingPower;
  }

  private getChannelingKnowledge(channeling: number, bonus: number): number {
    bonus = Math.min(bonus, 70);
    let bonusKnowledge = channeling;
    if (bonus != 0) {
      const linearMax = (100 + bonusKnowledge) / 2;
      const diffToMaxChange = Math.min(bonusKnowledge, linearMax - bonusKnowledge);
      const newBon = diffToMaxChange * bonus / 100;
      bonusKnowledge += newBon;
    }
    return Math.max(bonusKnowledge, 1);
  }

  private getReligionKnowledge(religion: number): number {
    return Math.max(religion, 1);
  }

  private rollGaussian(skill: number, difficulty: number): number {
    const slide = (skill * skill * skill - difficulty * difficulty * difficulty) / 50000 + skill - difficulty;
    const w = 30 - Math.abs(skill - difficulty) / 4;

    let attempts = 0;
    let result;

    do {
      result = this.random.nextGaussian() * (w + Math.abs(slide) / 6.0) + slide;

      const rejectCutoff = this.random.nextGaussian() * (w - Math.abs(slide) / 6.0) + slide;
      if (slide > 0.0) {

        if (result > rejectCutoff + Math.max(100.0 - slide, 0.0)) {
          result = -1000.0;
        }

      } else if (result < rejectCutoff - Math.max(100.0 + slide, 0.0)) {
        result = -1000.0;
      }

      attempts++;
      if (attempts != 100) {
        continue;
      }

      if (result > 100.0)
        return 90.0 + this.random.nextFloat() * 5.0;
      if (result < -100.0) {
        return -90.0 - this.random.nextFloat() * 5.0;
      }
    } while (result < -100 || result > 100)

    return result;
  }

  private isSuccess(power: any, itemQL: number) {
    return power >= 0;
  }

  private shallShatter(power: any, itemQL: number) {
    return power < -itemQL || (power < 0 && this.random.nextFloat() <= 0.01);
  }

  private shallCrack(power: any, itemQL: number) {
    return power < (-itemQL / 3);
  }

  private trimPower(power: number, benediction: boolean): number {
    if (benediction)
      power += 5;
    return power;
  }

  calculateBonus(alignment: number, deedBonus: number, armourFactor: number): number {
    let bonus: number = Math.abs(alignment) - 49;
    bonus += deedBonus;
    if (bonus > 0) {
      bonus *= 1 + armourFactor;
    }
    return bonus
  }
}
