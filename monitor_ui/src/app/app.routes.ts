import { Routes } from '@angular/router';
import {NodeListComponent} from './routes/node-list-component/node-list-component';
import {NodeInfoComponent} from './routes/node-info-component/node-info-component';

export const routes: Routes = [
  {path: 'nodes', children: [
      {path: '', component: NodeListComponent},
      {path: ':id', component: NodeInfoComponent},
      {path: '**', redirectTo: 'nodes'}
    ]
  },
  {path: '**', redirectTo: 'nodes'}
];
