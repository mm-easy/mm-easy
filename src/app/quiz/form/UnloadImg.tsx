interface UnloadImgBtnProps {
  onClick: (e: React.MouseEvent<HTMLSpanElement>) => void;
}

const UnloadImgBtn: React.FC<UnloadImgBtnProps> = ({ onClick }) => {
  return (
    <span
      className="absolute z-1 top-1 right-1 w-6 h-6 flex justify-center items-center bg-black/[.40] text-white cursor-pointer rounded-full"
      onClick={onClick}
    >
      ×
    </span>
  );
};

export default UnloadImgBtn;
