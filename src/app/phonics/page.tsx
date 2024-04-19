import PhonicsPlayer from "./PhonicsPlayer";

const PhonicsPage = () => {
  const sounds = Array.from({ length: 19 }, (_, i) => `/audio/consonant/${i + 1}.wav`);

  return (
    <div>
      {sounds.map((sound, index) => (
        <div key={index}>
          <PhonicsPlayer source={sound} />
        </div>
      ))}
    </div>
  );
}

export default PhonicsPage;


