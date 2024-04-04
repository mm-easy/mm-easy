interface FormButtonProps {
  onClick: () => void;
  text: string;
  width?: string;
}

export const CancelButton: React.FC<FormButtonProps> = ({ onClick, text, width }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-md text-pointColor1 border-solid p-2 border border-pointColor1 bg-white ${width}`}
    >
      {text}
    </button>
  );
};

export const SubmitButton: React.FC<FormButtonProps> = ({ onClick, text, width }) => {
  return (
    <button
      type="submit"
      onClick={onClick}
      className={`rounded-md text-white border-solid p-2 border border-pointColor1 bg-pointColor1 ${width}`}
    >
      {text}
    </button>
  );
};
