import { SignupForm } from '../components/SignUpForm';
import { Link } from 'react-router-dom';

export default function Signup() {
  return (
    <>
      <div className="container relative hidden h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:px-0">
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Create an account
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your email below to create your account
              </p>
            </div>
            <SignupForm />
            <div className="relative">
              <div className="relative flex justify-center text-md">
                <span className="bg-background px-2 text-muted-foreground">
                  If you have an account? Now
                  <Link
                    to="/login"
                    className="underline underline-offset-4 hover:text-primary"
                  > Login
                  </Link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
