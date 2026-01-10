type Props = {
  label: string;
  isLoading?: boolean;
  countdown?: number;
};

export default function SubmitButton({ label, isLoading = false, countdown = 0 }: Props) {
  const isDisabled = isLoading || countdown > 0;
  
  return (
    <button
      type="submit"
      disabled={isDisabled}
      className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg px-4 py-2 transition disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {countdown > 0 ? `Aguarde ${countdown}s` : label}
    </button>
  );
}
