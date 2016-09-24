import { NgModule }             from '@angular/core'
import { BrowserModule, Title } from '@angular/platform-browser'
import { FormsModule }          from '@angular/forms'
import { HttpModule, Http }     from '@angular/http'
import { TranslateModule,
         TranslateLoader,
         TranslateStaticLoader} from 'ng2-translate/ng2-translate'

/*
 * Config
 */
import { APP_CONFIG, APP_CONFIG_VALUES } from './config/app.config'

/*
 * App component and routing
 */
import { AppComponent } from './components/app/app.component'
import { routing }      from './app.routes'

/*
 * Services
 */
import { LangService }      from './services/lang.service'
import { TitleService }     from './services/title.service'
import { StorageService }   from './services/storage.service'

/*
 * Global components
 */
import { NavComponent }  from './components/nav/nav.component'

/*
 * App Components
 */
import { HomeComponent } from './components/home/home.component'

/*
 * Pipes
 */
import { KeysPipe } from './pipes/keys.pipe'

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        TranslateModule.forRoot({
            provide: TranslateLoader,
            useFactory: ( http: Http ) => new TranslateStaticLoader( http, '/public/assets/translations', '.json' ),
            deps: [ Http ]
        }),
        routing
    ],
    declarations: [
        AppComponent,
        NavComponent,
        HomeComponent,
        KeysPipe
    ],
    providers: [
        LangService,
        Title,
        TitleService,
        StorageService,
        { provide: APP_CONFIG, useValue: APP_CONFIG_VALUES }
    ],
    exports: [ AppComponent, TranslateModule ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }
