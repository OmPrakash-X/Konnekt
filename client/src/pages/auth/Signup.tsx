import React from 'react';
import SignupForm from '../../components/auth/SignupForm';
import Container from '../../components/layout/Container';

const Signup: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <Container size="sm">
        <SignupForm />
      </Container>
    </div>
  );
};

export default Signup;
