'use client';

import { useState } from 'react';
import styled from 'styled-components';
import InputField from '../ui/InputField';
import { useTranslations } from 'next-intl';

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
  onSubmit: (username: string, email: string, password: string) => Promise<void>;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmit }) => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>();
  const t = useTranslations('Register');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(undefined);

    if (!name || !email || !password) {
      setError('Todos los campos son obligatorios.');
      return;
    }

    await onSubmit(name, email, password);

  };

  return (
    <Form onSubmit={handleSubmit}>
      <InputField
        label={t("name")}
        name="name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <InputField
        label={t("email")}
        name="email"
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <InputField
        label={t("password")}
        name="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <SubmitButton type="submit">{t("submit")}</SubmitButton>
    </Form>
  );
};

export default RegisterForm;
