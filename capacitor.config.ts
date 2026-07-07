import type { CapacitorConfig } from '@capacitor/cli'

// Native shell config for the iOS/Android builds. The web app in `dist` is
// bundled into the app; `VITE_CONVEX_URL` (set at build time) points it at the
// production Convex deployment, so live sync works exactly like the website.
const config: CapacitorConfig = {
  appId: 'com.driftway.app',
  appName: 'Driftway',
  webDir: 'dist',
  backgroundColor: '#f0ede4',
  plugins: {
    SplashScreen: {
      launchShowDuration: 700,
      backgroundColor: '#004741',
      showSpinner: false,
    },
    Keyboard: {
      // Resize the web view when the keyboard opens (native behaviour).
      resize: 'native',
    },
  },
}

export default config
