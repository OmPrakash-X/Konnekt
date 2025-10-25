// SessionCalendar.tsx
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Badge from '../common/Badge';
import Card from '../common/Card';

interface SessionCalendarProps {
  sessions: Array<{
    id: string;
    date: string;
    title: string;
    status: 'upcoming' | 'completed' | 'cancelled';
  }>;
  onDateClick?: (date: string) => void;
}

const SessionCalendar: React.FC<SessionCalendarProps> = ({ sessions, onDateClick }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek };
  };

  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentDate);

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const getSessionsForDate = (day: number) => {
    const dateStr = `${currentDate.getFullYear()}-${String(
      currentDate.getMonth() + 1
    ).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return sessions.filter((s) => s.date.startsWith(dateStr));
  };

  return (
    <Card>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </h2>
        <div className="flex gap-2">
          <button
            onClick={previousMonth}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextMonth}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="text-center text-sm font-medium text-gray-500 dark:text-gray-400 py-2">
            {day}
          </div>
        ))}

        {Array.from({ length: startingDayOfWeek }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}

        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const daySessions = getSessionsForDate(day);
          const hasSession = daySessions.length > 0;

          return (
            <button
              key={day}
              onClick={() => hasSession && onDateClick?.(`${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${day}`)}
              className={`aspect-square p-2 rounded-lg text-center transition-colors relative ${
                hasSession
                  ? 'bg-[#32b8c6]/10 hover:bg-[#32b8c6]/20 cursor-pointer'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              <span className={`text-sm ${hasSession ? 'font-semibold text-[#32b8c6]' : 'text-gray-700 dark:text-gray-300'}`}>
                {day}
              </span>
              {hasSession && (
                <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-0.5">
                  {daySessions.slice(0, 3).map((s, idx) => (
                    <div
                      key={idx}
                      className={`w-1 h-1 rounded-full ${
                        s.status === 'upcoming' ? 'bg-blue-500' :
                        s.status === 'completed' ? 'bg-green-500' : 'bg-red-500'
                      }`}
                    />
                  ))}
                </div>
              )}
            </button>
          );
        })}
      </div>
    </Card>
  );
};

export default SessionCalendar;
