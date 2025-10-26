import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { X, Calendar, Clock, Video, MapPin, CreditCard, AlertCircle, Check } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: {
    _id: string;
    name: string;
    email: string;
    profilePicture?: string;
    skills: Array<{ name: string; level: string; _id?: string }>;
    primarySkillColor: string;
    averageRating: number;
    completedSessions: number;
    distanceInKm: string;
  };
  isAuthenticated?: boolean;
}

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, user }) => {
  
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [sessionMode, setSessionMode] = useState<'online' | 'offline'>('online');
  const [duration, setDuration] = useState('60');
  const [message, setMessage] = useState('');
  const [step, setStep] = useState(1);
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  // ✅ FIXED: Hardcoded correct API URL
  const API_BASE_URL = 'http://localhost:5000/api/v1';

  useEffect(() => {
    const fetchAvailableSlots = async () => {
      if (!selectedDate) return;
      
      try {
        const response = await axios.get(
          `${API_BASE_URL}/sessions/available`,
          { 
            params: { 
              providerId: user._id, 
              date: selectedDate 
            },
            withCredentials: true
          }
        );
        
        setAvailableSlots(response.data.availableSlots || []);
      } catch (error) {
        console.error('Error fetching slots:', error);
        setAvailableSlots([
          '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
          '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM',
          '05:00 PM', '06:00 PM', '07:00 PM', '08:00 PM'
        ]);
      }
    };

    fetchAvailableSlots();
  }, [selectedDate, user._id]);

  if (!isOpen) return null;

  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM',
    '05:00 PM', '06:00 PM', '07:00 PM', '08:00 PM'
  ];

  const availableDates = Array.from({ length: 14 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return date;
  });

  const handleBookSession = () => {
    if (!selectedDate || !selectedTime) {
      toast.error('Please select date and time');
      return;
    }
    setStep(2);
  };

 const handleConfirmBooking = async () => {
  setLoading(true);
  
  try {
    // ✅ CHECK IF USING MOCK DATA - Add this check first
    if (user._id.startsWith('user_')) {
      // Mock booking for demo users
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
      console.log('📦 Mock booking created:', {
        providerId: user._id,
        scheduledDate: selectedDate,
        startTime: selectedTime,
        duration: parseInt(duration),
        locationType: sessionMode
      });
      toast.success('🎉 Booking successful! (You will be notified soon.)');
      onClose();
      return;
    }
    
    // ✅ Real API call for actual users (your existing code)
    console.log('🔍 Booking URL:', `${API_BASE_URL}/sessions/book`);
    
    const response = await axios.post(
      `${API_BASE_URL}/sessions/book`,
      {
        providerId: user._id,
        skillId: user.skills[0]?._id || null,
        scheduledDate: selectedDate,
        startTime: selectedTime,
        duration: parseInt(duration),
        locationType: sessionMode,
        meetingLink: sessionMode === 'online' ? 'Will be shared via email' : undefined,
        learnerNotes: message
      },
      {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    
    console.log('✅ Success:', response.data);
    toast.success('🎉 Session booked successfully!');
    onClose();
    
  } catch (error: any) {
    console.error('❌ Error:', error);
    console.error('Response:', error.response?.data);
    toast.error(error.response?.data?.message || 'Booking failed. Please try again.');
  } finally {
    setLoading(false);
  }
};


  return (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="bg-linear-to-br from-gray-900/95 via-gray-800/95 to-black/95 backdrop-blur-xl rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-white/10 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 bg-linear-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 backdrop-blur-xl border-b border-white/10 p-6">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-4">
              <img
                src={user.profilePicture || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`}
                alt={user.name}
                className="w-16 h-16 rounded-full border-4 border-cyan-500/50"
              />
              <div>
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  📅 Book Session with {user.name}
                </h2>
                <p className="text-gray-400 text-sm mt-1">
                  {user.skills[0].name} • ⭐ {user.averageRating} ({user.completedSessions} sessions)
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white text-3xl transition-colors hover:rotate-90 duration-300"
            >
              <X className="w-8 h-8" />
            </button>
          </div>
        </div>

        {step === 1 ? (
          /* Step 1: Booking Details */
          <div className="p-6 space-y-6">
            {/* Session Mode Selection */}
            <div>
              <label className=" text-cyan-400 font-semibold mb-3 flex items-center gap-2">
                <Video className="w-5 h-5" />
                Session Mode
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setSessionMode('online')}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                    sessionMode === 'online'
                      ? 'bg-cyan-500/20 border-cyan-500 shadow-lg shadow-cyan-500/20'
                      : 'bg-white/5 border-white/10 hover:border-white/30'
                  }`}
                >
                  <Video className="w-6 h-6 mx-auto mb-2 text-cyan-400" />
                  <p className="text-white font-medium">Online</p>
                  <p className="text-xs text-gray-400 mt-1">Video call session</p>
                </button>
                <button
                  onClick={() => setSessionMode('offline')}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                    sessionMode === 'offline'
                      ? 'bg-purple-500/20 border-purple-500 shadow-lg shadow-purple-500/20'
                      : 'bg-white/5 border-white/10 hover:border-white/30'
                  }`}
                >
                  <MapPin className="w-6 h-6 mx-auto mb-2 text-purple-400" />
                  <p className="text-white font-medium">In-Person</p>
                  <p className="text-xs text-gray-400 mt-1">{user.distanceInKm} km away</p>
                </button>
              </div>
            </div>

            {/* Date Selection */}
            <div>
              <label className=" text-cyan-400 font-semibold mb-3 flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Select Date
              </label>
              <div className="grid grid-cols-4 md:grid-cols-7 gap-2 max-h-64 overflow-y-auto p-2 bg-white/5 rounded-xl border border-white/10">
                {availableDates.map((date, idx) => {
                  const dateStr = date.toISOString().split('T')[0];
                  const isSelected = selectedDate === dateStr;
                  const isToday = idx === 0;
                  
                  return (
                    <button
                      key={idx}
                      onClick={() => setSelectedDate(dateStr)}
                      className={`p-3 rounded-lg text-center transition-all duration-300 ${
                        isSelected
                          ? 'bg-linear-to-br from-cyan-500 to-blue-500 text-white scale-105 shadow-lg'
                          : isToday
                          ? 'bg-white/10 text-white border border-cyan-500/50'
                          : 'bg-white/5 text-gray-300 hover:bg-white/10'
                      }`}
                    >
                      <p className="text-xs font-semibold">{date.toLocaleDateString('en-US', { weekday: 'short' })}</p>
                      <p className="text-lg font-bold">{date.getDate()}</p>
                      <p className="text-xs">{date.toLocaleDateString('en-US', { month: 'short' })}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Time Slots */}
            <div>
              <label className=" text-cyan-400 font-semibold mb-3 flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Select Time Slot
              </label>
              <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                {timeSlots.map((time) => {
                  const isAvailable = availableSlots.length === 0 || availableSlots.includes(time);
                  
                  return (
                    <button
                      key={time}
                      onClick={() => isAvailable && setSelectedTime(time)}
                      disabled={!isAvailable}
                      className={`p-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                        selectedTime === time
                          ? 'bg-linear-to-r from-cyan-500 to-blue-500 text-white scale-105 shadow-lg'
                          : !isAvailable
                          ? 'bg-red-500/10 text-red-400 border border-red-500/30 cursor-not-allowed opacity-50'
                          : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10'
                      }`}
                    >
                      {time}
                      {!isAvailable && <span className="block text-xs mt-1">Booked</span>}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Duration */}
            <div>
              <label className=" text-cyan-400 font-semibold mb-3 flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Session Duration
              </label>
              <div className="grid grid-cols-4 gap-3">
                {['30', '60', '90', '120'].map((min) => (
                  <button
                    key={min}
                    onClick={() => setDuration(min)}
                    className={`p-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                      duration === min
                        ? 'bg-linear-to-r from-purple-500 to-pink-500 text-white scale-105 shadow-lg'
                        : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10'
                    }`}
                  >
                    {min} min
                  </button>
                ))}
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="block text-cyan-400 font-semibold mb-3">
                Message (Optional)
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell the expert what you'd like to learn..."
                rows={4}
                maxLength={500}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all resize-none"
              />
              <p className="text-xs text-gray-500 mt-1">{message.length}/500 characters</p>
            </div>

            {/* Info Banner */}
            <div className="flex items-start gap-3 p-4 rounded-xl bg-blue-500/10 border border-blue-500/30">
              <AlertCircle className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="text-blue-400 font-medium">Booking Policy</p>
                <p className="text-gray-400 mt-1">
                  • Free cancellation up to 24 hours before session<br/>
                  • You'll receive a confirmation email with session details<br/>
                  • Automated reminder will be sent 1 hour before
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                onClick={onClose}
                className="flex-1 px-6 py-4 rounded-xl font-semibold bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white transition-all duration-300"
              >
                Cancel
              </button>
              <button
                onClick={handleBookSession}
                disabled={!selectedDate || !selectedTime}
                className="flex-1 px-6 py-4 rounded-xl font-semibold bg-linear-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white shadow-lg shadow-cyan-500/50 hover:shadow-xl hover:shadow-cyan-500/60 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                Continue to Payment
                <Check className="w-5 h-5" />
              </button>
            </div>
          </div>
        ) : (
          /* Step 2: Confirmation */
          <div className="p-6 space-y-6">
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-linear-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                <Check className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Confirm Your Booking</h3>
              <p className="text-gray-400">Review your session details</p>
            </div>

            {/* Booking Summary */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-4">
              <div className="flex justify-between items-center pb-4 border-b border-white/10">
                <span className="text-gray-400">Expert</span>
                <span className="text-white font-medium">{user.name}</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-white/10">
                <span className="text-gray-400">Skill</span>
                <span className="text-white font-medium">{user.skills[0].name}</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-white/10">
                <span className="text-gray-400">Date & Time</span>
                <span className="text-white font-medium text-right">
                  {new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                  <br />
                  {selectedTime}
                </span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-white/10">
                <span className="text-gray-400">Duration</span>
                <span className="text-white font-medium">{duration} minutes</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-white/10">
                <span className="text-gray-400">Mode</span>
                <span className="text-white font-medium capitalize">{sessionMode}</span>
              </div>
              <div className="flex justify-between items-center pt-4">
                <span className="text-gray-400 text-lg">Total Credits</span>
                <span className="text-2xl font-bold text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-500">
                  {parseInt(duration) / 10} Credits
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => setStep(1)}
                disabled={loading}
                className="flex-1 px-6 py-4 rounded-xl font-semibold bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white transition-all duration-300 disabled:opacity-50"
              >
                ← Back
              </button>
              <button
                onClick={handleConfirmBooking}
                disabled={loading}
                className="flex-1 px-6 py-4 rounded-xl font-semibold bg-linear-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-lg shadow-green-500/50 hover:shadow-xl hover:shadow-green-500/60 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>
                    <CreditCard className="w-5 h-5" />
                    Confirm Booking
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingModal;
