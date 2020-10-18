import {
  Core,
  CoreServiceProvider,
  DesktopServiceProvider,
  NotificationServiceProvider,
  SettingsServiceProvider,
  VFSServiceProvider,
} from '@osjs/client'
import { DialogServiceProvider } from '@osjs/dialogs'
import { GUIServiceProvider } from '@osjs/gui'
import { PanelServiceProvider } from '@osjs/panels'
import config from './config.js'
import './index.scss'

const init = () => {
  const osjs = new Core(config, {})
  osjs.register(CoreServiceProvider)
  osjs.register(DesktopServiceProvider)
  osjs.register(VFSServiceProvider)
  osjs.register(NotificationServiceProvider)
  osjs.register(SettingsServiceProvider, { before: true })
  osjs.register(PanelServiceProvider)
  osjs.register(DialogServiceProvider)
  osjs.register(GUIServiceProvider)
  osjs.boot()
}

window.addEventListener('DOMContentLoaded', () => init())
