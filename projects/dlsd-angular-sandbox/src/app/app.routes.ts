import { Routes } from '@angular/router';
import { ColorsComponent } from './colors/colors.component';
import { TooltipsComponent } from './tooltips/tooltips.component';

export const routes: Routes = [
  {
    title: 'colors',
    component: ColorsComponent,
    path: 'colors',
  },

  {
    title: 'tooltips',
    component: TooltipsComponent,
    path: 'tooltips',
  },
];
