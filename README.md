# Scoder Frontend Structure Documentation

The frontend of **Scoder** is developed based on the prototype design using **Vue.js (2024)** and **UniApp (2024)** to support responsive, cross-platform interaction.

## Project Structure Overview

```
Scoder-App/                     # Root directory of the frontend project
├── api/                        # API request handling module
│   ├── modules/                # Modular API requests categorized by feature
│   │   ├── base.js             # Base API configuration
│   │   ├── message.js          # Messaging API functions
│   │   ├── projects.js         # Project management API functions
│   │   ├── user.js             # User authentication/profile APIs
│   │   ├── config.js           # API endpoint configurations
│   │   ├── custom-request.js   # Custom API wrapper
│   │   ├── index.js            # Exports all APIs
│
├── components/                # Reusable UI components
│   ├── navbar/                # Navigation & UI elements
│   │   ├── navbar.vue
│   │   ├── add-btn-fixed.vue
│   │   ├── add-popup.vue
│   │   ├── img-swiper.vue
│   │   ├── no-data.vue
│   │   ├── popup-empty.vue
│   │   ├── title-operate.vue
│
├── pages/                     # Application views and features
│   ├── home/
│   │   ├── components/        # Subcomponents for home
│   │   │   ├── community-avatar.vue
│   │   │   ├── community-hot-nav.vue
│   │   │   ├── post-card.vue
│   │   │   ├── add-or-update-projects.vue
│   │   │   ├── add-or-update-team.vue
│   │   │   ├── index.vue
│   │   ├── projects.vue       # Projects list page
│   │   ├── team-detail.vue    # Team details view
│   ├── login/
│   │   ├── index.vue          # Login page
│   ├── message/
│   │   ├── direct-message.vue # Direct messaging
│   │   ├── index.vue
│   │   ├── team-message.vue   # Group chat
│   ├── my/
│   │   ├── static/            # Static assets
│   │   ├── change-password.vue
│   │   ├── index.vue
│   │   ├── my-projects.vue
│   │   ├── my-teams.vue
│   │   ├── profile.vue
│
├── static/                   # Static application-wide assets
│   ├── app/
│   │   ├── logo.png
│   │   ├── no-data/
│
├── store/                    # Vuex state management
│   ├── modules/
│   │   ├── websocket.js
│   │   ├── index.js
│
├── unpackage/                # UniApp auto-generated build files
├── utils/                    # Utility helper scripts
│   ├── replace.js
│   ├── uniapp-api.js
├── uview-ui/                 # UI framework for enhanced components

# Project Configuration and Entry
├── .gitignore                # Git ignore settings
├── App.vue                   # Main app component
├── favicon.ico               # App icon
├── LICENSE                   # License information
├── main.js                   # Application entry point
├── manifest.json             # Metadata and app settings
├── package.json              # Dependency list and scripts
├── pages.json                # Navigation and routing config
├── README.md                 # Frontend project documentation
├── template.h5.html          # HTML template for web build
├── theme.scss                # Global style variables
├── uni.scss                  # UniApp-specific styling
├── vue.config.js             # Vue CLI configurations
├── yarn.lock                 # Dependency lock file
```

## Tech Stack
- **Vue.js 2024** – Frontend framework
- **UniApp** – Cross-platform framework
- **UView** – UI library
- **Vuex** – State management

## Features
- Modular page structure (Login, Home, My Profile, Messaging)
- API interaction with backend microservices
- WebSocket integration for real-time chat
- Responsive design with reusable components

## Documentation
- All APIs follow RESTful conventions.
- Vue Router and Vuex are used for routing and state control.
