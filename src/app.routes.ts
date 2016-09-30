import { Routes, RouterModule } from '@angular/router'

import { HomeComponent } from './components/home/home.component'

const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: ':whatever',
        redirectTo: '',
        pathMatch: 'full'
    }
]

export const routing = RouterModule.forRoot( routes )
