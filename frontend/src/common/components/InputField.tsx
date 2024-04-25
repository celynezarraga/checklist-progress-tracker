import { Input } from "@chakra-ui/react";

interface InputFieldProps {
  value: string;
  updateValue: (val: string) => void;
  placeholder?: string;
  type?: string;
  isInvalid?: boolean
}

const InputField = ({
  value,
  updateValue,
  type = "text",
  placeholder,
  isInvalid = false,
}: InputFieldProps) => {
  return (
    <Input
      type={type}
      placeholder={placeholder}
      onChange={(e) => updateValue(e.target.value)}
      onBlur={(e) => updateValue(e.target.value.trim())}
      value={value}
      isInvalid={isInvalid}
    />
  );
};

export default InputField;