const Banner = () => {
  return (
    <main className="w-full border-solid border-b-2 border-pointColor1 sm:hidden">
      <video autoPlay muted loop playsInline>
        <source
          src="https://icnlbuaakhminucvvzcj.supabase.co/storage/v1/object/public/assets/banner_v3.mp4"
          type="video/mp4"
        />
      </video>
    </main>
  );
};

export default Banner;
