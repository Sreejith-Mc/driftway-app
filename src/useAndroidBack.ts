import { useEffect, useRef } from 'react'
import { Capacitor } from '@capacitor/core'
import { App } from '@capacitor/app'

// Wires the Android hardware back button to the app. `handler` should close the
// topmost open layer (modal, drawer, palette) and return true if it consumed
// the press; returning false lets the app exit. No-op on web and iOS.
export function useAndroidBack(handler: () => boolean) {
  const ref = useRef(handler)
  ref.current = handler

  useEffect(() => {
    if (Capacitor.getPlatform() !== 'android') return
    let remove: (() => void) | undefined
    App.addListener('backButton', () => {
      if (!ref.current()) App.exitApp()
    }).then((h) => {
      remove = h.remove
    })
    return () => {
      remove?.()
    }
  }, [])
}
