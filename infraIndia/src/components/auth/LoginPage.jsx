import { useState } from "react";
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
  Select,
  Loader,
} from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const LoginPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false); // Spinner state

  const handleEmailLogin = async () => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
        role,
      });

      const { token, user } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      toast.success("Logged in successfully!");
      setTimeout(() => {
        switch (user.role) {
          case "admin":
            navigate("/admin-dashboard");
            break;
          case "projectmanager":
            navigate("/project-manager-dashboard");
            break;
          case "sitesupervisor":
            navigate("/site-supervisor-dashboard");
            break;
          case "vendor":
            navigate("/vendor-dashboard");
            break;
          case "hr":
            navigate("/hr-dashboard");
            break;
          case "client":
          default:
            navigate("/client-dashboard");
            break;
        }
        
      }, 1500);
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleOAuthLogin = (provider) => {
    console.log("Login with:", provider);
  };

  return (
    <Container size={420} my={40}>
      <Toaster position="top-center" reverseOrder={false} />
      
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

<Select
  label="Role"
  placeholder="Select your role"
  data={[
    { value: "admin", label: "Admin" },
    { value: "client", label: "Client" },
    { value: "vendor", label: "Vendor" },
    { value: "hr", label: "HR" },
    { value: "sitesupervisor", label: "Site Supervisor" },
    { value: "projectmanager", label: "Project Manager" },
  ]}
  required
  mt="md"
  value={role}
  onChange={setRole}
/>

        <Text size="sm" align="right" mt="xs">
          <Link to="/forgot-password" className="text-blue-500">
            Forgot Password?
          </Link>
        </Text>

        <Button
          fullWidth
          mt="xl"
          onClick={handleEmailLogin}
          disabled={loading}
          leftIcon={loading ? <Loader size="xs" color="white" /> : null}
        >
          {loading ? "Logging in..." : "Login"}
        </Button>

        <Divider label="or continue with" labelPosition="center" my="lg" />

        <Group grow>
          <Button variant="outline" onClick={() => handleOAuthLogin("Google")}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 48 48"
            >
              <path
                fill="#4285F4"
                d="M23.5 12c2.46 0 4.66.88 6.42 2.33l4.72-4.72C31.82 6.44 27.98 5 23.5 5 14.5 5 7.14 10.96 5 19h6.96c1.63-4.06 5.67-7 11.54-7z"
              />
              <path
                fill="#34A853"
                d="M5 19c-1.33 3.79-1.33 7.96 0 11.75L11.96 24H5z"
              />
              <path
                fill="#FBBC05"
                d="M23.5 43c4.48 0 8.32-1.44 11.14-3.92l-5.28-4.28c-1.51 1.01-3.44 1.7-5.86 1.7-5.87 0-10.38-4.06-11.54-9H5c2.14 8.04 9.5 14 18.5 14z"
              />
              <path
                fill="#EA4335"
                d="M43 24c0-1.14-.11-2.25-.29-3.33H23.5v6.33h11.14c-.53 2.68-1.95 4.87-3.86 6.33l5.28 4.28C39.54 34.04 43 29.68 43 24z"
              />
            </svg>
          </Button>
        </Group>

        <Text size="sm" align="center" mt="md">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-blue-500">
            Create one
          </Link>
        </Text>
      </Paper>
    </Container>
  );
};

export default LoginPage;
