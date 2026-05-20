export default function Logo() {
  return (
    <div className="flex flex-start">
      <img
        src="/logo.png"
        alt="logo"
        className="object-contain w-25 h-25 md:w-15 md:h-15"
      />
    </div>
  );
}