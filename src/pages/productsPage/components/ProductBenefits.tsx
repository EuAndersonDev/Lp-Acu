export const ProductBenefits = () => {
  return (
    <div className="mt-8 pt-8 border-t border-gray-200 grid grid-cols-2 gap-4">
      <div className="flex items-center gap-2 text-gray-600 text-sm">
        <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
        </svg>
        <span>Entrega rápida</span>
      </div>
      <div className="flex items-center gap-2 text-gray-600 text-sm">
        <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>Garantia de 30 dias</span>
      </div>
    </div>
  );
};
