import {Routes} from '@angular/router';
import {QlCalculatorComponent} from "./pages/ql-calculator/ql-calculator.component";
import {HomeComponent} from "./pages/home/home.component";
import {EnchantSimulatorComponent} from "./pages/enchant-simulator/enchant-simulator.component";

export const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent, pathMatch: "full"},
  {path: 'ql', component: QlCalculatorComponent, pathMatch: "full"},
  {path: 'enchant', component: EnchantSimulatorComponent, pathMatch: "full"},
];
