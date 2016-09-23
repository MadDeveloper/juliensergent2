import { OpaqueToken } from '@angular/core'

export interface AppConfig {
    title: string
}

export const APP_CONFIG_VALUES: AppConfig = {
    title: 'Julien Sergent'
}

export const APP_CONFIG = new OpaqueToken( 'app.config' )
