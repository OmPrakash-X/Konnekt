export interface Session {
  id: string;
  title: string;
  expert: {
    name: string;
    avatar?: string;
  };
  learner?: {
    name: string;
    avatar?: string;
  };
  date: string;
  startTime: string;
  endTime: string;
  duration: number;
  mode: 'online' | 'offline';
  location?: string;
  meetingLink?: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  credits: number;
  notes?: string;
}

export interface BookSessionData {
  expertId: string;
  skillId: string;
  date: string;
  startTime: string;
  duration: number;
  mode: 'online' | 'offline';
  notes?: string;
}
