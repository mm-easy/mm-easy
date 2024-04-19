import Image from 'next/image';

const InputQuestionImg = ({
  id,
  img_url,
  onChange
}: {
  id: string | undefined;
  img_url: string;
  onChange: (id: string | undefined, files: FileList | null) => void;
}) => {
  return (
    <div className="w-full h-40 border-solid border border-pointColor1 rounded-md">
      <input
        type="file"
        id={`file-input-${id}`}
        onChange={(e) => {
          e.preventDefault();
          onChange(id, e.target.files);
        }}
        className="hidden"
      />
      <label htmlFor={`file-input-${id}`}>
        <Image
          src={img_url}
          alt="문항 이미지"
          className="w-full h-full object-cover rounded-md cursor-pointer"
          width={570}
          height={160}
        />
      </label>
    </div>
  );
};

export default InputQuestionImg;
