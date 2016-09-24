import { Component }    from '@angular/core'
import { Router }       from '@angular/router'

@Component({
    moduleId: module.id,
    selector: 'nav',
    templateUrl: 'nav.component.html',
    styleUrls: [ 'nav.component.css' ]
})
export class NavComponent {
    constructor(
        private router: Router
    ) { }
}
