'use client';

import {useRouter} from 'next/navigation';
import {signIn} from 'next-auth/react';
import {useLocale, useTranslations} from 'next-intl';
import {useState, FormEvent} from 'react';
import styled from 'styled-components';
import InputField from '../ui/InputField';

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
      password
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
        onChange={(e) => setEmail(e.target.value)}
        type="text"
        value={email}
      />
      <InputField
        label={t('password')}
        name="password"
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        value={password}
      />
      {error && <ErrorMessage>{t('error', {error})}</ErrorMessage>}
      <SubmitButton type="submit">{t('submit')}</SubmitButton>
    </Form>
  );
};

export default LoginForm;
