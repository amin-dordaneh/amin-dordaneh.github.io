<template>
  <div 
    :dir="lang === 'fa' ? 'rtl' : 'ltr'" 
    :class="[lang === 'fa' ? 'font-fa' : 'font-en']"
    class="relative min-h-screen bg-[#010409] text-[#e2e8f0] selection:bg-[#8b5cf6] selection:text-white overflow-x-hidden transition-all duration-300"
  >
    <!-- Imports for Clean Fonts: Plus Jakarta Sans, Yekan Bakh, JetBrains Mono, Vazirmatn -->
    <component :is="'style'">
      @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Plus+Jakarta+Sans:wght@300;400;600;700;800&family=Vazirmatn:wght@300;400;600;800;900&display=swap');
      @import url('https://cdn.jsdelivr.net/gh/rastikerdar/vazirmatn@v33.003/Vazirmatn-font-face.css');
      @import url('https://cdn.jsdelivr.net/gh/amin-dordaneh/fonts/yekan-bakh.css');

      .font-en { font-family: 'Plus Jakarta Sans', sans-serif; }
      .font-fa { font-family: 'Yekan Bakh', 'Vazirmatn', sans-serif !important; }
      .font-mono { font-family: 'JetBrains Mono', monospace !important; }

      /* Smooth Scroll Reveal */
      .reveal {
        opacity: 0;
        transform: translateY(35px) scale(0.97);
        transition: opacity 0.85s cubic-bezier(0.16, 1, 0.3, 1), transform 0.85s cubic-bezier(0.16, 1, 0.3, 1);
        will-change: opacity, transform;
      }

      .reveal-active {
        opacity: 1;
        transform: translateY(0) scale(1);
      }

      /* Glowing Cyber Borders & Glassmorphism */
      .glass-card {
        background: rgba(15, 23, 42, 0.45);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        border: 1px solid rgba(139, 92, 246, 0.18);
        box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
        transform-style: preserve-3d;
        perspective: 1000px;
      }

      .glass-card:hover {
        border-color: rgba(244, 63, 94, 0.45);
        box-shadow: 0 0 25px rgba(244, 63, 94, 0.15), inset 0 0 15px rgba(139, 92, 246, 0.1);
      }

      .text-glow {
        text-shadow: 0 0 20px rgba(192, 132, 252, 0.5);
      }

      .text-glow-rose {
        text-shadow: 0 0 20px rgba(244, 63, 94, 0.5);
      }

      /* Logo Hover Animation */
      .logo-icon:hover .logo-core {
        fill: #f43f5e;
        filter: drop-shadow(0 0 8px #f43f5e);
      }
    </component>

    <!-- Three.js Interactive 3D Canvas -->
    <canvas ref="canvasRef" class="fixed top-0 left-0 w-full h-full pointer-events-none z-0 opacity-85"></canvas>

    <!-- Cyber Background Overlay Grid & Ambient Lights -->
    <div class="fixed inset-0 bg-[radial-gradient(ellipse_at_center,transparent_10%,#010409_85%)] pointer-events-none z-0"></div>
    <div class="fixed inset-0 bg-[linear-gradient(to_right,#1e1b4b12_1px,transparent_1px),linear-gradient(to_bottom,#1e1b4b12_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none z-0"></div>

    <div class="relative z-10 max-w-6xl mx-auto px-6 py-10">
      <!-- Navbar -->
      <header class="flex flex-col md:flex-row items-center justify-between gap-4 pb-6 border-b border-[#1e1b4b]/80 mb-16 backdrop-blur-2xl">
        
        <!-- Logo Section -->
        <a href="#about" class="flex items-center gap-3.5 group cursor-pointer">
          <div class="relative w-10 h-10 flex items-center justify-center rounded-xl bg-[#0d1527] border border-[#8b5cf6]/40 group-hover:border-[#f43f5e] shadow-lg shadow-[#8b5cf6]/20 transition-all duration-300">
            <!-- Custom Vector Cyber Logo (A + Code Core) -->
            <svg class="w-6 h-6 logo-icon transition-transform duration-300 group-hover:scale-110" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M50 12L85 82H66L50 50L34 82H15L50 12Z" fill="url(#logo_grad)" />
              <path d="M38 62H62L50 38L38 62Z" fill="#010409" />
              <circle class="logo-core transition-all duration-300" cx="50" cy="53" r="6" fill="#c084fc" />
              <defs>
                <linearGradient id="logo_grad" x1="15" y1="12" x2="85" y2="82" gradientUnits="userSpaceOnUse">
                  <stop stop-color="#8B5CF6"/>
                  <stop offset="1" stop-color="#F43F5E"/>
                </linearGradient>
              </defs>
            </svg>
            <span class="absolute -bottom-1 -right-1 flex h-2.5 w-2.5">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#f43f5e] opacity-75"></span>
              <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#f43f5e]"></span>
            </span>
          </div>
          <div>
            <span class="text-sm font-extrabold tracking-wider text-white group-hover:text-[#c084fc] transition-colors block">
              AMIN DORDANEH
            </span>
            <span class="text-[10px] font-mono tracking-widest text-[#64748b] uppercase block">
              {{ lang === 'fa' ? 'سیستم فعال // توسعه‌دهنده' : 'CORE_SYS // FULL_STACK' }}
            </span>
          </div>
        </a>

        <!-- Galaxy Theme Controls -->
        <div class="flex items-center gap-2 bg-[#0a0f1d]/80 p-1.5 rounded-2xl border border-[#1e1b4b]">
          <span class="text-[10px] font-mono text-[#64748b] px-2">// {{ t.themeLabel }}:</span>
          <button 
            v-for="theme in galaxyThemes" 
            :key="theme.id"
            @click="changeGalaxyTheme(theme.id)"
            :class="[activeTheme === theme.id ? 'ring-2 ring-white scale-110' : 'opacity-60 hover:opacity-100']"
            class="w-5 h-5 rounded-full transition-all duration-300"
            :style="{ background: theme.preview }"
            :title="theme.name"
          ></button>
        </div>

        <div class="flex items-center gap-6">
          <nav class="hidden lg:flex items-center gap-6 text-xs font-mono text-[#94a3b8]">
            <a href="#about" class="hover:text-[#c084fc] transition-colors">// {{ t.nav.about }}</a>
            <a href="#galaxy" class="hover:text-[#c084fc] transition-colors">// {{ t.nav.webgl }}</a>
            <a href="#terminal" class="hover:text-[#c084fc] transition-colors">// {{ t.nav.terminal }}</a>
            <a href="#contact" class="hover:text-[#c084fc] transition-colors">// {{ t.nav.contact }}</a>
          </nav>

          <!-- Language Switcher -->
          <button 
            @click="toggleLang" 
            class="px-4 py-2 rounded-xl bg-[#0d1527]/90 hover:bg-[#1e1b4b] border border-[#8b5cf6]/50 text-xs font-mono text-[#f43f5e] font-bold shadow-lg shadow-[#8b5cf6]/20 hover:shadow-[#f43f5e]/30 transition-all backdrop-blur-md flex items-center gap-2 group"
          >
            <span class="text-[#c084fc] group-hover:rotate-180 transition-transform duration-500">🌐</span>
            <span>{{ lang === 'fa' ? 'English (EN)' : 'فارسی (FA)' }}</span>
          </button>
        </div>
      </header>

      <!-- Hero Section -->
      <section id="about" class="space-y-8 mb-32 reveal">
        <div class="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[#1e1b4b]/60 border border-[#8b5cf6]/40 text-xs font-mono text-[#c084fc] backdrop-blur-md shadow-lg shadow-[#8b5cf6]/10">
          <span class="w-2 h-2 rounded-full bg-[#f43f5e] animate-pulse shadow-[0_0_8px_#f43f5e]"></span>
          {{ t.hero.badge }}
        </div>
        
        <h1 class="text-5xl sm:text-8xl font-black tracking-tight text-white leading-tight">
          {{ t.hero.name }}
          <span class="block text-transparent bg-clip-text bg-gradient-to-r from-[#c084fc] via-[#f43f5e] to-[#38bdf8] text-2xl sm:text-5xl mt-3 font-mono font-bold text-glow">
            {{ t.hero.subtitle }}
          </span>
        </h1>

        <p class="text-xl sm:text-2xl text-[#94a3b8] font-light max-w-4xl leading-relaxed">
          {{ t.hero.descStart }}
          <strong class="text-white font-medium border-b border-[#8b5cf6] pb-0.5">{{ t.hero.highlight1 }}</strong>
          {{ t.hero.descMiddle }}
          <strong class="text-white font-medium border-b border-[#f43f5e] pb-0.5">{{ t.hero.highlight2 }}</strong>
          {{ t.hero.descAnd }}
          <strong class="text-white font-medium border-b border-[#38bdf8] pb-0.5">{{ t.hero.highlight3 }}</strong>.
        </p>

        <!-- Stats Grid -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
          <div v-for="stat in t.stats" :key="stat.label" class="glass-card p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1">
            <div class="text-3xl sm:text-4xl font-black font-mono" :class="stat.color">{{ stat.value }}</div>
            <div class="text-xs font-mono text-[#94a3b8] mt-2">{{ stat.label }}</div>
          </div>
        </div>

        <div class="flex flex-wrap gap-4 pt-2 font-mono text-sm">
          <a href="#contact" class="px-8 py-4 rounded-xl bg-gradient-to-r from-[#8b5cf6] to-[#f43f5e] text-white font-bold transition-all transform hover:-translate-y-1 shadow-lg shadow-[#8b5cf6]/30 hover:shadow-[#f43f5e]/40 flex items-center gap-3">
            <span>{{ t.hero.contactBtn }}</span>
            <span>⚡</span>
          </a>
          <button @click="copyEmail" class="px-8 py-4 rounded-xl glass-card text-[#e2e8f0] border border-[#8b5cf6]/40 hover:border-[#f43f5e]/60 transition-all backdrop-blur-md flex items-center gap-3">
            <span>{{ copied ? t.hero.copied : t.hero.copyBtn }}</span>
          </button>
        </div>
      </section>

      <!-- Three.js Showcase Section -->
      <section id="galaxy" class="mb-32 reveal">
        <div class="glass-card p-8 sm:p-12 rounded-3xl relative overflow-hidden group transition-all duration-500 shadow-2xl">
          <div class="absolute -right-20 -top-20 w-64 h-64 bg-[#f43f5e]/10 rounded-full blur-3xl group-hover:bg-[#8b5cf6]/20 transition-all duration-700"></div>
          
          <div class="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6 relative z-10">
            <div>
              <span class="text-xs font-mono text-[#f43f5e] uppercase tracking-widest">// {{ t.galaxy.tag }}</span>
              <h2 class="text-3xl sm:text-4xl font-extrabold text-white mt-1">{{ t.galaxy.title }}</h2>
            </div>
            <div class="px-4 py-2 rounded-xl bg-[#010409]/80 border border-[#8b5cf6]/40 text-xs font-mono text-[#c084fc] shadow-inner">
              {{ t.galaxy.badge }}
            </div>
          </div>
          <p class="text-[#94a3b8] leading-relaxed text-base max-w-3xl relative z-10">
            {{ t.galaxy.desc }}
          </p>
        </div>
      </section>

      <!-- Interactive Cyber Terminal -->
      <section id="terminal" class="mb-32 reveal">
        <div class="rounded-3xl bg-[#030712] border border-[#1e1b4b] overflow-hidden shadow-2xl font-mono text-sm shadow-[#8b5cf6]/10">
          <div class="px-6 py-4 bg-[#090d1f] border-b border-[#1e1b4b] flex items-center justify-between" dir="ltr">
            <div class="flex items-center gap-2">
              <span class="w-3 h-3 rounded-full bg-[#f43f5e]"></span>
              <span class="w-3 h-3 rounded-full bg-[#eab308]"></span>
              <span class="w-3 h-3 rounded-full bg-[#22c55e]"></span>
              <span class="text-xs text-[#94a3b8] ml-2">amin@core-system:~</span>
            </div>
            <span class="text-xs text-[#64748b]">Type 'help' for commands</span>
          </div>
          <div class="p-6 space-y-4 max-h-80 overflow-y-auto text-[#cbd5e1]" dir="ltr">
            <p class="text-[#8b5cf6]">Welcome to Amin Dordaneh CLI v3.0. Type <span class="text-[#f43f5e] font-bold">'help'</span> for commands.</p>
            <div v-for="(log, index) in terminalLogs" :key="index" class="space-y-1">
              <div class="flex items-center gap-2 text-[#64748b]">
                <span class="text-[#f43f5e]">&gt;</span>
                <span>{{ log.cmd }}</span>
              </div>
              <div class="text-[#94a3b8] whitespace-pre-line pl-4 border-l-2 border-[#8b5cf6]/30">{{ log.output }}</div>
            </div>
            <form @submit.prevent="handleTerminalSubmit" class="flex items-center gap-2 pt-2">
              <span class="text-[#f43f5e] font-bold">&gt;</span>
              <input v-model="terminalInput" type="text" placeholder="type command here..." class="bg-transparent border-none outline-none text-white flex-1 font-mono text-sm" />
            </form>
          </div>
        </div>
      </section>

      <!-- 3D Card Tilt Direct Contact Channels Section -->
      <section id="contact" class="mb-32 reveal">
        <div class="max-w-3xl mx-auto">
          <div 
            ref="tiltCardRef"
            @mousemove="handleCardTilt"
            @mouseleave="resetCardTilt"
            :style="cardTiltStyle"
            class="glass-card p-8 sm:p-12 rounded-3xl relative border border-[#8b5cf6]/30 shadow-2xl transition-transform duration-200 ease-out"
          >
            <div class="mb-8">
              <span class="text-xs font-mono text-[#f43f5e] uppercase tracking-widest">// {{ t.contact.tag }}</span>
              <h2 class="text-3xl sm:text-4xl font-black text-white mt-1">{{ t.contact.title }}</h2>
              <p class="text-sm text-[#94a3b8] mt-2">{{ t.contact.subtitle }}</p>
            </div>

            <!-- Contact Channels Grid -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-sm">
              <!-- Phone Number -->
              <div class="p-5 rounded-2xl bg-[#010409]/80 border border-[#1e1b4b] hover:border-[#f43f5e]/60 transition-all group flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <span class="text-2xl">📞</span>
                  <div>
                    <div class="text-[10px] text-[#64748b] uppercase">// {{ t.contact.phoneLabel }}</div>
                    <a href="tel:+989390884281" class="text-white font-bold group-hover:text-[#f43f5e] transition-colors" dir="ltr">+98 939 088 4281</a>
                  </div>
                </div>
                <button @click="copyPhone" class="px-3 py-1.5 rounded-lg bg-[#1e1b4b]/60 hover:bg-[#8b5cf6]/20 text-xs text-[#c084fc] border border-[#8b5cf6]/30 transition-all">
                  {{ copiedPhone ? t.contact.copied : t.contact.copy }}
                </button>
              </div>

              <!-- Telegram -->
              <a href="https://t.me/mlity_2000" target="_blank" class="p-5 rounded-2xl bg-[#010409]/80 border border-[#1e1b4b] hover:border-[#38bdf8]/60 transition-all group flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <span class="text-2xl">✈️</span>
                  <div>
                    <div class="text-[10px] text-[#64748b] uppercase">// TELEGRAM</div>
                    <div class="text-white font-bold group-hover:text-[#38bdf8] transition-colors" dir="ltr">@mlity_2000</div>
                  </div>
                </div>
                <span class="text-xs text-[#38bdf8] opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
              </a>

              <!-- Instagram -->
              <a href="https://instagram.com/mlity_2000" target="_blank" class="p-5 rounded-2xl bg-[#010409]/80 border border-[#1e1b4b] hover:border-[#f43f5e]/60 transition-all group flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <span class="text-2xl">📸</span>
                  <div>
                    <div class="text-[10px] text-[#64748b] uppercase">// INSTAGRAM</div>
                    <div class="text-white font-bold group-hover:text-[#f43f5e] transition-colors" dir="ltr">@mlity_2000</div>
                  </div>
                </div>
                <span class="text-xs text-[#f43f5e] opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
              </a>

              <!-- GitHub -->
              <a href="https://github.com/amin-dordaneh" target="_blank" class="p-5 rounded-2xl bg-[#010409]/80 border border-[#1e1b4b] hover:border-[#c084fc]/60 transition-all group flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <span class="text-2xl">🐙</span>
                  <div>
                    <div class="text-[10px] text-[#64748b] uppercase">// GITHUB</div>
                    <div class="text-white font-bold group-hover:text-[#c084fc] transition-colors" dir="ltr">amin-dordaneh</div>
                  </div>
                </div>
                <span class="text-xs text-[#c084fc] opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <!-- Footer -->
      <footer class="pt-10 border-t border-[#1e1b4b] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#94a3b8]">
        <div>AMIN DORDANEH © {{ new Date().getFullYear() }}</div>
        <div>CRAFTED WITH NUXT 3, THREE.JS & TAILWIND</div>
      </footer>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import * as THREE from 'three'

// Dynamic Meta and Favicon Setup
useHead({
  title: 'Amin Dordaneh — Senior Full-Stack & 3D WebGL Engineer',
  meta: [
    { name: 'description', content: 'Portfolio of Amin Dordaneh: Senior Full-Stack Engineer specializing in Custom PHP MVC Engines, Vue 3, Nuxt 3 & Interactive Three.js WebGL Experiences.' },
    { property: 'og:title', content: 'Amin Dordaneh — Full-Stack & 3D WebGL Engineer' },
    { property: 'og:description', content: 'Custom PHP MVC engines & 3D interactive WebGL web apps.' },
    { property: 'og:type', content: 'website' }
  ],
  link: [
    {
      rel: 'icon',
      type: 'image/svg+xml',
      href: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path d="M50 12L85 82H66L50 50L34 82H15L50 12Z" fill="%238B5CF6"/><circle cx="50" cy="53" r="6" fill="%23F43F5E"/></svg>'
    }
  ]
})

const canvasRef = ref(null)
const tiltCardRef = ref(null)
const copied = ref(false)
const copiedPhone = ref(false)
const lang = ref('en')
const activeTheme = ref('rose')

const copyPhone = () => {
  navigator.clipboard.writeText('+989390884281')
  copiedPhone.value = true
  setTimeout(() => copiedPhone.value = false, 3000)
}

const cardTiltStyle = ref({
  transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)'
})

const handleCardTilt = (e) => {
  if (!tiltCardRef.value) return
  const rect = tiltCardRef.value.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top
  
  const centerX = rect.width / 2
  const centerY = rect.height / 2
  
  const rotateX = ((y - centerY) / centerY) * -12
  const rotateY = ((x - centerX) / centerX) * 12

  cardTiltStyle.value = {
    transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`
  }
}

const resetCardTilt = () => {
  cardTiltStyle.value = {
    transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
  }
}

const toggleLang = () => {
  lang.value = lang.value === 'fa' ? 'en' : 'fa'
}

const galaxyThemes = [
  { id: 'rose', name: 'Neon Rose', preview: 'linear-gradient(135deg, #f43f5e, #8b5cf6)', inside: '#f43f5e', outside: '#8b5cf6' },
  { id: 'cyber', name: 'Cyberpunk', preview: 'linear-gradient(135deg, #06b6d4, #a855f7)', inside: '#06b6d4', outside: '#a855f7' },
  { id: 'amber', name: 'Gold Amber', preview: 'linear-gradient(135deg, #f59e0b, #ef4444)', inside: '#f59e0b', outside: '#ef4444' },
  { id: 'matrix', name: 'Matrix Green', preview: 'linear-gradient(135deg, #10b981, #06b6d4)', inside: '#10b981', outside: '#06b6d4' }
]

const translations = {
  en: {
    themeLabel: 'GALAXY_THEME',
    nav: { about: 'ABOUT', webgl: 'WEBGL', terminal: 'TERMINAL', contact: 'CONTACT' },
    hero: {
      badge: 'Senior Full-Stack Developer & Three.js Engineer • 7+ Years Exp',
      name: 'AMIN DORDANEH',
      subtitle: 'High-Performance Systems & Interactive 3D Web',
      descStart: 'Specializing in zero-framework ',
      highlight1: 'Custom Native PHP MVC Engines',
      descMiddle: ' built for sub-10ms response times, reactive ',
      highlight2: 'Vue 3 / Nuxt 3',
      descAnd: ' web apps, and immersive ',
      highlight3: 'Three.js 3D WebGL experiences',
      contactBtn: 'DIRECT_CONNECT',
      copyBtn: 'COPY_EMAIL',
      copied: 'COPIED!'
    },
    stats: [
      { label: 'Years Experience', value: '7+', color: 'text-[#c084fc] text-glow' },
      { label: 'MVC Response Time', value: '<10ms', color: 'text-[#f43f5e] text-glow-rose' },
      { label: 'Rendered 3D Particles', value: '50K+', color: 'text-[#38bdf8]' },
      { label: 'Enterprise Plugins', value: '10+', color: 'text-[#a7f3d0]' }
    ],
    galaxy: {
      tag: 'THREE.JS DYNAMIC MATRIX',
      title: '50,000 Particle Massive Spiral Galaxy',
      badge: 'Interactive WebGL Engine',
      desc: 'An immersive deep-space spiral galaxy rendering 50,000 volumetric particle nodes paired with an interactive quantum cyber-core with orbiting rings that dynamically responds to user color theme selections.'
    },
    contact: {
      tag: 'DIRECT COMMUNICATION CHANNELS',
      title: 'Get In Touch',
      subtitle: 'Connect directly via direct messaging, social channels, or repository.',
      phoneLabel: 'DIRECT PHONE',
      copy: 'COPY',
      copied: 'COPIED!'
    }
  },
  fa: {
    themeLabel: 'تم کهکشان',
    nav: { about: 'درباره من', webgl: 'کهکشان', terminal: 'ترمینال', contact: 'ارتباط با من' },
    hero: {
      badge: 'ارشد Full-Stack & مهندس گرافیک ۳D • بیش از ۷ سال سابقه',
      name: 'امین دردانه',
      subtitle: 'معماری سیستم‌های پرسرعت و وب‌اپ‌های سه‌بعدی تعاملی',
      descStart: 'تخصص ویژه در طراحی و توسعه ',
      highlight1: 'فریم‌ورک‌های اختصاصی PHP MVC',
      descMiddle: ' با زمان پاسخ زیر ۱۰ میلی‌ثانیه، برنامه‌های واکنشگرای ',
      highlight2: 'Vue 3 / Nuxt 3',
      descAnd: ' و وب‌سایت‌های سه‌بعدی هیجان‌انگیز با ',
      highlight3: 'Three.js / WebGL',
      contactBtn: 'ارتباط مستقیم',
      copyBtn: 'کپی ایمیل ارتباطی',
      copied: 'ایمیل کپی شد!'
    },
    stats: [
      { label: 'سال سابقه نرم‌افزاری', value: '+۷', color: 'text-[#c084fc] text-glow' },
      { label: 'زمان پاسخگویی MVC', value: '<۱۰ms', color: 'text-[#f43f5e] text-glow-rose' },
      { label: 'ذرات سه بعدی رندر شده', value: '۵۰K+', color: 'text-[#38bdf8]' },
      { label: 'افزونه اختصاصی اکوسیستم', value: '+۱۰', color: 'text-[#a7f3d0]' }
    ],
    galaxy: {
      tag: 'موتور گرافیکی THREE.JS',
      title: 'کهکشان عظیم ۵۰,۰۰۰ ذره‌ای با تغییر پلت رنگ',
      badge: 'رندر زنده ۶۰ فریم',
      desc: 'کهکشان عمیق سه بعدی متراکم با ۵۰ هزار ذره، هسته کوانتومی و حلقه‌های مداری متحرک که با کلیک شما روی تم‌ها، پلت رنگی کل فضا تغییر می‌کند.'
    },
    contact: {
      tag: 'کانال‌های ارتباط مستقیم',
      title: 'پل‌های ارتباط با من',
      subtitle: 'از طریق تماس تلفنی، شبکه‌های اجتماعی یا بررسی مخزن گیت‌هاب در ارتباط باشید.',
      phoneLabel: 'شماره تماس مستقیم',
      copy: 'کپی',
      copied: 'کپی شد!'
    }
  }
}

const t = computed(() => translations[lang.value])

// Terminal State
const terminalInput = ref('')
const terminalLogs = ref([
  { cmd: 'info', output: 'Amin Dordaneh — Senior Full-Stack Engineer.\nSpecialized in Custom PHP MVC Engines, Vue.js/Nuxt 3 & WebGL.' }
])

const copyEmail = () => {
  navigator.clipboard.writeText('amin.dordaneh@gmail.com')
  copied.value = true
  setTimeout(() => copied.value = false, 3000)
}

const handleTerminalSubmit = () => {
  const cmd = terminalInput.value.trim().toLowerCase()
  let output = ''

  switch (cmd) {
    case 'help':
      output = 'Available commands: info, skills, experience, contact, clear'
      break
    case 'skills':
      output = '• Frontend: Vue 3, Nuxt 3, TypeScript, Three.js, WebGL, Tailwind CSS\n• Backend: Pure PHP MVC, MySQL Architecture, Python, C++, REST APIs\n• Ecosystem: Custom WP Plugins, WooCommerce Importers, Telegram Bots'
      break
    case 'experience':
      output = '7+ Years of Senior Software Engineering.\nBuilt custom PHP MVC systems handling high-traffic platforms & enterprise WooCommerce setups.'
      break
    case 'contact':
      output = 'GitHub: https://github.com/amin-dordaneh\nTelegram: https://t.me/mlity_2000\nPhone: +989390884281'
      break
    case 'clear':
      terminalLogs.value = []
      terminalInput.value = ''
      return
    default:
      output = `Command not recognized: '${cmd}'. Type 'help' for available commands.`
  }

  terminalLogs.value.push({ cmd: terminalInput.value, output })
  terminalInput.value = ''
}

// Three.js Interactive Engine
let animationFrameId = null
let renderer, scene, camera, points, cyberCore, originalPositions, galaxyGeo, galaxyParams
let orbitRings = []

const changeGalaxyTheme = (themeId) => {
  activeTheme.value = themeId
  const selectedTheme = galaxyThemes.find(t => t.id === themeId)
  if (!selectedTheme || !galaxyGeo) return

  const colorInside = new THREE.Color(selectedTheme.inside)
  const colorOutside = new THREE.Color(selectedTheme.outside)

  const colors = galaxyGeo.attributes.color.array

  for (let i = 0; i < galaxyParams.count; i++) {
    const i3 = i * 3
    const radius = Math.sqrt(
      Math.pow(galaxyGeo.attributes.position.array[i3], 2) +
      Math.pow(galaxyGeo.attributes.position.array[i3 + 2], 2)
    )

    const mixedColor = colorInside.clone().lerp(colorOutside, radius / galaxyParams.radius)
    colors[i3] = mixedColor.r
    colors[i3 + 1] = mixedColor.g
    colors[i3 + 2] = mixedColor.b
  }

  galaxyGeo.attributes.color.needsUpdate = true
  cyberCore.material.color = colorInside
  
  orbitRings.forEach(ring => {
    ring.material.color = colorInside
  })
}

onMounted(() => {
  if (!canvasRef.value) return

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('reveal-active')
    })
  }, { threshold: 0.1 })

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el))

  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000)
  camera.position.z = 4.2

  renderer = new THREE.WebGLRenderer({ canvas: canvasRef.value, alpha: true, antialias: true })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

  galaxyParams = {
    count: 50000,
    size: 0.008,
    radius: 9.5,
    branches: 4,
    spin: 1.5,
    randomness: 0.7,
    power: 3.8
  }

  galaxyGeo = new THREE.BufferGeometry()
  const positions = new Float32Array(galaxyParams.count * 3)
  const colors = new Float32Array(galaxyParams.count * 3)

  const colorInside = new THREE.Color('#f43f5e')
  const colorOutside = new THREE.Color('#8b5cf6')

  for (let i = 0; i < galaxyParams.count; i++) {
    const i3 = i * 3
    const radius = Math.random() * galaxyParams.radius
    const spinAngle = radius * galaxyParams.spin
    const branchAngle = ((i % galaxyParams.branches) / galaxyParams.branches) * Math.PI * 2

    const randomX = Math.pow(Math.random(), galaxyParams.power) * (Math.random() < 0.5 ? 1 : -1) * galaxyParams.randomness * radius
    const randomY = Math.pow(Math.random(), galaxyParams.power) * (Math.random() < 0.5 ? 1 : -1) * galaxyParams.randomness * radius
    const randomZ = Math.pow(Math.random(), galaxyParams.power) * (Math.random() < 0.5 ? 1 : -1) * galaxyParams.randomness * radius

    positions[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX
    positions[i3 + 1] = randomY
    positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ

    const mixedColor = colorInside.clone().lerp(colorOutside, radius / galaxyParams.radius)
    colors[i3] = mixedColor.r
    colors[i3 + 1] = mixedColor.g
    colors[i3 + 2] = mixedColor.b
  }

  galaxyGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  galaxyGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3))

  const galaxyMat = new THREE.PointsMaterial({
    size: galaxyParams.size,
    sizeAttenuation: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexColors: true,
    transparent: true,
    opacity: 0.85
  })

  points = new THREE.Points(galaxyGeo, galaxyMat)
  points.rotation.x = 0.85
  scene.add(points)

  // Quantum Cyber Core Sphere
  const sphereGeo = new THREE.IcosahedronGeometry(0.8, 4)
  originalPositions = Float32Array.from(sphereGeo.attributes.position.array)
  
  const coreMat = new THREE.PointsMaterial({
    size: 0.02,
    color: 0xf43f5e,
    blending: THREE.AdditiveBlending,
    transparent: true,
    opacity: 0.95
  })
  
  cyberCore = new THREE.Points(sphereGeo, coreMat)
  cyberCore.position.set(2.2, 0.4, 0)
  scene.add(cyberCore)

  // Create Orbit Rings around Cyber Core
  const ringRadii = [1.2, 1.5, 1.8]
  const ringRotations = [
    { x: Math.PI / 3, y: Math.PI / 6 },
    { x: -Math.PI / 4, y: Math.PI / 3 },
    { x: Math.PI / 2, y: -Math.PI / 4 }
  ]

  orbitRings = ringRadii.map((r, index) => {
    const ringGeo = new THREE.RingGeometry(r, r + 0.015, 64)
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xf43f5e,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    })
    const ringMesh = new THREE.Mesh(ringGeo, ringMat)
    ringMesh.position.set(2.2, 0.4, 0)
    ringMesh.rotation.x = ringRotations[index].x
    ringMesh.rotation.y = ringRotations[index].y
    scene.add(ringMesh)
    return ringMesh
  })

  let mouseX = 0
  let mouseY = 0

  const onMouseMove = (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 0.6
    mouseY = (e.clientY / window.innerHeight - 0.5) * 0.6
  }

  window.addEventListener('mousemove', onMouseMove)

  const onResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  }

  window.addEventListener('resize', onResize)

  const clock = new THREE.Clock()

  const animate = () => {
    const time = clock.getElapsedTime()

    points.rotation.y = time * 0.025

    const posAttr = cyberCore.geometry.attributes.position
    const posArray = posAttr.array

    for (let i = 0; i < posArray.length; i += 3) {
      const uX = originalPositions[i]
      const uY = originalPositions[i + 1]
      const uZ = originalPositions[i + 2]

      const wave = Math.sin(time * 3 + uX * 4 + uY * 4) * 0.12
      posArray[i] = uX + uX * wave
      posArray[i + 1] = uY + uY * wave
      posArray[i + 2] = uZ + uZ * wave
    }
    posAttr.needsUpdate = true

    cyberCore.rotation.y = time * 0.2
    cyberCore.rotation.x = time * 0.1

    orbitRings.forEach((ring, idx) => {
      ring.rotation.z = time * (0.15 + idx * 0.08)
      ring.rotation.x += Math.sin(time * 0.5) * 0.002
    })

    points.rotation.x = 0.85 + mouseY * 0.2
    points.rotation.z = mouseX * 0.2

    renderer.render(scene, camera)
    animationFrameId = requestAnimationFrame(animate)
  }

  animate()

  onUnmounted(() => {
    observer.disconnect()
    window.removeEventListener('mousemove', onMouseMove)
    window.removeEventListener('resize', onResize)
    if (animationFrameId) cancelAnimationFrame(animationFrameId)
  })
})
</script>