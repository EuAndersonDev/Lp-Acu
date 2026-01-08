type Props = {
  label: string;
};

export default function SubmitButton({ label }: Props) {
  return (
    <button
      type="submit"
      className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg px-4 py-2 transition"
    >
      {label}
    </button>
  );
}
