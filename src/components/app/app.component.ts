import { Component, OnInit, Input } from '@angular/core'
import { Router, NavigationEnd }    from '@angular/router'

import { LangService }      from './../../services/lang.service'
import { TranslateService } from 'ng2-translate'

@Component({
    moduleId: module.id,
    selector:  'app',
    templateUrl: 'public/components/app/app.component.html',
    styleUrls: [ 'public/components/app/app.component.css' ]
})
export class AppComponent implements OnInit {
    constructor(
        private router: Router,
        private translate: TranslateService,
        private lang: LangService
    ) {
        const usedLang      = lang.used()
        const browserLang   = lang.browserLang()

        translate.setDefaultLang( browserLang.tag )
        translate.use( usedLang.tag )
    }

    ngOnInit() { }
}
