# Lingokids App Prototype

A web-based prototype of the Lingokids mobile app interface, built with HTML, CSS, and JavaScript.

## Features

- **Netflix-style UI**: Horizontal scrolling feeds with different content types
- **Multiple Feed Types**:
  - Games Feed: Educational games with topic tags
  - IP Feed: Character-based content collections (Lessons, Lectoescritura, Matemáticas)
  - Topics Feed: Subject-based activities
  - New Games Feed: Latest activities
- **Interactive Elements**:
  - Top navigation bar with profile, favorites, and search
  - Friends section with avatar gallery
  - Topics quick access icons
  - Daily rewards progress widget
  - Floating navigation for different modes
- **Mobile-First Design**: Responsive layout optimized for mobile devices
- **Dummy Navigation**: Click any item to see navigation demo

## Project Structure

```
app/
├── index.html          # Main app structure
├── styles.css          # All styling and responsive design
├── script.js           # App logic and interactions
├── README.md           # This file
├── games_feed/         # Game cover images
│   ├── lingokids/
│   ├── blippi/
│   └── pocoyo/
├── ip_feed/            # IP content images
│   ├── lingokids/
│   ├── blippi/
│   └── pocoyo/
├── topics_feed/        # Topic cover images
│   ├── lingokids/
│   ├── blippi/
│   └── pocoyo/
└── new_feed/           # New content images
    ├── lingokids/
    ├── blippi/
    └── pocoyo/
```

## Running the Prototype

1. **Simple Method**: Double-click `index.html` to open in your browser
2. **Local Server** (recommended for testing):
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Node.js (if you have http-server installed)
   npx http-server
   
   # Then open http://localhost:8000
   ```

## Adding Images

To populate the feeds with real images:

1. Add image files to the appropriate folders:
   - `games_feed/[ip_name]/` - Game cover images
   - `ip_feed/[ip_name]/` - IP content images  
   - `topics_feed/[ip_name]/` - Topic cover images
   - `new_feed/[ip_name]/` - New content images

2. The app will automatically scan these folders and use available images
3. If no images are found, colorful placeholders are used instead

## Customization

- **Colors**: Edit the `ipColors` object in `script.js` to change brand colors
- **Content**: Modify the `sampleData` object in `script.js` to change text and categories
- **Layout**: Adjust CSS classes in `styles.css` for different layouts
- **Feed Sizes**: Change item counts in the populate functions

## Browser Compatibility

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Responsive design works on all screen sizes

## Notes

- This is a visual prototype - no actual games or backend functionality
- All interactions lead to demo screens with back navigation
- Designed to match the Lingokids app aesthetic and user flow
- Perfect for product demos and stakeholder presentations
