import ifLogo from '../assets/if-logo.svg';

export function LoginFooter() {
  return (
    <div className="absolute bottom-6 w-full flex justify-between items-center text-[10px] sm:text-[11px] text-slate-400 font-medium px-6 md:px-12">
      <p className="italic">Desenvolvido para o Instituto Federal Baiano — Campus Itapetinga</p>
      <img
        src={ifLogo}
        alt="Logo Instituto Federal Baiano"
        className="h-5 sm:h-6 object-contain ml-2 opacity-90"
      />
    </div>
  );
}