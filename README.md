# Appweaver  

A modern, intuitive website generator powered by LLMs that transforms text descriptions into fully functional websites in real-time.

 ![APP WEAVER 2](https://github.com/hollyufo/appweaver/blob/main/public/image.png?raw=true)

 

## ✨ Features

- **AI-Powered Generation**: Leverages GPT-4 to create responsive websites from natural language descriptions
- **Real-Time Preview**: Instantly see your generated website in a live preview window
- **Modern Tech Stack**: Built with React, TypeScript, and Tailwind CSS
- **Dashboard**: Track and manage your generated websites
- **Responsive Design**: All generated websites are mobile-friendly by default

## 🎯 What Can You Build?

The AI Website Builder can generate a wide variety of websites and components:

### 🏢 Business Websites
- Landing pages with hero sections and CTAs
- Company portfolios with team members
- Service showcases with pricing tables
- Contact forms with validation
- About pages with company timeline

### 🛍️ E-commerce Elements
- Product galleries with filtering
- Shopping cart interfaces
- Product detail pages
- Checkout flows
- Order tracking layouts

### 📱 Interactive Components
- Navigation menus (responsive)
- Modal dialogs
- Accordions and tabs
- Image carousels
- Progress indicators
- Notification systems

### 📊 Data Display
- Pricing tables
- Feature comparisons
- Statistics dashboards
- Team galleries
- Testimonial sections

### 📝 Content Layouts
- Blog post layouts
- News article templates
- Documentation pages
- FAQ sections
- Terms and conditions pages

### 🎨 Design Features
- Dark/light mode toggles
- Animated transitions
- Hover effects
- Loading states
- Error states
- Success messages

## 🛠️ Tech Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **AI Integration**: OpenAI GPT-4 ( for now )
- **Icons**: Lucide React
- **Build Tool**: Vite

## 🎮 Advanced Usage Examples

### Creating a Landing Page
```plaintext
"Create a modern landing page for a SaaS product with a hero section, 
feature grid, pricing table, and testimonials. Use a blue and white 
color scheme with subtle animations."
```

### Building a Portfolio
```plaintext
"Generate a minimal portfolio page for a photographer with a masonry 
image grid, about section, and contact form. Include hover effects 
on images and smooth scrolling navigation."
```

### E-commerce Product Page
```plaintext
"Design a product page with image gallery, size selector, color 
picker, add to cart button, and related products section. Include 
stock availability indicator and shipping information."
```

## 🚀 Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with your OpenAI API key:
   ```env
   VITE_OPENAI_API_KEY=your_api_key_here
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## 💡 Pro Tips

1. **Be Specific**: The more detailed your description, the better the output
   ```plaintext
   Good: "Create a contact form with name, email, subject, message fields,
   and a blue submit button that shows a loading state while submitting"
   
   Better than: "Make a contact form"
   ```

2. **Include Design Preferences**: Mention colors, styles, and themes
   ```plaintext
   "Use a dark theme with purple accents and subtle hover animations"
   ```

3. **Specify Interactions**: Describe how elements should behave
   ```plaintext
   "Add a slide-in animation when scrolling to each feature card"
   ```

## 🔐 Environment Variables

| Variable | Description |
|----------|-------------|
| `VITE_OPENAI_API_KEY` | Your OpenAI API key for GPT-4 access |

## 📁 Project Structure

```
src/
├── lib/           # Utility functions and API clients
├── pages/         # Page components
│   ├── Generator.tsx    # Main website generator
│   ├── Dashboard.tsx    # Website management
│   └── Preview.tsx      # Generated site preview
├── App.tsx        # Main application component
└── main.tsx       # Application entry point
```

## 🌟 Key Features Explained

### Website Generator
- Natural language input for website description
- Real-time generation using GPT-4
- Live preview of generated code
- Tailwind CSS styling for modern designs
- Support for complex layouts and components
- Responsive design generation
- Cross-browser compatibility
- Accessibility considerations

### Dashboard
- Overview of generated websites
- Quick access to previews
- Generation history with timestamps
- Usage statistics and analytics
- Favorite and organize generations
- Export generated code
- Share generations via URL

### Preview System
- Dynamic routing for generated sites
- Isolated preview environment
- Mobile-responsive testing
- Device-specific previews
- Code inspection
- Live editing capabilities
- Performance metrics

## 🔍 Technical Details

### Generated Code Quality
- Semantic HTML structure
- Optimized Tailwind classes
- Responsive breakpoints
- Accessibility attributes
- Performance considerations
- Clean, maintainable code
- Modern JavaScript practices

### Limitations
- No backend functionality
- Static websites only
- No database integration
- Limited to client-side features
- Maximum content length restrictions
- API rate limits apply

## 📝 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Areas for Contribution
- Additional component templates
- Enhanced AI prompts
- Performance optimizations
- Accessibility improvements
- Documentation updates
- Bug fixes and testing

---

Made with ❤️ using by Appweaver team
