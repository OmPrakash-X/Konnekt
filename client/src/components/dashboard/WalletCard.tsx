import React from 'react';
import { DollarSign, TrendingUp, TrendingDown, Plus } from 'lucide-react';

interface WalletCardProps {
  balance: number;
  earned: number;
  spent: number;
  onAddCredits: () => void;
}

const WalletCard: React.FC<WalletCardProps> = ({ balance, earned, spent, onAddCredits }) => {
  return (
    <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-white">Wallet</h3>
        <button
          onClick={onAddCredits}
          className="px-4 py-2 bg-linear-to-r from-[#32b8c6] to-[#2a9fac] text-white rounded-lg font-medium shadow-lg shadow-[#32b8c6]/25 hover:shadow-xl hover:shadow-[#32b8c6]/40 transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Credits
        </button>
      </div>

      {/* Balance Display */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-linear-to-br from-[#32b8c6]/20 to-purple-500/20 rounded-full mb-3 backdrop-blur-sm border border-white/10">
          <DollarSign className="w-10 h-10 text-[#32b8c6]" />
        </div>
        <p className="text-sm text-gray-400 mb-1">Available Balance</p>
        <p className="text-4xl font-bold text-white mt-2">{balance}</p>
        <p className="text-sm text-gray-400 mt-1">credits</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        {/* Earned */}
        <div className="p-4 bg-green-500/10 backdrop-blur-sm rounded-xl border border-green-500/20">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-green-400" />
            <span className="text-sm text-gray-400">Earned</span>
          </div>
          <p className="text-2xl font-bold text-green-400">{earned}</p>
        </div>

        {/* Spent */}
        <div className="p-4 bg-red-500/10 backdrop-blur-sm rounded-xl border border-red-500/20">
          <div className="flex items-center gap-2 mb-2">
            <TrendingDown className="w-4 h-4 text-red-400" />
            <span className="text-sm text-gray-400">Spent</span>
          </div>
          <p className="text-2xl font-bold text-red-400">{spent}</p>
        </div>
      </div>
    </div>
  );
};

export default WalletCard;
