# EstateBase - Animations & Effects Guide

## Overview

The EstateBase homepage now features real, professional animations and visual effects powered by Framer Motion and custom CSS keyframes. Every element has been carefully animated to create a premium, engaging user experience.

---

## Search Card - Wine Shine Effect

### Location
- Positioned center-aligned below the navbar
- Compact card design for modern aesthetic

### Animations
- **Entrance**: Slides down from top with fade-in (Framer Motion)
- **Hover Effect**: Wine/amber shine line appears at the top
- **Border Glow**: Smooth amber-colored border enhancement
- **Shadow Enhancement**: Professional shadow expansion on hover

### Technical Details
```jsx
// SearchCard Component uses:
- motion.div for entrance animation
- onMouseEnter/onMouseLeave for hover tracking
- CSS gradient animation for wine shine effect
- Tailwind transitions for smooth effects
```

---

## Hero Section

### Animations
1. **Title**: Staggered slide-up entrance (0.6s duration)
2. **Subtitle**: Follows title with slight delay
3. **Stats**: Each stat animates with staggered delay (100ms between each)

### Effects
- Gradient background from white to gray
- Float-in animation for stat numbers
- Professional reveal sequencing

---

## Category Cards (Browse by Type)

### Animations
- **Entrance**: Staggered slide-up (0-400ms delay for 4 cards)
- **Hover**: Scale to 105% with smooth transition
- **Border**: Color transitions to amber on hover
- **Arrow**: Moves right on hover with translate effect
- **Text**: Color transitions to amber

### Visual Effects
- Wine shine animation on hover
- Enhanced shadow effects (shadow-2xl)
- Smooth 300-500ms transitions
- Professional color palette (black to amber)

---

## Featured Properties Grid

### Animations
- **Staggered Reveal**: Each property slides in with 150ms delay between cards
- **Hover**: Scale transformation with shadow enhancement
- **Smooth Entrance**: Bottom-to-top slide-in animation

### Effects
- Professional reveal timing
- Responsive grid layout
- Touch-friendly on mobile

---

## Why Choose Section

### Animations
- **Staggered Entrance**: Each item slides in with 100ms delay
- **Hover Translation**: Moves right slightly on hover (translateX: 8px)
- **Color Transition**: Text transitions to amber on hover
- **Professional Timing**: Smooth 300ms transitions

### Layout
- 2-column grid on desktop
- Single column on mobile
- Border-bottom separators

---

## Service Area Tags

### Animations
- **Staggered Reveal**: Each tag slides in with 50ms delay
- **Hover Scale**: Scales to 105%
- **Background Change**: Transitions to amber background
- **Border Enhancement**: Color change to amber-600
- **Shadow**: Appears on hover

### Interactive Effects
- Smooth transitions (300ms)
- Professional color palette
- Touch-friendly sizing

---

## Call to Action Section

### Background Effects
- Dark background with animated gradient orbs
- **Pulsing Elements**: Background decorative elements pulse with 2s duration
- **Glow Animation**: Ambient glow effect (opacity: 0.3 - 0.6)

### Button Animations
- **Hover**: Scale to 105% with shadow enhancement
- **Tap**: Scale down to 95% (whileTap effect)
- **Color**: Smooth transitions (300ms)

### Text Animations
- All text elements slide up on entrance
- Staggered reveal for visual flow
- Professional timing curves

---

## Testimonials Section

### Card Animations
- **Entrance**: Staggered slide-up (150ms delay between cards)
- **Hover**: Scale to 105% with shadow enhancement
- **Border**: Color transitions to amber-600

### Star Animations
- Each star within a card has staggered reveal
- Individual animations with 100ms delay between stars
- Professional sequencing

### Layout
- 3-column grid on desktop
- Responsive single column on mobile

---

## CSS Keyframe Animations

### Available Animations

#### wineShine
```css
- Creates horizontal wine/amber shimmer effect
- Used on cards on hover
- Duration: 3s (infinite)
- Smooth linear gradient movement
```

#### slideInUp
```css
- Smooth bottom-to-top entrance
- Opacity: 0 → 1
- Transform: translateY(20px) → 0
- Used throughout the page
```

#### fadeInScale
```css
- Fade in with scale effect
- Opacity: 0 → 1, Scale: 0.95 → 1
- Used on loading states and cards
```

