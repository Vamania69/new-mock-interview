// Assuming you're using useRouter to get query params
import { SignIn } from '@clerk/nextjs';

const SignInPage = () => {


  return (
    <div>
      <SignIn fallbackRedirectUrl="/dashboard" />
    </div>
  );
};

export default SignInPage;
