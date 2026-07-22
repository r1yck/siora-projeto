import iconSiora from '../assets/icon-siora.svg';

export function LoginSideBanner() {
  return (
    <div className="hidden md:flex flex-col items-center justify-center bg-siora-teal p-12 text-white text-center select-none">
      <div className="flex flex-col items-center max-w-sm">
        <img
          src={iconSiora}
          alt="Ícone SIORA"
          className="w-16 h-16 mb-6 object-contain"
        />
        <h1 className="text-6xl font-bold tracking-wider mb-4">SIORA</h1>
        <p className="text-lg font-light leading-relaxed text-teal-100/90">
          Sistema de Informação para Organização da Rotina Acadêmica
        </p>
      </div>
    </div>
  );
}