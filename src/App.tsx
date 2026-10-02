import React, { useState, useEffect } from 'react';
import { Header, TabKey } from './components/Header';
import { WelcomeModal } from './components/WelcomeModal';
import { HomeTab } from './components/tabs/HomeTab';
import { DailyActivitiesTab } from './components/tabs/DailyActivitiesTab';
import { BookGuideTab } from './components/tabs/BookGuideTab';
import { MeetingTab } from './components/tabs/MeetingTab';
import { CommunicationTab } from './components/tabs/CommunicationTab';
import { TasksTab } from './components/tabs/TasksTab';
import {
  ACTIVITIES_DATA,
  STORIES_DATA,
  LOVE_WORDS,
  INITIAL_TASKS,
} from './data/defaultData';
import { MeetingRecord, TaskItem } from './types';
import { Coffee, Heart } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabKey>('home');

  // Members state
  const [members, setMembers] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('aile_baglari_members');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Welcome modal state (initial onboarding if no members)
  const [isWelcomeOpen, setIsWelcomeOpen] = useState<boolean>(() => {
    try {
      const hasOnboarded = localStorage.getItem('aile_baglari_onboarded');
      return !hasOnboarded;
    } catch {
      return true;
    }
  });

  // Completed activities state
  const [completedActivityIds, setCompletedActivityIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('aile_baglari_completed_activities');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Meetings state
  const [meetings, setMeetings] = useState<MeetingRecord[]>(() => {
    try {
      const saved = localStorage.getItem('aile_baglari_meetings');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Tasks state
  const [tasks, setTasks] = useState<TaskItem[]>(() => {
    try {
      const saved = localStorage.getItem('aile_baglari_tasks');
      return saved ? JSON.parse(saved) : INITIAL_TASKS;
    } catch {
      return INITIAL_TASKS;
    }
  });

  // Persist members
  useEffect(() => {
    try {
      localStorage.setItem('aile_baglari_members', JSON.stringify(members));
    } catch (e) {
      console.error(e);
    }
  }, [members]);

  // Persist completed activities
  useEffect(() => {
    try {
      localStorage.setItem(
        'aile_baglari_completed_activities',
        JSON.stringify(completedActivityIds)
      );
    } catch (e) {
      console.error(e);
    }
  }, [completedActivityIds]);

  // Persist meetings
  useEffect(() => {
    try {
      localStorage.setItem('aile_baglari_meetings', JSON.stringify(meetings));
    } catch (e) {
      console.error(e);
    }
  }, [meetings]);

  // Persist tasks
  useEffect(() => {
    try {
      localStorage.setItem('aile_baglari_tasks', JSON.stringify(tasks));
    } catch (e) {
      console.error(e);
    }
  }, [tasks]);

  const handleAddMember = (name: string) => {
    if (!members.includes(name)) {
      setMembers([...members, name]);
    }
  };

  const handleRemoveMember = (name: string) => {
    setMembers(members.filter((m) => m !== name));
  };

  const handleCompleteOnboarding = () => {
    try {
      localStorage.setItem('aile_baglari_onboarded', 'true');
    } catch (e) {
      console.error(e);
    }
    setIsWelcomeOpen(false);
  };

  const handleToggleActivity = (activityId: string) => {
    if (completedActivityIds.includes(activityId)) {
      setCompletedActivityIds(completedActivityIds.filter((id) => id !== activityId));
    } else {
      setCompletedActivityIds([...completedActivityIds, activityId]);
    }
  };

  const handleSaveMeeting = (record: Omit<MeetingRecord, 'id' | 'createdAt'>) => {
    const newRecord: MeetingRecord = {
      ...record,
      id: 'm-' + Date.now(),
      createdAt: Date.now(),
    };
    setMeetings([newRecord, ...meetings]);
  };

  const handleDeleteMeeting = (id: string) => {
    setMeetings(meetings.filter((m) => m.id !== id));
  };

  const handleAddTask = (text: string, assignees: string[]) => {
    const newTask: TaskItem = {
      id: 't-' + Date.now(),
      text,
      assignees,
      done: false,
      createdAt: Date.now(),
    };
    setTasks([newTask, ...tasks]);
  };

  const handleToggleTask = (id: string) => {
    setTasks(
      tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const handleUpdateAssignees = (id: string, assignees: string[]) => {
    setTasks(
      tasks.map((t) => (t.id === id ? { ...t, assignees } : t))
    );
  };

  // Determine current day activity
  const dayIndex = new Date().getDay() === 0 ? 6 : new Date().getDay() - 1;
  const todayActivity = ACTIVITIES_DATA[dayIndex] || ACTIVITIES_DATA[0];

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-slate-800">
      {/* Top Bar Navigation */}
      <Header
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        memberCount={members.length}
        onOpenMembersModal={() => setIsWelcomeOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {activeTab === 'home' && (
          <HomeTab
            onNavigate={(tab) => {
              setActiveTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            loveWords={LOVE_WORDS}
            members={members}
            todayActivity={todayActivity}
            meetings={meetings}
            tasks={tasks}
          />
        )}

        {activeTab === 'daily' && (
          <DailyActivitiesTab
            activities={ACTIVITIES_DATA}
            completedActivityIds={completedActivityIds}
            onToggleComplete={handleToggleActivity}
          />
        )}

        {activeTab === 'book' && <BookGuideTab stories={STORIES_DATA} />}

        {activeTab === 'meeting' && (
          <MeetingTab
            members={members}
            meetings={meetings}
            onSaveMeeting={handleSaveMeeting}
            onDeleteMeeting={handleDeleteMeeting}
          />
        )}

        {activeTab === 'chat' && <CommunicationTab />}

        {activeTab === 'tasks' && (
          <TasksTab
            tasks={tasks}
            members={members}
            onAddTask={handleAddTask}
            onToggleTask={handleToggleTask}
            onDeleteTask={handleDeleteTask}
            onUpdateAssignees={handleUpdateAssignees}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-amber-900/10 mt-auto py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-amber-100/70 text-amber-800 flex items-center justify-center">
              <Coffee className="w-4 h-4 text-amber-700" />
            </div>
            <span className="font-serif font-bold text-slate-800 text-base">
              Aile Bağları
            </span>
            <span className="text-slate-300">·</span>
            <span className="text-xs text-slate-500">"Aile Dediğin" Platformu</span>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>Sevgi paylaştıkça, yuvalar dinledikçe büyür.</span>
          </div>
        </div>
      </footer>

      {/* Welcome / Family Setup Modal */}
      <WelcomeModal
        isOpen={isWelcomeOpen}
        members={members}
        onAddMember={handleAddMember}
        onRemoveMember={handleRemoveMember}
        onStart={handleCompleteOnboarding}
        onClose={() => setIsWelcomeOpen(false)}
        isInitialOnboarding={members.length === 0}
      />
    </div>
  );
}
