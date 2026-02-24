# Chetan Jadhav -Cyber-Theme-Portfolio Website

A stunning, animation-heavy, recruiter-ready personal portfolio website built with modern web technologies.

## 🚀 Features

### Visual Excellence
- **Full-Screen 3D Hero Section**: Animated orb with distortion effects using Three.js
- **Smooth Animations**: GSAP ScrollTrigger, Framer Motion for UI transitions
- **Glassmorphism Design**: Modern frosted glass effects with gradient borders
- **Responsive Design**: Optimized for mobile, tablet, and desktop

### Content Sections
1. **Hero** - Fullscreen 3D canvas with call-to-action buttons
2. **About** - Bio with animated statistics and personal story
3. **Skills** - Interactive skill cards with tech stack
4. **Projects** - Filterable project grid with category filters
5. **Experience** - Timeline of learning journey and achievements
6. **Contact** - Contact form with social links and email integration

### Performance Optimizations
- Lazy component loading
- Optimized Three.js rendering
- GSAP animations with performance focus
- Tailwind CSS for minimal CSS output
- Production-ready bundle optimization

## 🛠️ Tech Stack

### Core
- **React 18** - UI framework
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first styling

### 3D & Animation
- **Three.js** - 3D graphics
- **@react-three/fiber** - React renderer for Three.js
- **@react-three/drei** - Useful helpers and presets
- **GSAP** - Timeline and scroll animations
- **Framer Motion** - UI component animations
- **Lenis** - Smooth scrolling library

## 📦 Installation

### Prerequisites
- Node.js 16+ and npm/yarn installed

### Setup

```bash
# Navigate to project directory
cd /home/king/PROJECTS+DSA/Portfolio

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

The dev server will open at `http://localhost:3000`

## 🎨 Customization

### Colors
Edit `tailwind.config.js` to modify the color scheme:
```javascript
colors: {
  'accent-cyan': '#00f0ff',
  'accent-purple': '#c74dff',
  'accent-blue': '#4d7fff',
}
```

### Content
Update content in respective section files:
- `src/sections/About.jsx` - Bio and personal info
- `src/sections/Skills.jsx` - Skill categories and technologies
- `src/sections/Projects.jsx` - Project listings
- `src/sections/Experience.jsx` - Timeline and achievements
- `src/sections/Contact.jsx` - Contact information

### 3D Scene
Modify `src/sections/HeroScene.jsx` to change:
- 3D geometry and materials
- Lighting configuration
- Animation behavior

## 📁 Project Structure

```
portfolio/
├── src/
│   ├── components/
│   │   └── Navigation.jsx       # Sticky navigation with scroll effects
│   ├── sections/
│   │   ├── Hero.jsx            # Hero section with 3D canvas
│   │   ├── HeroScene.jsx        # Three.js scene component
│   │   ├── About.jsx            # About section with stats
│   │   ├── Skills.jsx           # Skills grid with categories
│   │   ├── Projects.jsx         # Projects showcase with filters
│   │   ├── Experience.jsx       # Timeline and achievements
│   │   └── Contact.jsx          # Contact form and links
│   ├── utils/
│   │   └── SmoothScroll.jsx     # Lenis smooth scroll wrapper
│   ├── App.jsx                  # Main app component
│   ├── index.css               # Global styles and Tailwind imports
│   └── main.jsx                # React entry point
├── index.html                  # HTML template
├── vite.config.js             # Vite configuration
├── tailwind.config.js         # Tailwind configuration
├── postcss.config.js          # PostCSS configuration
└── package.json               # Dependencies and scripts
```

## 🎯 Animation Details

### Page Load
- Staggered entrance animations for all sections
- Loading spinner with animated border

### Scroll Animations
- GSAP ScrollTrigger for section reveals
- Parallax effects on hero section
- Counter animations on statistics
- Timeline items animate on scroll

### Interactive Elements
- Button hover states with scale and shadow effects
- Card hover animations with glow effects
- Navigation bar background animation on scroll
- Smooth transitions between filtered project states

### 3D Animations
- Auto-rotating orb with mouse interaction
- Distortion material responding to animation loop
- Wireframe overlay with opacity effects
- Dynamic lighting with multiple point lights

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Netlify
1. Connect your GitHub repository
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Deploy!

### GitHub Pages
```bash
npm run build
# Deploy dist/ folder to GitHub Pages
```

## 📱 Browser Support
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari 14+, Chrome Mobile 90+)

## 🎓 Learning Resources

### Three.js & React Three Fiber
- [Three.js Documentation](https://threejs.org/docs/)
- [React Three Fiber Docs](https://docs.pmnd.rs/react-three-fiber/)
- [Drei Components](https://github.com/pmndrs/drei)

### Animation Libraries
- [GSAP Documentation](https://greensock.com/docs/)
- [Framer Motion](https://www.framer.com/motion/)
- [Lenis Smooth Scroll](https://lenis.studiofreight.com/)

### Tailwind CSS
- [Tailwind Documentation](https://tailwindcss.com/docs)
- [Tailwind UI](https://tailwindui.com/)

## 🔧 Performance Tips

1. **Image Optimization**: Use WebP with fallbacks
2. **Code Splitting**: Lazy load heavy components
3. **Three.js Optimization**: Reduce geometry complexity for mobile
4. **GSAP**: Use `.tl.to()` for batched animations
5. **Tailwind**: Keep `content` config precise to minimize CSS output

## 📝 Notes

- Replace placeholder GitHub and social links with actual profiles
- Update contact email in Contact.jsx
- Consider adding a real form backend (Formspree, Netlify Forms, etc.)
- Add your actual projects and replace demo links
- Customize animations based on performance testing

## 🤝 Contributing

This is a personal portfolio, but feel free to fork and customize for your own use.

## 📄 License

This portfolio template is open source. Feel free to use it as a starting point for your own portfolio.

---

**Built with ❤️ using React, Three.js, GSAP, and Tailwind CSS**
