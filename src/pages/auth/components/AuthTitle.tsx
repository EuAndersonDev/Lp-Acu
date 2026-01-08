type Props = {
  title: string;
  subtitle?: string;
};

export default function AuthTitle({ title, subtitle }: Props) {
  return (
    <div className="text-center">
      <h1 className="text-2xl font-bold text-blue-900">{title}</h1>
      {subtitle && <p className="text-sm text-gray-600">{subtitle}</p>}
    </div>
  );
}
