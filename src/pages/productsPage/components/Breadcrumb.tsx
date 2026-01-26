interface BreadcrumbProps {
  productName: string;
}

export const Breadcrumb = ({ productName }: BreadcrumbProps) => {
  return (
    <nav className="flex text-sm text-gray-500 mb-6">
      <span className="hover:text-gray-900 cursor-pointer">Início</span>
      <span className="mx-2">/</span>
      <span className="hover:text-gray-900 cursor-pointer">Calçados</span>
      <span className="mx-2">/</span>
      <span className="text-gray-900 font-medium">{productName}</span>
    </nav>
  );
};
