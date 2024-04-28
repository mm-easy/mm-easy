type CloudinaryImageProps = {
  width: number;
  height: number;
}

export default function CloudinaryImage({ width, height }: CloudinaryImageProps) {
  
  return (
    <picture>
      <img src="https://res.cloudinary.com/doqfofexn/image/upload/v1714325766/loadingWebP_elmaaz.webp" alt="로딩이미지" />
    </picture>
  )
}