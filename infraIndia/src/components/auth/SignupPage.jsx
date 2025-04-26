import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextInput, PasswordInput, Select, Button, Paper, Title, Text } from '@mantine/core';
import axios from 'axios';
import toast from 'react-hot-toast';

const SignupPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
  });

  const [loading, setLoading] = useState(false);

  const roles = [
    { value: 'admin', label: 'Admin' },
    { value: 'vendor', label: 'Vendor' },
  ];

  const handleChange = (field) => (event) => {
    setFormData((prev) => ({
      ...prev,
      [field]: event.currentTarget.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post('http://localhost:5000/api/auth/register', formData);
      toast.success('User registered successfully ✅');
      setTimeout(() => navigate('/login'), 1000);
    } catch (err) {
      const errorMsg = err?.response?.data?.error || 'Registration failed.';
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">
      <Paper shadow="md" radius="md" p="xl" className="w-full max-w-md">
        <Title align="center" order={2} className="mb-6 text-blue-600">
          Create Account
        </Title>

        <form onSubmit={handleSubmit} className="space-y-4">
          <TextInput label="Name" placeholder="John Doe" required value={formData.name} onChange={handleChange('name')} />
          <TextInput label="Email" placeholder="example@email.com" required value={formData.email} onChange={handleChange('email')} />
          <PasswordInput label="Password" placeholder="••••••••" required value={formData.password} onChange={handleChange('password')} />
          <Select label="Role" placeholder="Select role" data={roles} required value={formData.role} onChange={(value) => setFormData((prev) => ({ ...prev, role: value }))} />
          <Button type="submit" fullWidth loading={loading} color="blue" radius="md">
            {loading ? 'Registering...' : 'Sign Up'}
          </Button>
        </form>
      </Paper>
    </div>
  );
};

export default SignupPage;
