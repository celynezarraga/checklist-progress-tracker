import { Textarea } from "@chakra-ui/react";

interface TextAreaFieldProps {
  value: string;
  updateValue: (val: string) => void;
  placeholder?: string;
  isInvalid?: boolean
}

const TextAreaField = ({
  value,
  updateValue,
  placeholder,
  isInvalid = false,
}: TextAreaFieldProps) => {
  return (
    <Textarea
      placeholder={placeholder}
      onChange={(e) => updateValue(e.target.value)}
      onBlur={(e) => updateValue(e.target.value.trim())}
      value={value}
      isInvalid={isInvalid}
    />
  );
};

export default TextAreaField;