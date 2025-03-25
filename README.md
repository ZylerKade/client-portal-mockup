# Client Portal Demo

A modern client portal dashboard application demonstrating a web app with login logic, dashboard UI, and mock file handling. This demo web app mimics a client-facing system, using local mock data and state to demonstrate functionality without real authentication or file storage.

You can see a live version of this Client Portal at https://portal-demo.solomain.com

## 🚀 Features

- **Authentication System**: Login and signup functionality with localStorage persistence
- **Modern Dashboard**: Clean, responsive design with sidebar navigation
- **File Management**: Drag-and-drop file uploads with progress indicators
- **Messaging System**: Send and receive mock messages
- **Note Taking**: Create, view, and delete notes
- **Data Visualization**: Charts and statistics on the overview page

## 🛠️ Technology Stack

- **Frontend**: React with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui components
- **State Management**: React Context API and useState
- **Persistence**: Browser localStorage
- **Routing**: wouter for client-side routing
- **Form Handling**: react-hook-form with zod validation

## 🚀 Getting Started

1. Clone the repository:

```shellscript
git clone https://github.com/yourusername/client-portal-mvp.git
cd client-portal-mvp
```

2. Install dependencies:

```shellscript
npm install
```

3. Start the development server:

```shellscript
npm run dev
```

4. Open [http://localhost:5000](http://localhost:5000) in your browser to see the application.

## 📱 Usage

### Authentication

- Use any email and password to log in (no validation)
- Or create a new account with the sign-up form

### Dashboard

The dashboard provides an overview of:

- Revenue metrics
- Active projects and their progress
- Completed tasks
- Recent activity
- Financial charts and graphs

### Files

- Upload files via drag-and-drop or file browser
- View uploaded files with metadata
- Delete files as needed

### Messages

- Send messages to the support team
- View conversation history
- Receive automated responses

### Notes

- Create notes with title and content
- View all notes in a card layout
- Delete notes when no longer needed

## 📂 Project Structure

```plaintext
client-portal-mvp/
├── client/                 # React frontend
│   ├── src/                # Source files
│   │   ├── components/     # UI components
│   │   │   ├── ui/         # shadcn UI components
│   │   │   ├── auth/       # Authentication components
│   │   │   └── dashboard/  # Dashboard components
│   │   ├── contexts/       # React context providers
│   │   ├── hooks/          # Custom React hooks
│   │   ├── lib/            # Utility functions
│   │   ├── pages/          # Page components
│   │   ├── App.tsx         # Main application component
│   │   └── main.tsx        # Entry point
│   └── index.html          # HTML template
├── server/                 # Express backend (minimal)
├── shared/                 # Shared types and schemas
├── public/                 # Static assets
├── tailwind.config.ts      # Tailwind configuration
└── package.json            # Project dependencies
```

## 🖼️ Screenshots

### Login Page

![Login Page](https://i.imgur.com/YourLoginScreenshotURL.png)

### Dashboard

![Dashboard](https://i.imgur.com/YourDashboardScreenshotURL.png)

### File Management

![File Management](https://i.imgur.com/YourFilesScreenshotURL.png)

### Messaging

![Messaging](https://i.imgur.com/YourMessagingScreenshotURL.png)

## 🔄 Data Persistence

This demo uses the browser's localStorage API to persist data between sessions. All data is stored locally in your browser and will be cleared if you clear your browser data.

## 🎨 Customization

### Themes and Colors

The application uses a custom color scheme that can be modified in:

- `theme.json` - Main theme configuration
- `tailwind.config.ts` - Tailwind theme configuration

## 🚧 Future Improvements

- Backend integration with a real database
- Authentication with JWT or OAuth
- Real-time notifications
- File preview functionality
- Advanced search and filtering
- User roles and permissions
- Dark mode toggle

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Developer

This project was created as a portfolio piece. If you're looking for a developer to build similar applications, please contact me:

- Website: [https://solomain.com](https://solomain.com)
- Upwork: [https://solomain.com/upwork](https://solomain.com/upwork)
- GitHub: [https://github.com/yourusername](https://github.com/yourusername)

---

⭐ If you found this project helpful, please consider giving it a star on GitHub! ⭐
