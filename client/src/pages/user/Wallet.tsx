import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getMyProfile } from '../../redux/features/userSlice';
import { getTransactionHistory } from '../../redux/features/transactionSlice';
import { Plus, TrendingUp, TrendingDown } from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Container from '../../components/layout/Container';
import Spinner from '../../components/common/Spinner';

const Wallet: React.FC = () => {
  const dispatch = useAppDispatch();
  const { profile } = useAppSelector((state) => state.user);
  const { transactions, loading } = useAppSelector((state) => state.transaction);

  useEffect(() => {
    dispatch(getMyProfile());
    dispatch(getTransactionHistory());
  }, [dispatch]);

  const handleAddCredits = () => {
    alert('Payment gateway integration coming soon!');
  };

  if (loading && !profile) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <Container>
      <div className="py-12 space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            My Wallet
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your credits and transactions
          </p>
        </div>

        {/* Balance Card */}
        <Card padding="lg">
          <div className="text-center">
            <p className="text-gray-500 dark:text-gray-400 mb-2">Available Balance</p>
            <p className="text-5xl font-bold text-[#32b8c6] mb-6">
              {profile?.stats?.credits || 0} Credits
            </p>
            <Button onClick={handleAddCredits}>
              <Plus className="w-5 h-5" />
              Add Credits
            </Button>
          </div>
        </Card>

        {/* Stats */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card padding="lg">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
                <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Total Earned</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {profile?.stats?.creditsEarned || 0}
                </p>
              </div>
            </div>
          </Card>

          <Card padding="lg">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-red-100 dark:bg-red-900/20 rounded-lg">
                <TrendingDown className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Total Spent</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {profile?.stats?.creditsSpent || 0}
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Transaction History */}
        <Card padding="lg">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Transaction History
          </h2>
          {transactions.length === 0 ? (
            <p className="text-center text-gray-500 dark:text-gray-400 py-8">
              No transactions yet
            </p>
          ) : (
            <div className="space-y-4">
              {transactions.map((transaction: any) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
                >
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {transaction.description}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(transaction.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <p
                    className={`text-lg font-semibold ${
                      transaction.type === 'credit'
                        ? 'text-green-600 dark:text-green-400'
                        : 'text-red-600 dark:text-red-400'
                    }`}
                  >
                    {transaction.type === 'credit' ? '+' : '-'}
                    {transaction.amount}
                  </p>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </Container>
  );
};

export default Wallet;
