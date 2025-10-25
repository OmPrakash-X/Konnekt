import React, { useState } from 'react';
import { ThumbsUp, MessageSquare } from 'lucide-react';

interface EndorseSkillProps {
  skillId: string;
  skillName: string;
  userId: string;
  isEndorsed?: boolean;
  endorsementCount: number;
  onEndorse: (skillId: string, note?: string) => void;
}

const EndorseSkill: React.FC<EndorseSkillProps> = ({
  skillId,
  skillName,
  userId,
  isEndorsed = false,
  endorsementCount,
  onEndorse,
}) => {
  const [showNoteInput, setShowNoteInput] = useState(false);
  const [note, setNote] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleEndorse = async () => {
    setIsLoading(true);
    try {
      await onEndorse(skillId, note);
      setNote('');
      setShowNoteInput(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-white">
            Endorse this skill
          </h3>
          <p className="text-sm text-gray-400">
            {endorsementCount} {endorsementCount === 1 ? 'endorsement' : 'endorsements'}
          </p>
        </div>
        
        {!isEndorsed ? (
          <button
            onClick={() => setShowNoteInput(!showNoteInput)}
            className="px-4 py-2 bg-white/10 border border-white/20 text-white rounded-lg hover:bg-white/20 transition-all flex items-center gap-2"
          >
            <ThumbsUp className="w-4 h-4" />
            Endorse
          </button>
        ) : (
          <button
            disabled
            className="px-4 py-2 bg-white/5 border border-white/10 text-gray-400 rounded-lg flex items-center gap-2 cursor-not-allowed"
          >
            <ThumbsUp className="w-4 h-4 fill-current" />
            Endorsed
          </button>
        )}
      </div>

      {showNoteInput && !isEndorsed && (
        <div className="p-4 bg-white/5 border border-white/10 rounded-lg space-y-3">
          <div className="relative">
            <MessageSquare className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder={`Add a note about ${skillName}...`}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:bg-white/10 focus:border-white/30 transition-all"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleEndorse}
              disabled={isLoading}
              className="px-4 py-2 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-all disabled:opacity-50"
            >
              {isLoading ? 'Submitting...' : 'Submit Endorsement'}
            </button>
            <button
              onClick={() => setShowNoteInput(false)}
              className="px-4 py-2 bg-white/5 border border-white/10 text-white rounded-lg hover:bg-white/10 transition-all"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EndorseSkill;
