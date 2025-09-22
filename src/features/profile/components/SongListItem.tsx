import { Badge } from '@/components/ui/Badge';
import { Text } from '@/components/ui/Text';

interface SongListItemProps {
  title: string;
  artist: string;
  albumImage: string;
  wantToPlay?: boolean;
  enjoy?: boolean;
  skill: number;
}

export const SongListItem: React.FC<SongListItemProps> = ({
  title,
  artist,
  wantToPlay,
  enjoy,
  skill,
}) => {
  return (
    <div className="flex items-center">
      <div className="relative w-16 h-16 rounded overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=80&dpr=1&q=80"
          alt={title}
          className="object-cover w-full h-full"
        />
      </div>

      <div className="flex-1 p-3">
        <Text size="h6">{title}</Text>
        <Text size="extraSmall">{artist}</Text>

        <div className="flex gap-2 mt-1 p=">
          {wantToPlay && <Badge>Want to Play</Badge>}
          {enjoy && <Badge>Enjoy</Badge>}
        </div>
      </div>

      <div className="flex items-center gap-1 pr-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className={`w-3 h-3 ${i < skill ? 'bg-black' : 'bg-gray-300'}`} />
        ))}
      </div>
    </div>
  );
};
