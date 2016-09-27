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

    changeLang( lang: Lang, event: Event ) {
        event.stopPropagation()

        this.langUsed = this.lang.use( lang )
        this.translate.use( this.langUsed.tag )

        $( '.lang.modal .content' ).removeClass( 'displayed' )
        $( 'app' ).off( '.lang' )
    }

    toggleLangModal( event: Event ) {
        event.preventDefault()
        event.stopPropagation()

        const $modal        = $( '.lang.modal' )
        const $modalContent = $modal.children( '.content' )
        const $caret        = $modalContent.children( '.caret' )

        $modalContent.toggleClass( 'displayed' )

        if ( $modalContent.hasClass( 'displayed' ) ) {
            /*
             * Center modal in container
             */
            $modalContent.css({
                left: -Math.abs( $modal.width() - $modalContent.width() ) / 2,
                top: $modal.height() + 10
            })

            /*
             * Center caret in modal content
             */
            $caret.css({
                left: $modalContent.width() / 2 - 8.5
            })

            $( 'app' ).off( '.lang' ).on( 'click.lang', () => {
                $( '.lang.modal .content' ).removeClass( 'displayed' )
                $( 'app' ).off( '.lang' )
            })
        } else {
            $( 'app' ).off( '.lang' )
        }
    }

    gotoProfile() {
        $( 'app' ).animate({
            scrollTop: $('app').scrollTop() + $( '#nav-container' ).offset().top
        })
    }

    manageNavbarBehaviour() {
        $( document ).ready( () => {
            const $navbar   = $( '#nav-container' )
            const $navroot  = $( '#nav-root' )
            const $app      = $( 'app' )
            const $window   = $( window )

            $app.scroll( () => handlerManagerNavbarBehaviour.call( this, $navroot, $navbar, $app, $window ) )

            $window.resize( () => {
                if ( $window.width() <= this.maxWidthSmallScreen && !this.navbarFixed ) {
                    $navroot.removeClass( 'height h-max' )
                    $navbar.removeClass( 'fixed' )

                    this.navbarFixed = true
                } else {
                    handlerManagerNavbarBehaviour.call( this, $navroot, $navbar, $app, $window )
                }
            })

            function handlerManagerNavbarBehaviour( $navroot, $navbar, $app, $window ) {
                const scrollTop = $app.scrollTop()
                const heightToStop = $window.height()

                if ( $window.width() > this.maxWidthSmallScreen ) {
                    if ( scrollTop <= heightToStop && !this.navbarFixed ) {
                        $navroot.addClass( 'height h-max' )
                        $navbar.removeClass( 'fixed' )

                        this.navbarFixed = true
                    } else if ( scrollTop >= heightToStop && this.navbarFixed ) {
                        $navroot.removeClass( 'height h-max' )
                        $navbar.addClass( 'fixed' )

                        this.navbarFixed = false
                    }
                }
            }
        })
    }
}
