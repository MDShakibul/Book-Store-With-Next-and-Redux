/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from './ui/use-toast';
import { useAppDispatch } from '@/redux/hook';
import { useNavigate } from 'react-router-dom';
import { useSignInMutation } from '@/redux/api/apiSlice';
import { login } from '@/redux/features/auth/authSlice';

type UserAuthFormProps = React.HTMLAttributes<HTMLDivElement>;

export function LoginForm({ className, ...props }: UserAuthFormProps) {

/*   async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  } */

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const { toast } = useToast();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [signin, { isLoading, isError, isSuccess }] = useSignInMutation();
  console.log(isError, isSuccess);

  const handleSubmit = async  (event: React.FormEvent) => {
    event.preventDefault();

    const values = {
      data: { email, password },
    };

    const response = await signin(values);
    
    if ('data' in response) {
      dispatch(login({token: response.data.data.accessToken as string}));
      // Store the token in localStorage
      localStorage.setItem('token', response.data.data.accessToken as string);
      navigate('/');
      
    } else if ('error' in response) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: "Password doesn't match",
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
              placeholder="your password"
              type="password"
              autoCapitalize="none"
              autoComplete="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
            />
          </div>
          <Button disabled={isLoading}>
            {isLoading && <p>loading</p>}
            Login with Email
          </Button>
        </div>
      </form>
    </div>
  );
}
