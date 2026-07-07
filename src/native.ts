// Native-shell wiring. Every call is guarded by isNativePlatform(), so this
// file is inert on the web build and only does work inside the iOS/Android app.
import { Capacitor } from '@capacitor/core'
import { StatusBar, Style } from '@capacitor/status-bar'
import { SplashScreen } from '@capacitor/splash-screen'

// Keep the status bar readable and colour-matched to the current theme.
function syncStatusBar() {
  const night = document.documentElement.dataset.theme === 'night'
  StatusBar.setStyle({ style: night ? Style.Dark : Style.Light }).catch(() => {})
  // setBackgroundColor is Android-only; it throws a no-op on iOS.
  if (Capacitor.getPlatform() === 'android') {
    StatusBar.setBackgroundColor({ color: night ? '#00332e' : '#f0ede4' }).catch(() => {})
  }
}

export function initNative() {
  if (!Capacitor.isNativePlatform()) return

  // The web view sits below the status bar (we don't draw under it).
  StatusBar.setOverlaysWebView({ overlay: false }).catch(() => {})
  syncStatusBar()

  // Re-tint the status bar whenever the app flips day/night.
  const observer = new MutationObserver(syncStatusBar)
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })

  // Hide the splash once the first paint is up.
  requestAnimationFrame(() => SplashScreen.hide().catch(() => {}))
}
