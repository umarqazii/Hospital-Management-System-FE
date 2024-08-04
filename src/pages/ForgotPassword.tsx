import { useState } from 'react';
import axios from 'axios';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "src/components/ui/card";
import { Input } from "src/components/ui/input";
import { Label } from "src/components/ui/label";
import { Button } from "src/components/ui/button";
import { useToast } from "src/components/ui/use-toast";

const ForgotPassword: React.FC = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const response = await axios.post('http://localhost:8080/auth/reset-password', {
        email,
      });

      if (response.status === 200) {
        setSuccess('Email and new password were sent to your email.');
        toast({
          title: 'Email Sent!',
          description: 'Check your email.',
        });
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error('Axios error:', err);
        const errorMessage = err.response?.data?.error || 'An unexpected error occurred';
        setError(errorMessage);
      } else {
        console.error('Unexpected error:', err);
        setError('An unexpected error occurred');
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle className="text-center">Reset Password</CardTitle>
          <br />
          <CardDescription>Enter your email to reset your password</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid w-full gap-4">
            <div className="grid gap-2 items-start space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
              Reset Password
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          {error && <p className="error-message text-red-500">{error}</p>}
          {success && <p className="success-message text-green-500">{success}</p>}
          {!success && (
            <div className="flex items-center text-center mt-4 cursor-pointer">
              {/* Placeholder for future link or content */}
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}

export default ForgotPassword;
