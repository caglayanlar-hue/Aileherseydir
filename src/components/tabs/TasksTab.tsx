import React, { useState } from 'react';
import { TaskItem } from '../../types';
import {
  CheckSquare,
  Plus,
  Trash2,
  Users,
  Check,
  Filter,
  UserPlus,
  Sparkles,
} from 'lucide-react';
import { CustomModal } from '../CustomModal';

interface TasksTabProps {
  tasks: TaskItem[];
  members: string[];
  onAddTask: (text: string, assignees: string[]) => void;
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
  onUpdateAssignees: (id: string, assignees: string[]) => void;
}

export const TasksTab: React.FC<TasksTabProps> = ({
  tasks,
  members,
  onAddTask,
  onToggleTask,
  onDeleteTask,
  onUpdateAssignees,
}) => {
  const [taskInput, setTaskInput] = useState('');
  const [filterMode, setFilterMode] = useState<'all' | 'pending' | 'completed'>('all');
  const [assigningTaskId, setAssigningTaskId] = useState<string | null>(null);

  // Modal alert
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const quickTasks = [
    'Akşam sofrasını toplamak',
    'Çöpü dışarı çıkarmak',
    'Kahvaltı masasını kurmak',
    'Çiçekleri sulamak',
    'Salon kitaplığını düzenlemek',
  ];

  const handleAdd = () => {
    const trimmed = taskInput.trim();
    if (!trimmed) return;
    onAddTask(trimmed, []);
    setTaskInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAdd();
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (filterMode === 'pending') return !task.done;
    if (filterMode === 'completed') return task.done;
    return true;
  });

  const toggleAssignee = (taskId: string, member: string) => {
    const targetTask = tasks.find((t) => t.id === taskId);
    if (!targetTask) return;

    let newAssignees: string[];
    if (targetTask.assignees.includes(member)) {
      newAssignees = targetTask.assignees.filter((a) => a !== member);
    } else {
      newAssignees = [...targetTask.assignees, member];
    }
    onUpdateAssignees(taskId, newAssignees);
  };

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-700 mb-1">
          <CheckSquare className="w-4 h-4 text-emerald-600" />
          <span>Birlikte Yaşam ve Sorumluluk</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-800">
          Adil Görev Paylaşımı
        </h2>
        <p className="text-slate-600 text-sm sm:text-base mt-1">
          Ev işlerini ve sorumlulukları adil paylaşmak, ailede "biz" ve yardımlaşma duygusunu pekiştirir.
        </p>
      </div>

      {/* Main Card */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        {/* Top Control Bar */}
        <div className="p-6 bg-slate-50/80 border-b border-slate-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="w-full md:w-auto">
            <h3 className="font-bold text-slate-800 text-base">Aile Görev Panosu</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Ev işlerini ekleyin, aile üyelerine atayın ve tamamlandıkça işaretleyin.
            </p>
          </div>

          {/* Add Input */}
          <div className="w-full md:w-auto flex items-center gap-2">
            <input
              type="text"
              value={taskInput}
              onChange={(e) => setTaskInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Yeni bir ev görevi yazın..."
              className="w-full md:w-80 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-xs"
            />
            <button
              type="button"
              onClick={handleAdd}
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm transition-colors shadow-xs flex items-center gap-1.5 shrink-0 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Ekle</span>
            </button>
          </div>
        </div>

        {/* Quick Suggestion Chips */}
        <div className="px-6 py-3 bg-slate-50/40 border-b border-slate-100 flex flex-wrap items-center gap-2">
          <span className="text-xs text-slate-400 font-medium">Hızlı görevler:</span>
          {quickTasks.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => onAddTask(t, [])}
              className="text-xs px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-emerald-700 hover:border-emerald-200 transition-colors cursor-pointer"
            >
              +{t}
            </button>
          ))}
        </div>

        {/* Filter Bar */}
        <div className="px-6 py-3 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setFilterMode('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                filterMode === 'all'
                  ? 'bg-slate-800 text-white'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Tümü ({tasks.length})
            </button>
            <button
              type="button"
              onClick={() => setFilterMode('pending')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                filterMode === 'pending'
                  ? 'bg-slate-800 text-white'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Yapılacaklar ({tasks.filter((t) => !t.done).length})
            </button>
            <button
              type="button"
              onClick={() => setFilterMode('completed')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                filterMode === 'completed'
                  ? 'bg-slate-800 text-white'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Tamamlananlar ({tasks.filter((t) => t.done).length})
            </button>
          </div>
        </div>

        {/* Task List Table */}
        <div className="overflow-x-auto min-h-[300px]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 text-xs uppercase tracking-wider font-semibold">
                <th className="py-4 px-6 w-16 text-center">Durum</th>
                <th className="py-4 px-6">Görev Tanımı</th>
                <th className="py-4 px-6 w-72">Sorumlu Aile Üyesi</th>
                <th className="py-4 px-6 w-20 text-center">Sil</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredTasks.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-16 text-center text-slate-400 text-sm italic">
                    Bu filtrede listelenecek görev bulunmuyor.
                  </td>
                </tr>
              ) : (
                filteredTasks.map((task) => (
                  <tr
                    key={task.id}
                    className={`transition-colors hover:bg-slate-50/60 ${
                      task.done ? 'bg-slate-50/30' : ''
                    }`}
                  >
                    {/* Status Checkbox */}
                    <td className="py-4 px-6 text-center">
                      <button
                        type="button"
                        onClick={() => onToggleTask(task.id)}
                        className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-colors cursor-pointer ${
                          task.done
                            ? 'bg-emerald-600 border-emerald-600 text-white'
                            : 'border-slate-300 hover:border-emerald-500 bg-white'
                        }`}
                        aria-label="Görevi tamamla"
                      >
                        {task.done && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </button>
                    </td>

                    {/* Task Title */}
                    <td className="py-4 px-6">
                      <span
                        className={`text-sm font-medium ${
                          task.done ? 'line-through text-slate-400' : 'text-slate-800'
                        }`}
                      >
                        {task.text}
                      </span>
                    </td>

                    {/* Assignees */}
                    <td className="py-4 px-6">
                      <div className="flex flex-wrap items-center gap-1.5">
                        {task.assignees.map((assignee) => (
                          <span
                            key={assignee}
                            className="inline-flex items-center gap-1 bg-amber-50 text-amber-900 border border-amber-200/80 px-2 py-0.5 rounded-lg text-xs font-semibold"
                          >
                            <span>{assignee}</span>
                            <button
                              type="button"
                              onClick={() => toggleAssignee(task.id, assignee)}
                              className="text-amber-500 hover:text-rose-600 ml-0.5"
                              title="Sorumluyu kaldır"
                            >
                              ×
                            </button>
                          </span>
                        ))}

                        {/* Assign member toggle button */}
                        <div className="relative">
                          <button
                            type="button"
                            onClick={() => {
                              if (members.length === 0) {
                                setModalMessage(
                                  'Lütfen önce üst menüdeki "Aile" butonundan aile üyelerini ekleyin.'
                                );
                                setModalOpen(true);
                                return;
                              }
                              setAssigningTaskId(
                                assigningTaskId === task.id ? null : task.id
                              );
                            }}
                            className="px-2 py-1 rounded-lg border border-dashed border-slate-300 hover:border-emerald-500 text-slate-500 hover:text-emerald-700 text-xs flex items-center gap-1 transition-colors cursor-pointer"
                            title="Sorumlu Ata"
                          >
                            <UserPlus className="w-3 h-3" />
                            <span>{task.assignees.length === 0 ? 'Kişi Ata' : '+'}</span>
                          </button>

                          {/* Assign dropdown */}
                          {assigningTaskId === task.id && (
                            <div className="absolute left-0 top-full mt-1 z-30 bg-white rounded-xl shadow-lg border border-slate-200 p-2 min-w-[140px] space-y-1 animate-fade-in">
                              <div className="text-[10px] font-bold text-slate-400 px-2 uppercase">
                                Aile Üyesi Seç:
                              </div>
                              {members.map((m) => {
                                const isAssigned = task.assignees.includes(m);
                                return (
                                  <button
                                    key={m}
                                    type="button"
                                    onClick={() => toggleAssignee(task.id, m)}
                                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center justify-between transition-colors ${
                                      isAssigned
                                        ? 'bg-amber-50 text-amber-900 font-semibold'
                                        : 'text-slate-700 hover:bg-slate-50'
                                    }`}
                                  >
                                    <span>{m}</span>
                                    {isAssigned && <Check className="w-3 h-3 text-amber-600" />}
                                  </button>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Delete */}
                    <td className="py-4 px-6 text-center">
                      <button
                        type="button"
                        onClick={() => onDeleteTask(task.id)}
                        className="p-1.5 text-slate-300 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                        title="Görevi Sil"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <CustomModal
        isOpen={modalOpen}
        title="Bilgi"
        message={modalMessage}
        type="info"
        onConfirm={() => setModalOpen(false)}
      />
    </div>
  );
};
