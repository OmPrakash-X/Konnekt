import React from 'react';
import ForgotPasswordComponent from '../../components/auth/ForgotPassword';
import Container from '../../components/layout/Container';

const ForgotPassword: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black py-12 px-4">
      <Container size="sm">
        <ForgotPasswordComponent />
      </Container>
    </div>
  );
};

export default ForgotPassword;
