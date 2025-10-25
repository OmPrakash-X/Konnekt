import React, { useState } from 'react';
import { ThumbsUp, MessageSquare } from 'lucide-react';
import Button from '../common/Button';
import Input from '../common/Input';

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
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white">
            Endorse this skill
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {endorsementCount} {endorsementCount === 1 ? 'endorsement' : 'endorsements'}
          </p>
        </div>
        
        {!isEndorsed ? (
          <Button
            onClick={() => setShowNoteInput(!showNoteInput)}
            variant="outline"
            size="sm"
          >
            <ThumbsUp className="w-4 h-4" />
            Endorse
          </Button>
        ) : (
          <Button variant="secondary" size="sm" disabled>
            <ThumbsUp className="w-4 h-4 fill-current" />
            Endorsed
          </Button>
        )}
      </div>

      {showNoteInput && !isEndorsed && (
        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg space-y-3">
          <Input
            placeholder={`Add a note about ${skillName}...`}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            icon={<MessageSquare className="w-4 h-4" />}
          />
          <div className="flex gap-2">
            <Button onClick={handleEndorse} size="sm" isLoading={isLoading}>
              Submit Endorsement
            </Button>
            <Button
              onClick={() => setShowNoteInput(false)}
              variant="ghost"
              size="sm"
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EndorseSkill;
