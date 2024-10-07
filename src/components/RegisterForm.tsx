'use client';

import {useTranslations} from 'next-intl';
import {useState} from 'react';
import styled from 'styled-components';
import InputField from '../ui/InputField';
import { IUserRegister } from '@/types/user';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 300px;
  margin: 0 auto;
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

interface RegisterFormProps {
  onSubmit: (
    name: string,
    email: string,
    password: string,
    username: string,
    phone: string
  ) => Promise<IUserRegister>;
}

const RegisterForm: React.FC<RegisterFormProps> = ({onSubmit}) => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [error, setError] = useState<string>();
  const t = useTranslations('Register');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(undefined);

    if (!name || !email || !password || !username || !phone) {
      setError('Todos los campos son obligatorios.');
      return;
    }

    await onSubmit(name, email, password, username, phone);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <InputField
        label={t('name')}
        name="name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <InputField
        label={t('username')}
        name="username"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <InputField
        label={t('email')}
        name="email"
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <InputField
        label={t('password')}
        name="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <InputField
        label={t('phone')}
        name="phone"
        type="text"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <SubmitButton type="submit">{t('submit')}</SubmitButton>
    </Form>
  );
};

export default RegisterForm;
