# Specification: WASM Loading Mechanism via CDN

## ADDED Requirements

### Requirement: CDN-Based Loading
The application SHALL load PyMuPDF WASM libraries from jsDelivr CDN using the GitHub repository as the source instead of the current server-based approach.

#### Scenario: Successful CDN Loading
Given a user initiates a PDF conversion operation that requires PyMuPDF
When the application attempts to load PyMuPDF WASM libraries
Then the libraries SHALL be loaded from jsDelivr CDN using the GitHub repository URL
And the conversion operation SHALL proceed without errors related to library loading

### Requirement: CDN URL Configuration
The application SHALL maintain a configurable URL base for CDN resources that can be updated without code changes.

#### Scenario: CDN URL Configuration
Given the application needs to load PyMuPDF WASM libraries
When the loading mechanism is initialized
Then it SHALL use the configured CDN URL base to construct paths to individual library files
And it SHALL be possible to update the CDN URL base without modifying the core loading logic

### Requirement: Fallback Mechanism
The application SHALL implement a fallback mechanism to load PyMuPDF WASM libraries from local sources if CDN loading fails.

#### Scenario: CDN Failure with Fallback
Given the application attempts to load PyMuPDF WASM libraries from CDN
When the CDN loading fails due to network issues or unavailable resources
Then the application SHALL attempt to load the libraries from local sources
And the PDF conversion functionality SHALL remain operational

### Requirement: Error Handling
The application SHALL provide appropriate error handling and logging for CDN loading failures.

#### Scenario: CDN Loading Error
Given the application attempts to load PyMuPDF WASM libraries from CDN
When the loading process encounters an error
Then the application SHALL log the error with sufficient detail for debugging
And the application SHALL notify the user appropriately without crashing

## MODIFIED Requirements

### Requirement: PyMuPDF Initialization
The PyMuPDF initialization process IS MODIFIED TO load libraries from jsDelivr CDN instead of the current server-based approach. The application SHALL load Pyodide and required packages from jsDelivr CDN and SHALL install required Python packages (pymupdf, pdf2docx, etc.) from CDN URLs.

#### Scenario: PyMuPDF Initialization with CDN
Given a user initiates a PDF operation requiring PyMuPDF
When the PyMuPDF loader initializes
Then it SHALL load Pyodide and required packages from jsDelivr CDN
And it SHALL install required Python packages (pymupdf, pdf2docx, etc.) from CDN URLs
And the initialization SHALL complete successfully

## REMOVED Requirements

### Requirement: Server-Based WASM Loading
The previous requirement to load PyMuPDF WASM libraries from the application server is REMOVED as it is replaced by CDN-based loading.

#### Scenario: Removal of Server-Based Loading
Given the updated implementation
When the application loads PyMuPDF WASM libraries
Then it SHALL NOT attempt to load from the previous server endpoint (`https://pdfcraft.appwrite.network/pymupdf-wasm/`)
And all references to the server-based loading mechanism SHALL be removed