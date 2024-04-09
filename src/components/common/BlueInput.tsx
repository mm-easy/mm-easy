import React from 'react';

interface BlueInputProps {
  value: string;
  width?: string;
  maxNum?: number;
  onInput?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface BlueTextareaProps {
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

interface BlueLevelSelectProps {
  value: number;
  onChange: (value: number) => void;
}

export const BlueInput: React.FC<BlueInputProps> = ({ value, width, maxNum, onInput, onChange }) => {
  return (
    <div className="w-full relative text-pointColor1">
      <input
        className={`border border-solid border-pointColor1 p-2 rounded-md ${width}`}
        type="text"
        value={value}
        onInput={onInput}
        onChange={onChange}
      />
      <p className="absolute top-0 right-2 pt-3 pr-1 text-sm">
        {value.length} / {maxNum}
      </p>
    </div>
  );
};

export const BlueTextArea: React.FC<BlueTextareaProps> = ({ value, onChange }) => {
  return (
    <div className="w-full relative text-pointColor1">
      <textarea
        className="border border-solid border-pointColor1 w-[570px] p-2 pr-20 h-24 rounded-md resize-none"
        value={value}
        onChange={onChange}
        maxLength={80}
      />
      <p className="absolute top-0 right-2 pt-3 pr-1 text-sm">{value.length} / 80</p>
    </div>
  );
};

export const BlueLevelSelect: React.FC<BlueLevelSelectProps> = ({ value, onChange }) => {
  const handleChange = (selectedValue: number) => {
    onChange(selectedValue);
  };
  return (
    <div className="flex gap-2 w-96">
      <input
        type="radio"
        id="Level1"
        name="Level"
        value={1}
        checked={value === 1}
        onChange={() => handleChange(1)}
        className="hidden"
      />
      <label
        htmlFor="Level1"
        className={`cursor-pointer w-32 text-center border-solid border border-pointColor1 rounded-md p-2 ${
          value === 1 ? 'bg-pointColor1 text-white' : 'bg-white text-pointColor1'
        }`}
      >
        꼬마급
      </label>
      <input
        type="radio"
        id="Level2"
        name="Level"
        value={2}
        checked={value === 2}
        onChange={() => handleChange(2)}
        className="hidden"
      />
      <label
        htmlFor="Level2"
        className={`cursor-pointer w-32 text-center border-solid border border-pointColor1 rounded-md p-2 ${
          value === 2 ? 'bg-pointColor1 text-white' : 'bg-white text-pointColor1'
        }`}
      >
        똑똑이급
      </label>
      <input
        type="radio"
        id="Level3"
        name="Level"
        value={3}
        checked={value === 3}
        onChange={() => handleChange(3)}
        className="hidden"
      />
      <label
        htmlFor="Level3"
        className={`cursor-pointer w-32 text-center border-solid border border-pointColor1 rounded-md p-2 ${
          value === 3 ? 'bg-pointColor1 text-white' : 'bg-white text-pointColor1'
        }`}
      >
        대장급
      </label>
    </div>
  );
};
