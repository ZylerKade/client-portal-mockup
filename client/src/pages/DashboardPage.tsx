import { useState, useEffect } from "react";
import { Section, Stats, File, Message, Note, ActivityItem } from "../types";
import Sidebar from "../components/dashboard/Sidebar";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import OverviewSection from "../components/dashboard/sections/OverviewSection";
import FilesSection from "../components/dashboard/sections/FilesSection";
import MessagesSection from "../components/dashboard/sections/MessagesSection";
import NotesSection from "../components/dashboard/sections/NotesSection";
import useLocalStorage from "../hooks/useLocalStorage";
import { useAuth } from "../contexts/AuthContext";

export default function DashboardPage() {
  const [activeSection, setActiveSection] = useState<Section>("overview");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [stats, setStats] = useLocalStorage<Stats>("dashboard_stats", {
    files: 3,
    messages: 2,
    notes: 3
  });
  const [files, setFiles] = useLocalStorage<File[]>("dashboard_files", [
    {
      id: "1",
      name: "Project Brief.pdf",
      size: "2.4 MB",
      type: "pdf",
      uploadedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) // 2 days ago
    },
    {
      id: "2",
      name: "Financial Report.xlsx",
      size: "1.8 MB",
      type: "xlsx",
      uploadedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // 1 week ago
    },
    {
      id: "3",
      name: "Product Mockup.png",
      size: "4.2 MB",
      type: "png",
      uploadedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) // 3 days ago
    }
  ]);
  
  const [messages, setMessages] = useLocalStorage<Message[]>("dashboard_messages", [
    {
      id: "1",
      subject: "Project Update",
      content: "Hi John, I wanted to update you on the latest project developments. We've made significant progress on...",
      sender: "Sarah Johnson",
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) // 2 days ago
    },
    {
      id: "2",
      subject: "Meeting Invitation",
      content: "Would you be available for a quick call on Thursday to discuss the next steps for our project?",
      sender: "Michael Brown",
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) // 3 days ago
    }
  ]);
  
  const [notes, setNotes] = useLocalStorage<Note[]>("dashboard_notes", [
    {
      id: "1",
      title: "Meeting Notes",
      content: "Discuss project timeline, assign tasks for the next sprint, and review client feedback.",
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) // 3 days ago
    },
    {
      id: "2",
      title: "Ideas for Homepage",
      content: "Improve hero section, add testimonials, and update product features with new screenshots.",
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // 1 week ago
    },
    {
      id: "3",
      title: "Client Requirements",
      content: "Mobile-friendly design, accessibility compliance, and integration with existing CRM system.",
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000) // 5 days ago
    }
  ]);
  
  const [recentActivities, setRecentActivities] = useLocalStorage<ActivityItem[]>("dashboard_activities", [
    {
      id: "1",
      type: "file",
      title: "You uploaded a new file",
      description: "project-proposal.pdf - 2.4 MB",
      timestamp: new Date(),
      icon: "ri-file-upload-line",
      bgColor: "bg-primary-100",
      textColor: "text-primary-600"
    },
    {
      id: "2",
      type: "message",
      title: "New message from Sarah",
      description: "Hi, just checking in on the project status...",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      icon: "ri-message-3-line",
      bgColor: "bg-emerald-100",
      textColor: "text-emerald-600"
    },
    {
      id: "3",
      type: "note",
      title: "You added a new note",
      description: "Meeting scheduled for next week...",
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // Yesterday
      icon: "ri-sticky-note-line",
      bgColor: "bg-violet-100",
      textColor: "text-violet-600"
    }
  ]);

  const { user } = useAuth();

  // Update activity when files, messages, or notes change
  useEffect(() => {
    const updateActivities = () => {
      let newActivities: ActivityItem[] = [...recentActivities];

      // Add new file activity if necessary
      const latestFile = [...files].sort((a, b) => 
        new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
      )[0];
      
      if (latestFile && !recentActivities.some(a => a.type === 'file' && a.description.includes(latestFile.name))) {
        newActivities.unshift({
          id: `file-${Date.now()}`,
          type: 'file',
          title: 'You uploaded a new file',
          description: `${latestFile.name} - ${latestFile.size}`,
          timestamp: new Date(latestFile.uploadedAt),
          icon: 'ri-file-upload-line',
          bgColor: 'bg-primary-100',
          textColor: 'text-primary-600'
        });
      }

      // Add new message activity if necessary
      const latestMessage = [...messages].sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )[0];
      
      if (latestMessage && !recentActivities.some(a => a.type === 'message' && a.description.includes(latestMessage.content.substring(0, 20)))) {
        newActivities.unshift({
          id: `message-${Date.now()}`,
          type: 'message',
          title: `New message from ${latestMessage.sender === 'You' ? 'you' : latestMessage.sender}`,
          description: latestMessage.content.substring(0, 40) + '...',
          timestamp: new Date(latestMessage.createdAt),
          icon: 'ri-message-3-line',
          bgColor: 'bg-emerald-100',
          textColor: 'text-emerald-600'
        });
      }

      // Add new note activity if necessary
      const latestNote = [...notes].sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )[0];
      
      if (latestNote && !recentActivities.some(a => a.type === 'note' && a.description.includes(latestNote.content.substring(0, 20)))) {
        newActivities.unshift({
          id: `note-${Date.now()}`,
          type: 'note',
          title: 'You added a new note',
          description: latestNote.content.substring(0, 40) + '...',
          timestamp: new Date(latestNote.createdAt),
          icon: 'ri-sticky-note-line',
          bgColor: 'bg-violet-100',
          textColor: 'text-violet-600'
        });
      }

      // Keep only the 5 most recent activities
      newActivities = newActivities.slice(0, 5);
      
      if (JSON.stringify(newActivities) !== JSON.stringify(recentActivities)) {
        setRecentActivities(newActivities);
      }
    };

    updateActivities();
  }, [files, messages, notes]);

  // Handlers for various actions
  const handleAddFile = (file: File) => {
    setFiles([file, ...files]);
    setStats({...stats, files: stats.files + 1});
  };

  const handleAddMessage = (message: Message) => {
    setMessages([message, ...messages]);
    setStats({...stats, messages: stats.messages + 1});
  };

  const handleAddNote = (note: Note) => {
    setNotes([note, ...notes]);
    setStats({...stats, notes: stats.notes + 1});
  };

  const handleDeleteFile = (id: string) => {
    setFiles(files.filter(file => file.id !== id));
    setStats({...stats, files: stats.files - 1});
  };

  const handleDeleteMessage = (id: string) => {
    setMessages(messages.filter(message => message.id !== id));
    setStats({...stats, messages: stats.messages - 1});
  };

  const handleDeleteNote = (id: string) => {
    setNotes(notes.filter(note => note.id !== id));
    setStats({...stats, notes: stats.notes - 1});
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-50">
      <Sidebar 
        activeSection={activeSection} 
        onSectionChange={setActiveSection}
        isMobileOpen={isSidebarOpen}
        toggleMobileMenu={toggleSidebar}
      />

      <main className="flex-1 overflow-x-hidden">
        <DashboardHeader
          title={activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}
          toggleSidebar={toggleSidebar}
        />

        <div className="p-4 sm:p-6">
          {activeSection === "overview" && (
            <OverviewSection 
              stats={stats} 
              activities={recentActivities}
              userName={user?.firstName || 'User'}
            />
          )}
          
          {activeSection === "files" && (
            <FilesSection 
              files={files} 
              onAddFile={handleAddFile}
              onDeleteFile={handleDeleteFile}
            />
          )}
          
          {activeSection === "messages" && (
            <MessagesSection 
              messages={messages}
              onAddMessage={handleAddMessage}
              onDeleteMessage={handleDeleteMessage}
            />
          )}
          
          {activeSection === "notes" && (
            <NotesSection 
              notes={notes}
              onAddNote={handleAddNote}
              onDeleteNote={handleDeleteNote}
            />
          )}
        </div>
      </main>
    </div>
  );
}
