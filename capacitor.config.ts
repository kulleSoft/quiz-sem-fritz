import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.d0e1c1cb0c254296bb1114fdeb63c097',
  appName: 'quiz-sem-fritz',
  webDir: 'dist',
  server: {
    url: 'https://d0e1c1cb-0c25-4296-bb11-14fdeb63c097.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  bundledWebRuntime: false
};

export default config;