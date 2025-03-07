import { useState } from 'react';
import {
  PinInput,
  Button,
  Paper,
  Container,
  Title,
  Text,
  Group,
} from '@mantine/core';
import { useNavigate } from 'react-router-dom';

const VerifyOtpPage = () => {
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();

  const handleVerify = () => {
    console.log('Entered OTP:', otp);
    // You can add OTP verification logic here
    navigate('/reset-password'); // Redirect to reset password page or dashboard after success
  };

  return (
    <Container size={420} my={40}>
      <Title align="center" order={2} mb="md">
        Verify OTP
      </Title>

      <Paper withBorder shadow="md" p={30} radius="md">
        <Text size="sm" mb="md">
          We’ve sent a 6-digit verification code to your email. Please enter it below.
        </Text>

        <Group position="center" my="md">
          <PinInput
            length={6}
            size="md"
            value={otp}
            onChange={setOtp}
            type="number"
          />
        </Group>

        <Button fullWidth mt="xl" onClick={handleVerify}>
          Verify
        </Button>
      </Paper>
    </Container>
  );
};

export default VerifyOtpPage;
