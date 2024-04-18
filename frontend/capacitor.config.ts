import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'wheretoeat.pages.dev',
  appName: 'whereToEat',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
