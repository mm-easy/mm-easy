import React from 'react';

interface BlueInputProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface BlueTextareaProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

interface BlueLevelSelectProps {
  value: number;
  onChange: (value: number) => void;
}

export const BlueInput: React.FC<BlueInputProps> = ({ value, onChange }) => {
  return (
    <input className="border border-solid border-blue-500 w-96 p-2" type="text" value={value} onChange={onChange} />
  );
};

export const BlueTextArea: React.FC<BlueTextareaProps> = ({ value, onChange }) => {
  return <textarea className="border border-solid border-blue-500 w-96 p-2 h-28" value={value} onChange={onChange} />;
};

export const BlueLevelSelect: React.FC<BlueLevelSelectProps> = ({ value, onChange }) => {
  return (
    <select
      className="border border-solid border-blue-500 w-96 p-2"
      value={value}
      onChange={(e) => onChange(+e.target.value)}
    >
      <option value={0}>난이도를 선택하세요.</option>
      <option value={1}>꼬마급</option>
      <option value={2}>똑똑이급</option>
      <option value={3}>대장급</option>
    </select>
  );
};
