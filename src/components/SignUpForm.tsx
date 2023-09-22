'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCreateUserMutation } from '@/redux/api/apiSlice';
import { useAppDispatch, } from '@/redux/hook';
import { registration } from '@/redux/features/auth/authSlice';
import { useToast } from './ui/use-toast';
import { useNavigate } from 'react-router-dom';

type UserAuthFormProps = React.HTMLAttributes<HTMLDivElement>;

export function SignupForm({ className, ...props }: UserAuthFormProps) {
  /* const [isLoading, setIsLoading] = React.useState<boolean>(false); */
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const { toast } = useToast();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [signup, { isLoading, isError, isSuccess }] = useCreateUserMutation();
  console.log(isError, isSuccess);

  const handleSubmit = async  (event: React.FormEvent) => {
    event.preventDefault();

    const options = {
      data: { email, password },
    };

    const response = await signup(options);
    
    if ('data' in response) {
      dispatch(registration({token: response.data.data.accessToken as string}));
      // Store the token in localStorage
      localStorage.setItem('token', response.data.data.accessToken as string);
      navigate('/');
      
    } else if ('error' in response) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'User Email Already Exist.',
      });
    }
    

  };

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <form onSubmit={handleSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
            />
            <Input
              id="password"
              name="password"
              placeholder="your password"
              type="password"
              autoCapitalize="none"
              autoCorrect="off"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
            />
          </div>
          <Button disabled={isLoading}>
            {isLoading && <p>loading</p>}
            Create Account
          </Button>
        </div>
      </form>
    </div>
  );
}
