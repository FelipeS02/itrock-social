import LoginCover from '@rock/components/features/login/components/login-cover';
import LoginSection from '@rock/components/features/login/components/login-section';
import LoginWrapper from '@rock/components/features/login/components/login-wrapper';

export default function LoginPage() {
  return (
    <LoginWrapper>
      <LoginCover />
      <LoginSection />
    </LoginWrapper>
  );
}
