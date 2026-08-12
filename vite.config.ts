import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import fs from 'fs'

const files = [
  ['/Users/mohammedjarirkhan/.gemini/antigravity-ide/brain/a893be57-f4de-4044-9818-60a8d6ccdfd7/earth_sunrise_1786541322256.png', './public/earth_sunrise.png'],
  ['/Users/mohammedjarirkhan/.gemini/antigravity-ide/brain/a893be57-f4de-4044-9818-60a8d6ccdfd7/earth_morning_1786541475176.png', './public/earth_morning.png'],
  ['/Users/mohammedjarirkhan/.gemini/antigravity-ide/brain/a893be57-f4de-4044-9818-60a8d6ccdfd7/earth_noon_1786541494505.png', './public/earth_noon.png'],
  ['/Users/mohammedjarirkhan/.gemini/antigravity-ide/brain/a893be57-f4de-4044-9818-60a8d6ccdfd7/earth_evening_1786541509868.png', './public/earth_evening.png'],
  ['/Users/mohammedjarirkhan/.gemini/antigravity-ide/brain/a893be57-f4de-4044-9818-60a8d6ccdfd7/earth_sunset_1786541531778.png', './public/earth_sunset.png']
];

files.forEach(([src, dest]) => {
  try {
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, dest);
    }
  } catch (e) {
    console.error('Failed to copy', src, e);
  }
});

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
