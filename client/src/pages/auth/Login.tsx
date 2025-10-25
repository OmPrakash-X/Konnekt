import React from 'react';
import LoginForm from '../../components/auth/LoginForm';
import Container from '../../components/layout/Container';

const Login: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <Container size="sm">
        <LoginForm />
      </Container>
    </div>
  );
};

export default Login;
