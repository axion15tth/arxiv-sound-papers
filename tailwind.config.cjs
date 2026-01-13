/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // ダークモードをクラスベースで有効化
  theme: {
    extend: {
      colors: {
        // Magmaスペクトログラム風カラーパレット（最適化版）
        primary: {
          50: '#fefdfb',   // ほぼ白（スペクトログラム最高輝度）
          100: '#fcf6e8',  // 非常に淡いクリーム
          200: '#f5d9c5',  // 淡いピーチ
          300: '#e8a0a8',  // 淡いローズ
          400: '#c76b9e',  // マゼンタローズ
          500: '#9b4f96',  // マゼンタ紫（メイン）
          600: '#6b3884',  // 深い紫
          700: '#3f2666',  // 濃い紫
          800: '#1f1341',  // 非常に濃い紫
          900: '#0a0518',  // ほぼ黒の紫（スペクトログラム最低輝度）
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'wave': 'wave 8s ease-in-out infinite',
      },
      keyframes: {
        wave: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
