import { Link } from 'react-router';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar';

interface ClickableAvatarProps {
  src?: string;
  fallback: string;
  className?: string;
  onClick?: () => void;
  route: string;
}

export function ClickableAvatar({
  src,
  fallback,
  className,
  onClick,
  route,
}: ClickableAvatarProps) {
  return (
    <Link to={route}>
      <Avatar
        className={`${className} ${onClick ? 'cursor-pointer hover:opacity-80 transition-opacity' : ''}`}
        onClick={onClick}>
        <AvatarImage src={src} />
        <AvatarFallback>{fallback}</AvatarFallback>
      </Avatar>
    </Link>
  );
}
