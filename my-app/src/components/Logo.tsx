export default function Logo() {
  return (
    <div className="flex flex-start">
      <img
        src="/logo.png"
        alt="logo"
        className="object-contain w-[100px] h-[100px] md:w-[60px] md:h-[60px]"
      />
    </div>
  );
}