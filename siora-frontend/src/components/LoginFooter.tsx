import ifLogo from '../assets/if-logo.svg';

export function LoginFooter() {
  return (
    <div className="w-full flex justify-between items-center text-[10px] sm:text-[11px] text-slate-400 font-medium px-2 sm:px-6 md:px-12 mt-6 md:mt-0 md:absolute md:bottom-6 left-0">
      <p className="italic text-left leading-tight">
        Desenvolvido para o IF Baiano — Campus Itapetinga
      </p>
      <img
        src={ifLogo}
        alt="Logo Instituto Federal Baiano"
        className="h-5 sm:h-6 object-contain ml-2 opacity-90 flex-shrink-0"
      />
    </div>
  );
}