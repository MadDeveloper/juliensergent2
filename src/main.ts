// import 'public/rxjs.extensions.js'
import { platformBrowserDynamic }   from '@angular/platform-browser-dynamic'
import { enableProdMode } 			from '@angular/core'
import { AppModule }                from './app.module'

enableProdMode()

platformBrowserDynamic().bootstrapModule( AppModule )
