export interface FamilyMember {
  id: string;
  name: string;
  avatarColor: string;
}

export interface Activity {
  id: string;
  title: string;
  day: string;
  category: 'Oyun' | 'Sohbet' | 'Etkinlik';
  duration: string;
  iconName: string;
  desc: string;
  rules: string[];
  benefit: string;
}

export interface Story {
  id: string;
  title: string;
  author: string;
  content: string;
  questions: string[];
  chatTopic: string;
}

export interface MeetingRecord {
  id: string;
  date: string; // ISO string YYYY-MM-DD
  formattedDate: string;
  reporter: string;
  attendees?: string[];
  issues: string;
  decisions: string;
  createdAt: number;
}

export interface TaskItem {
  id: string;
  text: string;
  assignees: string[];
  done: boolean;
  createdAt: number;
}
