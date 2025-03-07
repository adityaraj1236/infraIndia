import { Container, Paper, Title, PasswordInput, Button, Text } from '@mantine/core';
import { Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const ResetPassword = () => {
    const navigate = useNavigate();
    const [newPassword , setNewPassword] = useState('');
    const handleSubmit = () => {
        // Implement password reset logic here
        console.log('Password reset submitted' , newPassword);
        navigate('/login');
    }
    return (
        <Container size={420} my={40}>
            <Title align="center" order={2} mb="md">
                Reset Your Password
            </Title>

            <Paper withBorder shadow="md" p={30} radius="md">
                <Text size="sm" mb="md" color="dimmed" align="center">
                    Enter your new password below.
                </Text>

                <PasswordInput
                    label="New Password"
                    placeholder="Enter new password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />

                <Button fullWidth mt="xl" onClick={handleSubmit}>
                    Reset Password
                </Button>
            </Paper>
        </Container>
    );
};

export default ResetPassword;
