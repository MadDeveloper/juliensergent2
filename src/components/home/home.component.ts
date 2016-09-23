import { Component, OnInit, Inject }    from '@angular/core'
import { Router, ActivatedRoute }       from '@angular/router'

import { LangService }      from './../../services/lang.service'
import { TitleService }     from './../../services/title.service'
import { TranslateService } from 'ng2-translate/ng2-translate'

import { Lang } from './../../entities/lang'

@Component({
    moduleId: module.id,
    selector: 'home',
    templateUrl: 'home.component.html',
    styleUrls: [ 'home.component.css' ]
})
export class HomeComponent implements OnInit {
    facebookUserLogged: any
    langs: Lang[]
    langUsed: Lang

    constructor(
        private lang: LangService,
        private router: Router,
        private title: TitleService,
        private translate: TranslateService,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        this.langs = this.lang.availables()
        this.langUsed = this.lang.used()
        this.title.setTitle( '' )
    }

    changeLang( lang: Lang ) {
        this.langUsed = this.lang.use( lang );

        (<any>$)( '.ui.modal' ).modal( 'hide' )

        this.translate.use( this.langUsed.tag )
    }

    openLangModal( event: Event ) {
        event.preventDefault()
    }
}
