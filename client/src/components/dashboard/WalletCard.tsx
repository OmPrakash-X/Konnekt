import React from 'react';
import { DollarSign, TrendingUp, TrendingDown, Plus } from 'lucide-react';
import Card from '../common/Card';
import Button from '../common/Button';

interface WalletCardProps {
  balance: number;
  earned: number;
  spent: number;
  onAddCredits: () => void;
}

const WalletCard: React.FC<WalletCardProps> = ({
  balance,
  earned,
  spent,
  onAddCredits,
}) => {
  return (
    <Card>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Wallet
        </h3>
        <Button size="sm" onClick={onAddCredits}>
          <Plus className="w-4 h-4" />
          Add Credits
        </Button>
      </div>

      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-[#32b8c6]/10 dark:bg-[#32b8c6]/20 rounded-full mb-3">
          <DollarSign className="w-10 h-10 text-[#32b8c6]" />
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400">Available Balance</p>
        <p className="text-4xl font-bold text-gray-900 dark:text-white mt-2">
          {balance}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400">credits</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-green-50 dark:bg-green-900/10 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-green-600 dark:text-green-400" />
            <span className="text-sm text-gray-600 dark:text-gray-400">Earned</span>
          </div>
          <p className="text-2xl font-bold text-green-600 dark:text-green-400">
            +{earned}
          </p>
        </div>

        <div className="p-4 bg-red-50 dark:bg-red-900/10 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <TrendingDown className="w-4 h-4 text-red-600 dark:text-red-400" />
            <span className="text-sm text-gray-600 dark:text-gray-400">Spent</span>
          </div>
          <p className="text-2xl font-bold text-red-600 dark:text-red-400">
            -{spent}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default WalletCard;
