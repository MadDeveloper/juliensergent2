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

        const $document = $( document )

        $document.ready( () => {
            $document.scroll( () => {
                $( '#first-page' ).css({
                    transform: `translate(0px, ${$document.scrollTop()}px)`
                })
            })

            /*
             * Easter Egg card profile first page
             */
            $( '#image-profile-container' ).on( 'click', () => $( '#card-image-profile' ).toggleClass( 'flipped' ) )
        })
    }

    changeLang( lang: Lang, event: Event ) {
        event.stopPropagation()

        this.langUsed = this.lang.use( lang )
        this.translate.use( this.langUsed.tag )

        $( '.lang.modal .content' ).removeClass( 'displayed' )
        $( 'app' ).off( '.lang' )
        this.toggleFirstPageBlur()
    }

    toggleLangModal( event: Event ) {
        event.preventDefault()
        event.stopPropagation()

        const $app          = $( 'app' )
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

            /*
             * Blur first page
             */
            this.toggleFirstPageBlur()

            /*
             * Handle click not on a lang
             */
            $app.off( '.lang' ).on( 'click.lang', () => {
                $modalContent.removeClass( 'displayed' )
                $app.off( '.lang' )
                this.toggleFirstPageBlur()
            })
        } else {
            $app.off( '.lang' )
            this.toggleFirstPageBlur()
        }
    }

    gotoProfile() {
        const top       = $( window ).width() <= this.maxWidthSmallScreen ? $( '#nav-root' ).offset().top : $( '#main-section' ).offset().top
        const duration  = 400

        this.animateScrollTop( top, duration )
    }

    private toggleFirstPageBlur() {
        if ( $( '.lang.modal .content' ).hasClass( 'displayed' ) ) {
            $( '#first-page > *:not(#lang-container)' ).addClass( 'blurred accentuated' )
        } else {
            $( '#first-page > *:not(#lang-container)' ).removeClass( 'blurred accentuated' )
        }
    }

    private animateScrollTop( target, duration?: number ) {
        const $window = $( window )
        const scrollTopProxy = { value: $window.scrollTop() }
        duration = duration || 16

        if ( scrollTopProxy.value != target ) {
            $( scrollTopProxy ).animate(
                { value: target },
                { duration, step: stepValue => {
                    const rounded = Math.round( stepValue )
                    $window.scrollTop( rounded )
                }
            })
        }
    }
}
