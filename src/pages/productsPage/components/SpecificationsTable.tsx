import { Specification } from './mockData';

interface SpecificationsTableProps {
  specs: Specification[];
}

export const SpecificationsTable = ({ specs }: SpecificationsTableProps) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
      <h3 className="text-lg font-semibold text-blue-900 mb-4">Especificações técnicas</h3>
      <dl className="divide-y divide-gray-100">
        {specs.map((item) => (
          <div key={item.label} className="py-3 grid grid-cols-3 gap-2 text-sm">
            <dt className="text-gray-500 col-span-1">{item.label}</dt>
            <dd className="text-gray-900 font-medium col-span-2">{item.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
};
