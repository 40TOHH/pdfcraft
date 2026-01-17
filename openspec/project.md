# Project Context

## Purpose
PDFCraft is a comprehensive web application built with Next.js that provides 72+ free online PDF tools for merging, splitting, compressing, and converting PDF files. The application emphasizes privacy by performing all processing in the browser using client-side technologies like PDF.js, pdf-lib, and PyMuPDF WASM, ensuring no files are uploaded to servers. The project also includes a Chrome extension that provides quick access to the most popular PDF tools directly from the browser toolbar.

## Tech Stack
- Framework: Next.js 15 with TypeScript
- Styling: Tailwind CSS with custom CSS variables
- UI Components: Custom-built reusable components
- Internationalization: next-intl for multi-language support (9 languages)
- PDF Processing: pdf-lib, pdfjs-dist, @bentopdf/pymupdf-wasm, tesseract.js (for OCR)
- State Management: Zustand
- Testing: Vitest with Testing Library
- Icons: Lucide React
- Build Tool: Vite (with Turbopack support)

## Project Conventions

### Code Style
- Use TypeScript for type safety across the entire codebase
- Follow Next.js 13+ App Router structure with internationalization support
- Use Tailwind CSS utility classes with custom CSS variables for styling
- Maintain semantic HTML and proper ARIA attributes for accessibility
- Follow consistent component structure with responsive design
- Use camelCase for variable and function names
- Use PascalCase for component names
- Use kebab-case for file and directory names
- Maintain 2-space indentation for JSX/TSX and JavaScript files
- Use double quotes for JSX props and single quotes for string literals
- Format code with Prettier and enforce style with ESLint

### Architecture Patterns
- Next.js App Router with internationalized routes ([locale])
- Component-based architecture with reusable UI components
- Client-side PDF processing using pdf-lib, pdfjs-dist, and PyMuPDF WASM
- Zustand for global state management
- Internationalization using next-intl with 9 supported languages
- Separation of concerns with dedicated directories for components, config, i18n, lib, and types
- Chrome extension architecture with popup interface and context menu integration

### Testing Strategy
- Unit tests using Vitest and Testing Library
- Component testing for UI components
- Integration tests for PDF processing workflows
- Accessibility testing for all interactive elements
- Cross-browser compatibility testing
- Internationalization testing for all supported languages
- Performance testing for PDF processing operations
- Automated testing pipeline with coverage reports

### Git Workflow
- Feature branch workflow (feature/new-feature, bugfix/issue-description)
- Commit messages follow conventional commits format (feat:, fix:, chore:, etc.)
- Pull requests require code review before merging
- Branch protection rules on main branch
- Squash and merge for feature branches
- Tag releases with semantic versioning

## Domain Context
PDFCraft operates in the document processing domain, specifically focusing on PDF manipulation tools. The application handles various PDF operations including merging, splitting, compressing, converting, organizing, and securing PDF files. The emphasis on client-side processing means all operations happen in the browser without uploading files to servers, ensuring user privacy. The application supports multiple languages and provides both web-based tools and a Chrome extension for convenient access.

Key concepts for AI assistants:
- PDF processing happens entirely client-side for privacy
- Tools are categorized into 6 main groups: Edit & Annotate, Convert to PDF, Convert from PDF, Organize & Manage, Optimize & Repair, and Secure PDF
- Internationalization is critical with 9 supported languages
- Performance is important as PDF operations can be computationally intensive
- Accessibility is essential for all tools and interfaces

## Important Constraints
- All PDF processing must happen client-side (no server uploads)
- Support for 9 languages with proper internationalization
- Responsive design for all device sizes
- Compatibility with modern browsers
- Performance constraints for large PDF files
- File size limits for client-side processing
- Chrome extension must comply with store policies
- GDPR compliance for user privacy

## External Dependencies
- pdf-lib: For general PDF manipulation operations
- pdfjs-dist: For PDF rendering and extraction
- @bentopdf/pymupdf-wasm: For advanced PDF operations
- tesseract.js: For OCR functionality
- next-intl: For internationalization support
- Zustand: For state management
- Vitest: For testing framework
- Lucide React: For icon components
- Tailwind CSS: For styling framework
- Chrome Extension APIs: For browser extension functionality
