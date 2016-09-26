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

    private navbarFixed: boolean = true
    private maxWidthSmallScreen = 999

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
        this.manageNavbarBehaviour()
    }

    changeLang( lang: Lang ) {
        this.langUsed = this.lang.use( lang );

        (<any>$)( '.ui.modal' ).modal( 'hide' )

        this.translate.use( this.langUsed.tag )
    }

    openLangModal( event: Event ) {
        event.preventDefault()
    }

    gotoProfile() {
        $( 'app' ).animate({
            scrollTop: $('app').scrollTop() + $( '#nav-container' ).offset().top
        })
    }

    manageNavbarBehaviour() {
        $( document ).ready( () => {
            const $navbar   = $( '#nav-container' )
            const $app      = $( 'app' )

            $app.scroll( () => {
                const $window = $( window )
                const scrollTop = $app.scrollTop()
                const heightToStop = $window.height()

                if ( $window.width() > this.maxWidthSmallScreen ) {
                    console.log( $window.width() )
                    if ( scrollTop <= heightToStop && !this.navbarFixed ) {
                        $navbar.css({
                            width: '100%',
                            position: 'relative',
                            top: '100%'
                        })
                        this.navbarFixed = true
                    } else if ( scrollTop >= heightToStop && this.navbarFixed ) {
                        $navbar.css({
                            width: '25%',
                            position: 'fixed',
                            top: '0'
                        })
                        this.navbarFixed = false
                    }
                }
            })
        })
    }
}
