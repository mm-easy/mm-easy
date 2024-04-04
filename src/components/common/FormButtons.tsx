interface FormButtonProps {
  onClick: () => void;
  text: string;
}

export const CancelButton: React.FC<FormButtonProps> = ({ onClick, text }) => {
  return (
    <button type="button" onClick={onClick} className="rounded-md border-solid p-2 border border-pointColor1 w-52">
      {text}
    </button>
  );
};

export const SubmitButton: React.FC<FormButtonProps> = ({ onClick, text }) => {
  return (
    <button
      type="submit"
      onClick={onClick}
      className="rounded-md text-white border-solid p-2 border border-pointColor1 bg-pointColor1"
    >
      {text}
    </button>
  );
};
