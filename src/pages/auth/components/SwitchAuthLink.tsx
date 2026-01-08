import { Link } from 'react-router-dom';

type Props = {
  to: string;
  textBefore: string;
  linkText: string;
};

export default function SwitchAuthLink({ to, textBefore, linkText }: Props) {
  return (
    <p className="text-center text-sm text-gray-600">
      {textBefore}{' '}
      <Link to={to} className="text-orange-600 hover:text-orange-700 font-medium">
        {linkText}
      </Link>
    </p>
  );
}
