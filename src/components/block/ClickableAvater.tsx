import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar';

interface ClickableAvatarProps {
  src?: string;
  fallback: string;
  className?: string;
  onClick?: () => void;
}

export function ClickableAvatar({ src, fallback, className, onClick }: ClickableAvatarProps) {
  return (
    <Avatar
      className={`${className} ${onClick ? 'cursor-pointer hover:opacity-80 transition-opacity' : ''}`}
      onClick={onClick}>
      <AvatarImage src={src} />
      <AvatarFallback>{fallback}</AvatarFallback>
    </Avatar>
  );
}
