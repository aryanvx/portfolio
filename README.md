# Header

You know ya boy had to include a README.md. Otherwise, I'd just be another hypocrite in a world full of hypocrisy.

# Portfolio Website

## Overview

This is my personal portfolio websitwe. I built it as a static site to share my projects, achievements, and information about myself. I used vanilla HTML, CSS, and JavaScript to keep things simple and clean while still following modern web design practices.

## User Preferences

Mostly just used simple, everyday language.

## System Architecture

My portfolio follows your average static website architecture:

- **Frontend**: Pure HTML/CSS with modern styling approaches
- **Structure**: Single-page application (SPA) with navigation between sections
- **Styling**: Custom CSS with external font dependencies
- **Responsive Design**: Mobile-first approach with hamburger menu implementation

## Key Components

### Navigation System
- Fixed navigation bar with my logo and menu items
- Responsive hamburger menu for mobile devices
- Smooth scroll navigation between sections (Home, Projects, About, Contact)

### Typography System
- Primary font: Inter (sans-serif) for body text and UI elements
- Secondary font: Lora (serif) for headings and emphasis
- Font weights range from 300 to 700 for visual hierarchy

### Layout Structure
- Container-based layout with max-width of 1200px
- Centered content with responsive padding
- Organized into sections for each part of the portfolio

### Styling Approach
- CSS reset for consistent cross-browser rendering
- Custom CSS properties for easier styling updates
- Uses modern CSS techniques like flexbox and grid
- Smooth scrolling for better user experience

## Data Flow

Since this is a static website:
- No server-side data processing
- All content is embedded in the HTML files
- Navigation links trigger scroll-to-section actions
- Form submissions (if any) have to have external integration

## External Dependencies

### Fonts
- Google Fonts API for Inter and Lora
- Preconnect optimization for faster font loading

### Icons
- Font Awesome 6.0.0 via CDN for icons
- Provides scalable vector icons for social media and UI

### No Backend Dependencies
- All frontend implementation
- No database whatsoever
- No server-side processing either

## Deployment Strategy

### Static Hosting Compatible
- Can be deployed on any static hosting service (Netlify, Vercel, GitHub Pages)
- Doesn’t need any server or build process
- Simple file upload to deploy

### Performance Considerations
- Optimized font loading with preconnect hints
- Uses external CDN for Font Awesome icons
- Minimal external dependencies for fast loading times

### SEO Optimization
- Includes meta tags for description, keywords, and author
- Semantic HTML structure to improve search engine crawling
- Viewport meta tag for mobile optimization

Overall, I kept the architecture simple, reliable, and easy to maintain while making sure it still looks professional for my personal portfolio website.