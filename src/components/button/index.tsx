import Link from 'next/link';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
}

export default function Button({ children, onClick, href, className }: ButtonProps) {
  const PseudoSelectors =
    'hover:font-bold hover:outline hover:outline-primary-700 focus:font-bold focus:outline focus:outline-primary-700 focus-visible:font-bold focus-visible:outline focus-visible:outline-primary-700 active:font-bold active:outline active:outline-primary-700';

  if (href) {
    return (
      <Link href={href} className={`flex justify-center items-center ${className ?? ''}`}>
        {children}
      </Link>
    );
  }

  return (
    <button
      className={`flex justify-center items-center ${className ?? ''} ${PseudoSelectors}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
