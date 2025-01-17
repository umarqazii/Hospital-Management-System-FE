import React, { useState } from 'react';
import axios from "axios";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "src/components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import { toast } from "sonner";
//import { set } from 'date-fns';
import { useNavigate } from 'react-router-dom';
const hopitalImg = require('./hospital.png'); 

interface LoginProps {
  setToken: (token: string) => void;
}

const Login: React.FC <LoginProps> = ({ setToken }) =>{
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const response = await axios.post("http://localhost:8080/auth/login", {
        email,
        pass: password,
      });

      console.log(response);
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
      toast.success("Login successful");
      //console.log(response.data.token);
      
      
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="w-1/2 bg-gray-300 flex items-center align-center justify-center">
        <img src={hopitalImg} alt="hospital" className="object-cover ml-3" />
      </div>
      <div className="w-1/2 flex justify-center items-center bg-gray-300">
        <Card className="w-[400px] h-[500px]">
          <CardHeader>
            <CardTitle className="text-center">
              Login to Hospital Management
            </CardTitle>
            {/* <CardDescription>Enter your credentials to continue</CardDescription> */}
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="grid w-full gap-4">
              <div className="grid gap-2 items-start space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2 items-start space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded mt-4"
              >
                Login
              </Button>
              {/* horizontal line */}
              <hr className="my-4" />
              <Button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded"
              >
                Register
              </Button>
              <button>
                <a href="/forgot-password">Forgot Password</a>
              </button>
            </form>
            
          </CardContent>
          
          <CardFooter>
            {error && <p className="error-message text-red-500">{error}</p>}
            {success && (
              <p className="success-message text-green-500">{success}</p>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Login;
