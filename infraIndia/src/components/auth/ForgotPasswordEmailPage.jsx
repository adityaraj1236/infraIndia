import { useState } from 'react';
import {
  TextInput,
  Button,
  Paper,
  Container,
  Title,
  Text,
} from '@mantine/core';
import { Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ForgotPasswordEmailPage = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleNext = () => {
    console.log('Email submitted for password reset:', email);
    navigate('/verify-otp'); // Redirect to OTP verification page
  };

  return (
    <Container size={420} my={40}>
      <Title align="center" order={2} mb="md">
        Forgot Password
      </Title>

      <Paper withBorder shadow="md" p={30} radius="md">
        <Text size="sm" mb="md">
          Enter your email address and we’ll send you a verification code.
        </Text>

        <TextInput
          label="Email"
          placeholder="your@email.com"
          required
          icon={<Mail size={18} />}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Button fullWidth mt="xl" onClick={handleNext}>
          Next
        </Button>
      </Paper>
    </Container>
  );
};

export default ForgotPasswordEmailPage;
