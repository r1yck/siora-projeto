import ifLogo from '../assets/if-logo.svg';

export function LoginFooter() {
  return (
    <div className="w-full flex flex-col sm:flex-row justify-between items-center gap-2 text-[10px] sm:text-[11px] text-slate-400 font-medium px-4 md:px-12 mt-8 md:mt-0 md:absolute md:bottom-6 left-0">
      <p className="italic text-center sm:text-left">
        Desenvolvido para o Instituto Federal Baiano — Campus Itapetinga
      </p>
      <img
        src={ifLogo}
        alt="Logo Instituto Federal Baiano"
        className="h-5 sm:h-6 object-contain opacity-90"
      />
    </div>
  );
}