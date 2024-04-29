type CloudinaryImageProps = {
  width: number;
  height: number;
}

export default function CloudinaryImage({ width, height }: CloudinaryImageProps) {
  
  return (
    <picture>
      <img src="https://res.cloudinary.com/doqfofexn/image/upload/v1714393075/%EB%A1%9C%EB%94%A9%EC%95%A0%EB%8B%88%EB%A9%94%EC%9D%B4%EC%85%98_sm_j46xtc.gif" alt="로딩이미지" />
    </picture>
  )
}