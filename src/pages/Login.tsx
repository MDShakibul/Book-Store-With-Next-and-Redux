import { Link } from 'react-router-dom';
import { LoginForm } from '@/components/LoginForm';

export default function Login() {

  
  return (
    <>
      <div className="container relative hidden h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:px-0">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Login to your account
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your email below
            </p>
          </div>
          <LoginForm />
          <div className="relative">
            <div className="relative flex justify-center text-md">
              <span className="bg-background px-2 text-muted-foreground">
                If you have no account? Now{' '}
                <Link
                  to="/signup"
                  className="underline underline-offset-4 hover:text-primary"
                >
                  {' '}
                  Signup
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
