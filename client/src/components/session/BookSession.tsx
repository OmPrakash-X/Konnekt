import React, { useState } from 'react';
import { Calendar, Clock, Video, MapPin, DollarSign } from 'lucide-react';
import Button from '../common/Button';
import Card from '../common/Card';

interface BookSessionProps {
  expert: {
    name: string;
    avatar?: string;
  };
  skill: {
    name: string;
    creditsPerHour: number;
  };
  availableSlots: Array<{
    date: string;
    times: string[];
  }>;
  onBook: (bookingData: {
    date: string;
    time: string;
    duration: number;
    mode: 'online' | 'offline';
    notes?: string;
  }) => void;
}

const BookSession: React.FC<BookSessionProps> = ({
  skill,
  availableSlots,
  onBook,
}) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [duration, setDuration] = useState(1);
  const [mode, setMode] = useState<'online' | 'offline'>('online');
  const [notes, setNotes] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const totalCredits = skill.creditsPerHour * duration;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await onBook({
        date: selectedDate,
        time: selectedTime,
        duration,
        mode,
        notes,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const availableTimes =
    availableSlots.find((slot) => slot.date === selectedDate)?.times || [];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Date Selection */}
      <Card>
        <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-[#32b8c6]" />
          Select Date
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {availableSlots.map((slot) => (
            <button
              key={slot.date}
              type="button"
              onClick={() => {
                setSelectedDate(slot.date);
                setSelectedTime('');
              }}
              className={`p-3 rounded-lg text-sm font-medium transition-colors ${
                selectedDate === slot.date
                  ? 'bg-[#32b8c6] text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {new Date(slot.date).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
              })}
            </button>
          ))}
        </div>
      </Card>

      {/* Time Selection */}
      {selectedDate && (
        <Card>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-[#32b8c6]" />
            Select Time
          </h3>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
            {availableTimes.map((time) => (
              <button
                key={time}
                type="button"
                onClick={() => setSelectedTime(time)}
                className={`p-3 rounded-lg text-sm font-medium transition-colors ${
                  selectedTime === time
                    ? 'bg-[#32b8c6] text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {time}
              </button>
            ))}
          </div>
        </Card>
      )}

      {/* Duration */}
      <Card>
        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
          Duration
        </h3>
        <div className="flex gap-3">
          {[1, 2, 3, 4].map((hours) => (
            <button
              key={hours}
              type="button"
              onClick={() => setDuration(hours)}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                duration === hours
                  ? 'bg-[#32b8c6] text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {hours}h
            </button>
          ))}
        </div>
      </Card>

      {/* Mode */}
      <Card>
        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
          Session Mode
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setMode('online')}
            className={`p-4 rounded-lg text-center transition-colors ${
              mode === 'online'
                ? 'bg-[#32b8c6] text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            <Video className="w-6 h-6 mx-auto mb-2" />
            <span className="text-sm font-medium">Online</span>
          </button>
          <button
            type="button"
            onClick={() => setMode('offline')}
            className={`p-4 rounded-lg text-center transition-colors ${
              mode === 'offline'
                ? 'bg-[#32b8c6] text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            <MapPin className="w-6 h-6 mx-auto mb-2" />
            <span className="text-sm font-medium">In-person</span>
          </button>
        </div>
      </Card>

      {/* Notes */}
      <Card>
        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
          Additional Notes (Optional)
        </h3>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
          placeholder="Any specific topics or questions you'd like to cover..."
          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#32b8c6]"
        />
      </Card>

      {/* Summary & Submit */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <span className="text-gray-600 dark:text-gray-400">Total Credits</span>
          <div className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-[#32b8c6]" />
            <span className="text-2xl font-bold text-gray-900 dark:text-white">
              {totalCredits}
            </span>
          </div>
        </div>
        <Button
          type="submit"
          fullWidth
          disabled={!selectedDate || !selectedTime}
          isLoading={isLoading}
        >
          Book Session
        </Button>
      </Card>
    </form>
  );
};

export default BookSession;
