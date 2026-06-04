# Nathan Hartshorn Portfolio

A polished personal portfolio website built with React and Vite, showcasing projects, GitHub activity, certifications, and contact details.

## Overview

This repository contains a responsive portfolio landing page for Nathan Hartshorn. It is designed to present professional work, technical skills, and active developer presence in a modern, animated interface.

## Key Features

- Responsive single-page React application
- Animated hero section with typewriter-style text rotation
- Smooth scroll navigation with active section highlighting
- Light / dark theme toggle
- English and Spanish language switcher
- Lazy-loaded sections for performance optimization
- GitHub contributions graph integration
- Project cards with live/demo links and technology tags
- Contact section with GitHub, LinkedIn, and email links

## Tech Stack

- React 19
- Vite 8
- ESLint
- HTML, CSS, JavaScript

## Getting Started

### Prerequisites

- Node.js 18+ (or current LTS) installed

### Install dependencies

```bash
npm install
```

### Run locally

```bash
npm run dev
```

Then open the local development URL shown in the terminal.

### Build for production

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

### Lint the source

```bash
npm run lint
```

## Project Structure

- `src/App.jsx` — application entry point and page layout
- `src/translations.js` — bilingual copy, section labels, and project descriptions
- `src/components/Navbar.jsx` — navigation bar, language toggle, theme switch, sidebar menu
- `src/components/Header.jsx` — hero section with animated typing and CTA buttons
- `src/components/About.jsx` — technology and skills section
- `src/components/Projects.jsx` — project showcase cards with demo links
- `src/components/GitHub.jsx` — GitHub activity graph section
- `src/components/Certifications.jsx` — certification highlights
- `src/components/Contact.jsx` — contact links and email action
- `src/components/Footer.jsx` — footer content and rights notice

## Notes

This portfolio is styled with custom CSS and uses a canvas-based animated background effect. The application is structured to be easy to extend with new project entries, additional languages, or extra sections.

## Contact

- GitHub: https://github.com/Nathan-0001
- LinkedIn: https://www.linkedin.com/in/nathan-hartshorn/
- Email: nathan.hartshorn24@gmail.com

## License

This repository is available for personal portfolio use and demonstration purposes.
