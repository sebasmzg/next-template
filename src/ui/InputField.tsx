// components/InputField.tsx

import styled from 'styled-components';

const Label = styled.label`
  display: flex;
`;

const Span = styled.span`
  display: inline-block;
  flex-grow: 1;
  min-width: 100px;
`;

const Input = styled.input`
  flex-grow: 1;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-left: 10px;
`;

interface InputFieldProps {
  label: string;
  name: string;
  type: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

const InputField: React.FC<InputFieldProps> = ({ label, name, type, onChange, value }) => {
  return (
    <Label>
      <Span>{label}</Span>
      <Input name={name} type={type} value={value} onChange={onChange} />
    </Label>
  );
};

export default InputField;
