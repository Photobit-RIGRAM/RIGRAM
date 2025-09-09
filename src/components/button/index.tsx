import Link from 'next/link';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
}

export default function Button({ children, onClick, href, className }: ButtonProps) {
  if (href) {
    return (
      <Link href={href} className={`flex justify-center items-center w-full ${className}`}>
        {children}
      </Link>
    );
  }

  return (
    <button className={`flex justify-center items-center w-full ${className}`} onClick={onClick}>
      {children}
    </button>
  );
}
