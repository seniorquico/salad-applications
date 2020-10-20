import osjs from 'osjs'
import metadata from '../metadata.json'

const register = (core, args, options, metadata) => {
  const proc = core
    .make('osjs/application', { args, options, metadata })
    .on('attention', () => {
      if (window) {
        if (windowVisible) {
          window.focus()
        } else {
          window.raise()
          window.focus()
          windowVisible = true
        }
      }
    })
    .on('create-window', () => {
      setTimeout(() => {
        showNotification({
          id: '1',
          message: 'Salad has started!',
          timeout: 0,
        })
      }, 5000)
    })
    .on('destroy-window', () => {
      Object.keys(notifications).forEach((notificationId) => {
        const notification = notifications[notificationId]
        if (!notification.destroyed) {
          notification.destroy()
        }

        delete notifications[notificationId]
      })
      tray.destroy()
      proc.destroy()
    })

  let windowDestroy = false
  let windowVisible = true
  const window = proc
    .createWindow({
      attributes: { gravity: 'center' },
      dimension: { width: 1440, height: 810 },
      icon: proc.resource(metadata.icon),
      id: 'SaladWindow',
      ondestroy: () => windowDestroy,
      title: metadata.title.en_EN,
    })
    .on('close', () => {
      if (!windowDestroy && window) {
        window.blur()
        window.minimize()
        windowVisible = false
      }
    })
    .on('minimize', () => {
      windowVisible = false
    })
    .on('raise', () => {
      windowVisible = true
    })
    .render(($content) => {
      const iframe = document.createElement('iframe')
      iframe.setAttribute('border', '0')
      iframe.style.width = '100%'
      iframe.style.height = '100%'
      iframe.src = 'https://app.salad.io'
      $content.appendChild(iframe)
    })

  const tray = core.make('osjs/tray').create({
    title: 'Salad',
    icon: proc.resource(metadata.icon),
    onclick: () => {
      if (window) {
        if (windowVisible) {
          window.focus()
        } else {
          window.raise()
          window.focus()
          windowVisible = true
        }
      }
    },
    oncontextmenu: (ev) => {
      ev.preventDefault() // Suppress the web browser context menu.
      ev.stopPropagation() // Suppress the OS.js menu bar context menu.
      core.make('osjs/contextmenu', {
        position: ev,
        menu: [
          {
            label: windowVisible ? 'Hide Salad Window' : 'Show Salad Window',
            onclick: () => {
              if (window) {
                if (windowVisible) {
                  window.blur()
                  window.minimize()
                  windowVisible = false
                } else {
                  window.raise()
                  window.focus()
                  windowVisible = true
                }
              }
            },
          },
          {
            type: 'separator',
          },
          {
            label: 'Exit',
            onclick: () => {
              if (window) {
                windowDestroy = true
                window.destroy()
              }
            },
          },
        ],
      })
    },
  })

  const notifications = {}
  function showNotification({ id, message, timeout }) {
    // Prune old notifications.
    Object.keys(notifications).forEach((notificationId) => {
      const notification = notifications[notificationId]
      if (notification.destroyed) {
        delete notifications[notificationId]
      }
    })

    // Destroy existing notification with same identifier.
    let notification = notifications[id]
    if (notification) {
      notification.destroy()
    }

    // Create new notification.
    notification = core.make('osjs/notification', {
      icon: proc.resource(metadata.icon),
      message,
      timeout,
    })
    notifications[id] = notification
  }

  return proc
}

osjs.register(metadata.name, register)
