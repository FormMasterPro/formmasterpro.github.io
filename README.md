# FormMasterPro Project Website

This folder contains the GitHub Pages website for the FormMasterPro project. The site is hosted at [https://www.formmasterpro.com](https://www.formmasterpro.com).

## Enabling GitHub Pages

To enable GitHub Pages for this project:

1. Go to the repository's **Settings**.
2. Scroll down to the **Pages** section.
3. Under **Source**, select the branch (e.g., `main`) and folder `/docs`.
4. Click **Save**. GitHub will provide a URL for your site.

## Site Structure

- **Home** (`index.html`): Main landing page with product overview
- **Features** (`features.html`): Detailed product features
- **Documentation** (`docs.html`): User and developer guides
- **About** (`about.html`): Information about the project and team
- **Contact** (`contact.html`): Ways to reach the development team
- **Report Bug** (`report-bug.html`): Instructions for bug reporting
- **Privacy Policy** (`privacy.html`): Data handling practices
- **Terms of Service** (`terms.html`): User agreement
- **FAQ** (`faq.html`): Common questions and answers
- **Changelog** (`changelog.html`): Version history

## Development

To modify the website:

1. Edit the HTML, CSS, and JavaScript files in this folder.
2. Commit and push changes to the repository.
3. GitHub will automatically rebuild the site with your changes.

## Theme

The site uses a custom theme defined in the CSS files. To change the theme, modify `assets/styles.css`.

## Running the Application Locally

You have two options for running this application locally:

### Option 1: Using a Local Web Server (Recommended)

This resolves CORS issues with component loading.

1. Make sure you have Node.js installed on your computer
2. Open a terminal/command prompt in the project directory
3. Run the local server:
   ```
   node local-server.js
   ```
4. Open your browser and navigate to: http://localhost:8080

### Option 2: Using a Browser Extension

If you prefer to use the file:// protocol directly:

1. Install a CORS-enabling browser extension:
   - For Chrome: "CORS Unblock" or "Allow CORS: Access-Control-Allow-Origin"
   - For Firefox: "CORS Everywhere"
2. Enable the extension
3. Open your HTML files directly in the browser

### Option 3: Update Your HTML Files

Alternatively, you can update your HTML files to use inline components instead of loading them via fetch:

```html
<!-- Instead of -->
<div data-component="header"></div>

<!-- Use -->
<div>
  <!-- Copy and paste the content of header.html directly here -->
</div>
```

## Troubleshooting

If you see CORS errors in the console:
- "Access to fetch at 'file:///C:/components/header.html' has been blocked by CORS policy"

This happens because browsers restrict JavaScript from loading local files via the file:// protocol for security reasons. Use one of the methods above to resolve this issue.
