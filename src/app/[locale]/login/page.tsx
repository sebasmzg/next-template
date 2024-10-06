import { useTranslations} from 'next-intl';
import PageLayout from '@/components/PageLayout';
import LoginForm from '@/components/LoginForm';

export default function Login() {
  const t = useTranslations('Login');

  return (
    <PageLayout title={t('title')}>
      <LoginForm />
    </PageLayout>
  );
}
