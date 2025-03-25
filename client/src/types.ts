export interface User {
  id?: number;
  email: string;
  firstName: string;
  lastName: string;
  company?: string;
  name?: string;
}

export interface File {
  id: string;
  name: string;
  size: string;
  type: string;
  uploadedAt: Date;
}

export interface Message {
  id: string;
  subject: string;
  content: string;
  sender: string;
  createdAt: Date;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
}

export interface Stats {
  files: number;
  messages: number;
  notes: number;
}

export type Section = 'overview' | 'files' | 'messages' | 'notes' | 'settings';

export interface ActivityItem {
  id: string;
  type: 'file' | 'message' | 'note';
  title: string;
  description: string;
  timestamp: Date;
  icon: string;
  bgColor: string;
  textColor: string;
}

export type ToastType = 'info' | 'success' | 'error';
