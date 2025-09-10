import { useKeyStore } from "@/store/KeyStore";

const Footer = () => {
  const keyInstructions = useKeyStore((state) => state.keyInstructions);
  return (
    <div className="w-full h-20 absolute bottom-0 flex flex-row justify-start items-center mb-5">
      <p className="text-mana text-lg font-bold">{keyInstructions}</p>
    </div>
  );
};

export default Footer;
