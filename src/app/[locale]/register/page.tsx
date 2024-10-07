'use client';
import {useRouter} from 'next/navigation';
import {useTranslations} from 'next-intl';
import PageLayout from '@/components/PageLayout';
import RegisterForm from '@/components/RegisterForm';

const RegisterPage: React.FC = () => {
  const router = useRouter();
  const t = useTranslations('Register');

  const handleRegistration = async (
    name: string,
    email: string,
    password: string,
    username: string,
    phone: string,
  ) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/signup`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({name, email, password, username, phone})
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error en el registro.');
      }

      const data = await response.json();
      console.log('Usuario registrado:', data);
      router.push('/login');
      return data;
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
