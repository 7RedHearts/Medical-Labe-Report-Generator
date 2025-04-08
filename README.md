# Medical Lab Report Generator (Static Version)

This is a standalone, static version of the Medical Lab Report Generator that can be used without a server. Everything runs in the browser, making it easy to deploy on GitHub Pages or any other static file hosting service.

## Features

- Create detailed medical lab reports for various test types
- Dynamically load test fields based on the selected test type
- Color-coded results (normal in green, abnormal in red)
- Print-ready reports optimized for A4 letterhead
- PDF export capability
- Share reports via Web Share API (on supported devices)
- Mobile-friendly design with a fixed bottom toolbar

## How to Use

### Local Use

1. Download this entire `static_version` folder
2. Open `index.html` in any modern web browser
3. Fill out the form and generate reports right on your device

### Hosting on GitHub Pages

1. Create a new GitHub repository
2. Upload the contents of this `static_version` folder to the repository
3. Go to the repository's Settings > Pages
4. Select the branch to deploy (usually `main` or `master`)
5. Click Save, and your application will be available at `https://yourusername.github.io/repository-name/`

### Using the Application

1. Fill in patient details (name, age, gender)
2. Select a test type from the dropdown menu
3. Enter test results in the dynamically loaded fields
4. Click "Generate Report" to create the report
5. Use the buttons to print, view as PDF, or share the report

## Browser Compatibility

This application works in all modern browsers:
- Chrome, Edge, Firefox, Safari (Desktop and Mobile)
- iOS Safari and Android Chrome for mobile use

## Mobile Use

When accessed on a mobile device:
- The interface adapts to smaller screens
- Form elements are optimized for touch input
- A fixed toolbar at the bottom of the screen provides easy access to print, PDF, and share functions

## Offline Use

This application can work completely offline once loaded in your browser. No internet connection is needed to generate reports.

## Privacy

All data processing happens in your browser. No patient data is sent to any server.
