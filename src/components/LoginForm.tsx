'use client';

import { useState, FormEvent } from 'react';
import { signIn } from 'next-auth/react';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import InputField from '../ui/InputField';
import styled from 'styled-components';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 300px;
`;

const ErrorMessage = styled.p`
  color: red;
`;

const SubmitButton = styled.button`
  padding: 10px;
  background-color: #0070f3;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #005bb5;
  }
`;

const LoginForm: React.FC = () => {
  const locale = useLocale();
  const t = useTranslations('Login');
  const [error, setError] = useState<string>();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const router = useRouter();

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (error) setError(undefined);

    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      setError(result.error);
    } else {
      router.push('/' + locale);
    }
  }

  return (
    <Form onSubmit={onSubmit}>
      <InputField
        label={t('username')}
        name="email"
        type="text"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <InputField
        label={t('password')}
        name="password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      {error && <ErrorMessage>{t('error', { error })}</ErrorMessage>}
      <SubmitButton type="submit">{t('submit')}</SubmitButton>
    </Form>
  );
};

export default LoginForm;