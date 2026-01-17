<!-- OPENSPEC:START -->
# OpenSpec Instructions

These instructions are for AI assistants working in this project.

Always open `@/openspec/AGENTS.md` when the request:
- Mentions planning or proposals (words like proposal, spec, change, plan)
- Introduces new capabilities, breaking changes, architecture shifts, or big performance/security work
- Sounds ambiguous and you need the authoritative spec before coding

Use `@/openspec/AGENTS.md` to learn:
- How to create and apply change proposals
- Spec format and conventions
- Project structure and guidelines

Keep this managed block so 'openspec update' can refresh the instructions.

<!-- OPENSPEC:END -->

# PDFCraft - Professional PDF Tools

## Project Overview

PDFCraft is a comprehensive web application built with Next.js that provides 72+ free online PDF tools for merging, splitting, compressing, and converting PDF files. The application emphasizes privacy by performing all processing in the browser using client-side technologies like PDF.js, pdf-lib, and PyMuPDF WASM, ensuring no files are uploaded to servers.

The project also includes a Chrome extension that provides quick access to the most popular PDF tools directly from the browser toolbar.

### Key Technologies

- **Framework**: Next.js 15 with TypeScript
- **Styling**: Tailwind CSS with custom CSS variables
- **UI Components**: Custom-built reusable components
- **Internationalization**: next-intl for multi-language support (9 languages)
- **PDF Processing**: pdf-lib, pdfjs-dist, @bentopdf/pymupdf-wasm, tesseract.js (for OCR)
- **State Management**: Zustand
- **Testing**: Vitest with Testing Library
- **Icons**: Lucide React
- **Build Tool**: Vite (with Turbopack support)

### Architecture

The application follows a Next.js 13+ App Router structure with internationalization support:

```
src/
├── app/                    # Next.js app router pages
│   ├── [locale]/          # Internationalized routes
│   │   ├── about/         # About page
│   │   ├── contact/       # Contact page
│   │   ├── faq/           # FAQ page
│   │   ├── privacy/       # Privacy policy
│   │   ├── tools/         # Individual tool pages
│   │   ├── layout.tsx     # Locale-specific layout
│   │   └── page.tsx       # Home page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Root redirect page
├── components/            # Reusable UI components
├── config/               # Application configuration
├── i18n/                 # Internationalization setup
├── lib/                  # Utility functions and libraries
├── types/                # TypeScript type definitions
└── __tests__/            # Test utilities and setup
```

### PDF Tools Categories

The application offers 67+ PDF tools organized into 6 categories:

1. **Edit & Annotate**: Edit PDFs, add signatures, watermarks, stamps, forms
2. **Convert to PDF**: Convert images, documents, and other formats to PDF
3. **Convert from PDF**: Extract images, convert PDFs to images or documents
4. **Organize & Manage**: Merge, split, organize, rotate, crop PDFs
5. **Optimize & Repair**: Compress, repair, fix page sizes
6. **Secure PDF**: Encrypt, decrypt, add/remove restrictions

## Building and Running

### Prerequisites

- Node.js (version compatible with Next.js 15)
- npm or yarn package manager

### Development Setup

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```
This will start the server with Turbopack for faster development.

3. Open [http://localhost:3000](http://localhost:3000) to view the application in the browser.

### Production Build

To build the application for production:

```bash
npm run build
```

This creates an optimized build in the `.next/` directory that can be deployed.

To run the production server:
```bash
npm run start
```

### Testing

Run the test suite:
```bash
npm run test
```

Run tests in watch mode:
```bash
npm run test:watch
```

Generate test coverage:
```bash
npm run test:coverage
```

### Linting

Check for linting issues:
```bash
npm run lint
```

## Development Conventions

### Internationalization (i18n)

The application supports 9 languages using the `next-intl` library. Language files are stored in the `messages/` directory with the following structure:
- `en.json` - English (default)
- `es.json` - Spanish
- `fr.json` - French
- `de.json` - German
- `it.json` - Italian
- `ja.json` - Japanese
- `ko.json` - Korean
- `pt.json` - Portuguese
- `zh.json` - Chinese

### Component Structure

Components follow a consistent pattern with accessibility in mind:
- All interactive elements have proper ARIA attributes
- Keyboard navigation is supported
- Semantic HTML is used appropriately
- Responsive design with Tailwind CSS

### PDF Processing

PDF operations are performed client-side using:
- `pdf-lib` for general PDF manipulation
- `@bentopdf/pymupdf-wasm` for advanced PDF operations
- `pdfjs-dist` for PDF rendering and extraction
- `tesseract.js` for OCR functionality

All processing happens in the browser for maximum privacy.

### Browser Extension

The project includes a Chrome extension in the `extension/` directory that provides quick access to popular PDF tools. The extension includes:
- A popup interface with shortcuts to 8 popular tools
- Right-click context menu integration
- Modern UI with dark theme support

To load the extension in development:
1. Open Chrome and navigate to `chrome://extensions/`
2. Enable Developer mode
3. Click "Load unpacked"
4. Select the `extension` folder

## Deployment

The application is configured for static export (output: 'export' in next.config.js), making it suitable for deployment to CDN platforms like Vercel, Netlify, or GitHub Pages.

Key deployment considerations:
- All processing happens client-side
- No server-side dependencies required after build
- Optimized for performance with proper caching headers
- Responsive design for all device sizes