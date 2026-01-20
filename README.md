# AddictionTracker 🚀

<div align="center">
  <img src="https://img.shields.io/badge/Version-1.0.0-blue" alt="Version">
  <img src="https://img.shields.io/badge/License-MIT-green" alt="License">
  <img src="https://img.shields.io/badge/Status-Production-brightgreen" alt="Status">
  <br>
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white" alt="HTML5">
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white" alt="CSS3">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black" alt="JavaScript">
  <img src="https://img.shields.io/badge/Vercel-000000?style=flat&logo=vercel&logoColor=white" alt="Vercel">
</div>

## 🌟 Overview

**AddictionTracker** is a space-themed micro-SaaS designed to help individuals overcome their addictions through daily tracking, progress monitoring, and motivational support. With a beautiful cosmic interface and smart notification system, it makes the recovery journey engaging and visually appealing.

> "Break Free, Reclaim Your Space" 🚀

### 🎯 Live Demo
**[https://addictiontracker.vercel.app](https://addictiontracker.vercel.app)** *(Coming Soon)*

## ✨ Features

### 🎨 **Visual Experience**
- **Space Theme**: Beautiful cosmic design with animated stars, planets, and shooting stars
- **Dark/Light Mode**: Toggle between space night and bright day themes
- **Animated Elements**: Floating astronauts, rotating planets, animated progress circles
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile

### 📊 **Core Functionality**
- **Daily Check-ins**: Simple Yes/No tracking for addiction avoidance
- **Progress Visualization**: Circular progress bar with freedom percentage
- **Statistics Dashboard**: Win streak, total days, relapse count, success rate
- **Mission Calendar**: Visual calendar showing victory and relapse days
- **Custom Reminders**: Set personalized daily notification times
- **Progress Reset**: Start fresh whenever needed

### 🔔 **Smart Features**
- **One-time Daily Check**: Prevents duplicate entries
- **Customizable Alarms**: Choose your preferred reminder time (9AM, 12PM, 3PM, 6PM, 9PM, or custom)
- **Browser Notifications**: Optional desktop notifications
- **Motivational Messages**: Dynamic encouragement based on progress

### 💾 **Data Management**
- **Local Storage**: All data saved in browser (no backend required for MVP)
- **Export Ready**: Structure ready for future cloud sync
- **Demo Data**: Sample data for immediate testing

## 🚀 Quick Start

### Option 1: Deploy Instantly (Recommended)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/addictiontracker)

### Option 2: Local Development
```bash
# 1. Clone the repository
git clone https://github.com/yourusername/addictiontracker.git

# 2. Navigate to project directory
cd addictiontracker

# 3. Open in browser
# Simply open index.html in your browser
# OR use a local server:
python -m http.server 8000
# Then visit http://localhost:8000
```

### Option 3: One-Click Test
1. Download the ZIP file
2. Extract to any folder
3. Open `index.html` in your browser

## 🛠 Tech Stack

| Technology | Purpose |
|------------|---------|
| **HTML5** | Structure and semantic markup |
| **CSS3** | Styling with custom properties and animations |
| **Vanilla JavaScript** | Core functionality and logic |
| **Font Awesome** | Icons and visual elements |
| **Google Fonts** | Typography (Orbitron, Exo 2) |
| **LocalStorage** | Client-side data persistence |
| **Vercel** | Free hosting and deployment |

## 📁 Project Structure

```
addiction-tracker/
├── index.html              # Main application file
├── style.css              # All styling (space theme, responsive)
├── script.js              # Core application logic
├── notification.js        # Notification system
├── favicon.svg            # Rocket logo for browser tab
├── favicon-32x32.png     # Standard favicon
├── apple-touch-icon.png  # iOS home screen icon
├── site.webmanifest      # PWA configuration
└── README.md             # This file
```

## 🎮 How to Use

### 1. **First Login**
```
Email: any@email.com (or use Google login)
Addiction Type: Select from options (Smoking, Alcohol, etc.)
Reminder Time: Choose when you want daily notifications
→ Click "Launch Tracker"
```

### 2. **Daily Routine**
```
1. Receive daily notification at your chosen time
2. Click "YES! Victory Achieved!" if you avoided addiction
3. Click "No, I Relapsed" if you didn't
4. Watch your progress grow!
```

### 3. **Dashboard Features**
- **Freedom Level**: Percentage circle showing overall success
- **Win Streak**: Consecutive days without relapse
- **Mission Calendar**: Visual history of your journey
- **Motivation Messages**: Encouraging quotes that adapt to your progress

### 4. **Theme Switching**
Click the sun/moon icon in the top-right to toggle between:
- **Dark Theme**: Space night with stars and planets
- **Light Theme**: Bright day with sun and clouds

## 💰 Business Model (MVP → Scale)

### **Current MVP**
- **Free Tier**: Basic tracking with 90-day history limit
- **Revenue**: Not yet implemented (focused on user acquisition)

### **Future Monetization**
| Tier | Price | Features |
|------|-------|----------|
| **Free** | $0 | Basic tracking, 90-day history, ads |
| **Premium** | $5/mo | Unlimited history, export, no ads, SMS reminders |
| **Enterprise** | $29/mo | Multi-user, white-label, API access |

### **Revenue Streams Planned**
1. Subscription fees (Premium/Enterprise)
2. Affiliate partnerships (books, courses, therapy apps)
3. Sponsored content
4. E-books and guides
5. Consulting services

## 🚢 Deployment Guide

### **Free Hosting Options**

#### **Option 1: Vercel (Recommended)**
```bash
1. Create GitHub repository
2. Sign up at vercel.com
3. Import your repository
4. Deploy with one click
5. Get: https://your-project.vercel.app
```

#### **Option 2: Netlify**
```bash
1. Drag & drop folder to netlify.com
2. Get: https://your-project.netlify.app
```

#### **Option 3: GitHub Pages**
```bash
1. Push to GitHub
2. Go to Settings → Pages
3. Select main branch
4. Get: https://username.github.io/addictiontracker
```

### **Custom Domain Setup**
1. Buy domain ($10-15/year from Namecheap/GoDaddy)
2. Add domain in Vercel/Netlify dashboard
3. Update DNS records at registrar
4. Wait 24-48 hours for propagation

## 🔄 Update Strategy

### **For Indie Hackers (Vibe Coding)**
```
Monday:    Review analytics & user feedback
Tuesday:   Code new features
Wednesday: Code new features
Thursday:  Test & gather feedback
Friday:    Deploy & marketing
Weekend:   Rest & ideation
```

### **Auto-Deployment Workflow**
```yaml
# With Vercel/GitHub:
1. Push code to GitHub
2. Vercel automatically builds
3. Deploys to preview URL
4. Test on preview
5. Merge to main → Auto-deploy to production
6. Zero downtime, auto-rollback if fails
```

### **Feature Flags for Safe Updates**
```javascript
// Add to script.js for controlled rollouts
const features = {
  communityForum: false,  // Not ready yet
  payments: false,        // Coming soon
  multiAddiction: true    // Already live
};
```

## 📈 Growth Strategy

### **Phase 1: Launch (Month 1)**
- [ ] Deploy to Vercel
- [ ] Share on 5 relevant communities
- [ ] Get first 100 users
- [ ] Collect initial feedback

### **Phase 2: Monetization (Month 2-3)**
- [ ] Implement Stripe payments
- [ ] Launch Premium tier
- [ ] Start affiliate program
- [ ] Reach 1,000 users

### **Phase 3: Scale (Month 4-6)**
- [ ] Mobile app (PWA)
- [ ] Community features
- [ ] API for developers
- [ ] App store listing

## 🐛 Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| **Dropdown has double arrows** | Use provided CSS fix in style.css |
| **Data lost after browser clear** | Future: Implement cloud sync |
| **Notifications not working** | Enable browser permissions |
| **Mobile display issues** | Test responsive breakpoints |

## 🤝 Contributing

This is currently a solo indie hacker project, but future contributions are welcome!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Icons**: Font Awesome for beautiful icons
- **Fonts**: Google Fonts for Orbitron and Exo 2
- **Inspiration**: All the brave individuals fighting addiction
- **Community**: Indie Hackers and makers building in public

## 📞 Support & Contact

Having issues or want to collaborate?

- **Twitter**: [@YourTwitterHandle](#)
- **Email**: hello@addictiontracker.com *(coming soon)*
- **GitHub Issues**: [Open an issue](#)

## 🌟 Star History

[![Star History Chart](https://api.star-history.com/svg?repos=yourusername/addictiontracker&type=Date)](https://star-history.com/#yourusername/addictiontracker&Date)

---

<div align="center">
  <h3>Built with ❤️ by an Indie Hacker</h3>
  <p>Remember: Every small step is a giant leap toward freedom</p>
  <p>🚀 Ship fast, iterate faster, help people break free 🚀</p>
</div>

---

**Ready to launch?** Deploy now and start helping people today!

[![Deploy Now](https://img.shields.io/badge/Deploy_Now-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/new/clone)

---
*"The journey of a thousand miles begins with a single step." - Lao Tzu*