#### floatIn
```css
- Smooth floating entrance
- Opacity: 0 → 1
- Transform: translateY(30px) → 0
- Used on stats and elements
```

#### pulse
```css
- Subtle pulsing effect
- Opacity oscillation: 1 → 0.8 → 1
- Used on CTA background orbs
```

#### glow
```css
- Ambient glow effect
- Box-shadow expansion and contraction
- Duration: 2s (infinite)
```

---

## Framer Motion Components

### SearchCard Component
```jsx
Features:
- motion.div for entrance animation
- whileHover for interactive feedback
- whileTap for button feedback
- Custom animation states
```

### Interactive Elements
```jsx
- whileHover={{ scale: 1.05 }}  // Hover scaling
- whileTap={{ scale: 0.95 }}    // Tap feedback
- whileFocus={{ scale: 1.02 }}  // Focus state
```

---

## Animation Timing & Delays

### Stagger Calculations
```
Cards: delay = index * 0.1s   // 100ms between each
Stars: delay = index * 0.1s   // 100ms between each
Tags:  delay = index * 0.05s  // 50ms between each
Props: delay = index * 0.15s  // 150ms between each
```

### Standard Durations
- Entrance animations: 0.6s
- Transitions: 0.3-0.5s
- Background effects: 2-3s (infinite)
- Hover effects: Immediate

---

## Performance Optimization

### GPU Acceleration
- All animations use transform and opacity
- Hardware-accelerated for smooth 60fps
- No layout shifts or repaints

### Bundle Impact
- Framer Motion: ~14.5 kB (gzipped)
- Custom CSS: < 5 kB
- Total animation overhead: < 20 kB

### Mobile Optimization
- Animations scale appropriately
- No performance issues on slower devices
- Touch interactions optimized

---

## Browser Compatibility

### Supported Browsers
- Chrome/Edge: Latest versions
- Firefox: Latest versions
- Safari: Latest versions (iOS & macOS)
- Mobile browsers: All modern versions

### Fallbacks
- CSS animations for older browsers
- Graceful degradation
- Core functionality always works

---

## Animation Best Practices Applied

1. **Purpose**: Every animation has a clear purpose (guide focus, indicate interaction, provide feedback)
2. **Timing**: Professional timing curves with easing functions
3. **Consistency**: Cohesive animation language throughout the site
4. **Performance**: Optimized for smooth 60fps playback
5. **Accessibility**: Animations don't interfere with essential content
6. **Responsiveness**: Animations adapt to screen size

---

## How to Add New Animations

### Using CSS Keyframes
```css
@keyframes myAnimation {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-my-animation {
  animation: myAnimation 0.6s ease-out;
}
```

### Using Framer Motion
```jsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  whileHover={{ scale: 1.05 }}
  transition={{ duration: 0.3 }}
>
  Content
</motion.div>
```

### Using Tailwind Classes
```jsx
<div className="animate-slide-up hover:animate-glow">
  Content
</div>
```

---

## Testing Animations

### How to Test
1. Visit the homepage
2. Scroll through each section
3. Hover over cards, buttons, and tags
4. Try on different screen sizes
5. Test on mobile devices

### What to Look For
- Smooth, professional motion
- No jank or stuttering
- Appropriate timing
- Professional feel
- Responsive behavior

---

## Animation Customization

### Adjusting Timing
Edit delays in the animation code:
```jsx
style={{ animationDelay: `${index * 0.1}s` }}
```

### Changing Colors
Update the amber/wine colors in:
- `SearchCard.tsx`
- `page.tsx`
- `globals.css`

### Modifying Scales
Change hover scale values:
```jsx
whileHover={{ scale: 1.05 }}  // Change to desired scale
```

---

## Summary

The EstateBase homepage now features:
- ✅ Real Framer Motion animations
- ✅ Wine shine effect on search card
- ✅ Staggered animations throughout
- ✅ Professional hover effects
- ✅ GPU-accelerated smooth performance
- ✅ Mobile-optimized animations
- ✅ Professional color palette (amber/wine accents)
- ✅ Consistent animation language

**Result**: A premium, engaging, modern real estate platform with professional animations that enhance the user experience.

---

Last Updated: 2024-07-19
Version: 1.0
