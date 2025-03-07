import { useState } from 'react';
import {
  TextInput,
  PasswordInput,
  Button,
  Divider,
  Text,
  Group,
  Paper,
  Container,
  Title,
} from '@mantine/core';
import { Link } from 'react-router-dom';
import {  LogIn, Mail } from 'lucide-react'; // Lucide icons

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailLogin = () => {
    console.log('Email:', email, 'Password:', password);
  };

  const handleOAuthLogin = (provider) => {
    console.log('Login with:', provider);
  };

  return (
    <Container size={420} my={40}>
      <Title align="center" order={2} mb="md">
        Welcome to InfraIndia
      </Title>

      <Paper withBorder shadow="md" p={30} radius="md">
        <TextInput
          label="Email"
          placeholder="your@email.com"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <PasswordInput
          label="Password"
          placeholder="Your password"
          required
          mt="md"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Forgot Password Link */}
        <Text size="sm" align="right" mt="xs">
          <Link to="/forgot-password" className="text-blue-500">
            Forgot Password?
          </Link>
        </Text>

        <Button
          fullWidth
          mt="xl"
          onClick={handleEmailLogin}
        >
          Login
        </Button>

        <Divider label="or continue with" labelPosition="center" my="lg" />

        <Group grow>
          <Button
            variant="outline"
            onClick={() => handleOAuthLogin('Google')}
          >
            Google
          </Button>
        </Group>

        <Text size="sm" align="center" mt="md">
          Don’t have an account?{' '}
          <Link to="/signup" className="text-blue-500">
            Create one
          </Link>
        </Text>
      </Paper>
    </Container>
  );
};

export default LoginPage;
