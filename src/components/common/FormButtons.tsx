interface FormButtonProps {
  onClick?: () => void;
  text: string;
  py?: string;
  width?: string;
  height?: string;
  border?: string;
}
// flex justify-center items-center 퀴즈풀기 때문에 추가했으니 문제 있는지 확인해보기..
export const CancelButton: React.FC<FormButtonProps> = ({ onClick, text, width, height, border }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex justify-center items-center sm:border-0 rounded-md text-pointColor1 border-solid p-2 border border-pointColor1 bg-white ${width} ${height} ${border}`}
    >
      {text}
    </button>
  );
};

export const SubmitButton: React.FC<FormButtonProps> = ({ onClick, text, width, height, border }) => {
  return (
    <button
      type="submit"
      onClick={onClick}
      className={`sm:border-1 rounded-md text-white border-solid p-2 border border-pointColor1 bg-pointColor1 ${width} ${height} ${border}`}
    >
      {text}
    </button>
  );
};

export const BlueButton: React.FC<FormButtonProps> = ({ onClick, text, width, height }) => {
  return (
    <button
      type="submit"
      onClick={onClick}
      className={`rounded-md text-white border-solid p-2 border border-white bg-pointColor1 ${width} ${height}`}
    >
      {text}
    </button>
  );
};

export const WhiteButton: React.FC<FormButtonProps> = ({ onClick, text, py, width }) => {
  return (
    <button
      type="submit"
      onClick={onClick}
      className={`rounded-md text-pointColor1 border-solid px-2 ${py} border border-pointColor1 bg-white ${width}`}
    >
      {text}
    </button>
  );
};
