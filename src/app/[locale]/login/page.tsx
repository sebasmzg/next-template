import { useTranslations} from 'next-intl';
import LoginForm from '@/components/LoginForm';
import PageLayout from '@/components/PageLayout';

export default function Login() {
  const t = useTranslations('Login');

  return (
    <PageLayout title={t('title')}>
      <LoginForm />
    </PageLayout>
  );
}
