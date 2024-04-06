import { FormEvent } from 'react';

/** text input maxLength 제한 핸들러 */
export const handleMaxLength = (e: FormEvent<HTMLInputElement>, maxLength: number) => {
  const inputElement = e.target as HTMLInputElement;
  const { value } = inputElement;
  if (value.length > maxLength) {
    inputElement.value = value.substr(0, maxLength);
  }
};
