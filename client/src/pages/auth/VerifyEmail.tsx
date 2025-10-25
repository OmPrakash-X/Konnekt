import React from 'react';
import OtpVerification from '../../components/auth/OtpVerification';
import Container from '../../components/layout/Container';

const VerifyEmail: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <Container size="sm">
        <OtpVerification />
      </Container>
    </div>
  );
};

export default VerifyEmail;
