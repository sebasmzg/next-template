'use client';
import { useRouter } from 'next/navigation';
import RegisterForm from '@/components/RegisterForm';
import PageLayout from '@/components/PageLayout';
import { useTranslations} from 'next-intl';


const RegisterPage: React.FC = () => {
  const router = useRouter();
  const t = useTranslations('Register');

  const handleRegistration = async (name: string, email: string, password: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error en el registro.');
      }

      router.push('/login');
    } catch (error) {
      console.error('Error al registrar el usuario:', error);
    }
  };

  return (
   <PageLayout title={t('title')}>
        <RegisterForm onSubmit={handleRegistration} />
   </PageLayout>
  );
};

export default RegisterPage;
