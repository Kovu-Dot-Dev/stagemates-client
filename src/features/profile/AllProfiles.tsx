import { Music, UserPlus } from 'lucide-react';
import { Search } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router';

import { useProfilesQuery } from '@/api/profiles/hooks/useProfilesQuery';
import { ClickableAvatar } from '@/components/block/ClickableAvater';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';

export const AllProfiles: React.FC = () => {
  const { data: profiles, isLoading } = useProfilesQuery();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterGenre, setFilterGenre] = useState<string>('');

  if (isLoading) {
    return null;
  }

  if (!profiles || !profiles.length) {
    return 'No profiles found';
  }
  const instrumentWithIcon = (instrument: string) => {
    // Simple emoji mapping for common instruments
    const emojiMap: Record<string, string> = {
      guitar: '🎸',
      bass: '🎸',
      drums: '🥁',
      piano: '🎹',
      keyboard: '🎹',
      saxophone: '🎷',
      trumpet: '🎺',
      violin: '🎻',
      cello: '🎻',
      flute: '🎶',
      vocals: '🎤',
      singer: '🎤',
      voice: '🎤',
      synth: '🎹',
      percussion: '🥁',
      clarinet: '🎶',
      trombone: '🎺',
      ukulele: '🎸',
      banjo: '🪕',
      harp: '🎵',
      accordion: '🪗',
    };
    // Try to match instrument name to emoji
    const key = instrument.toLowerCase();
    const emoji =
      Object.keys(emojiMap).find((k) => key.includes(k)) &&
      emojiMap[Object.keys(emojiMap).find((k) => key.includes(k)) as string];
    return `${emoji ? emoji + ' ' : ''}${instrument}`;
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header and Filters */}
      <div className="space-y-4">
        <div>
          <h1 className="text-2xl mb-2">Discover</h1>
          <p className="text-muted-foreground">
            Find musicians, jam sessions, bands, and musical content
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search musicians, jams, bands..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="All" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="musician">Musicians</SelectItem>
                <SelectItem value="jam">Jams</SelectItem>
                <SelectItem value="band">Bands</SelectItem>
                <SelectItem value="post">Posts</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterGenre} onValueChange={setFilterGenre}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="All Genres" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Genres</SelectItem>
                <SelectItem value="Jazz">Jazz</SelectItem>
                <SelectItem value="Rock">Rock</SelectItem>
                <SelectItem value="Indie">Indie</SelectItem>
                <SelectItem value="Folk">Folk</SelectItem>
                <SelectItem value="Electronic">Electronic</SelectItem>
                <SelectItem value="Classical">Classical</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      <div className="space-y-4">
        {profiles.map((profile) => (
          <Card key={profile.id} className="hover:shadow-md transition-shadow">
            <Link to={`/profiles/${profile.id}`} key={profile.id} className="no-underline">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <ClickableAvatar
                    route={`/profiles/${profile.id}`}
                    src={profile.image}
                    fallback={profile.name.charAt(0)}
                    className="w-16 h-16"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <button className="text-left hover:text-primary transition-colors">
                          <h3 className="font-medium">{profile.name}</h3>
                        </button>
                        <p className="text-sm text-muted-foreground mb-2">{profile.location}</p>
                        <p className="text-sm mb-3 line-clamp-2">{profile.bio}</p>

                        <div className="flex flex-wrap gap-2 mb-3">
                          {profile?.instruments?.slice(0, 3).map((instrument) => (
                            <Badge key={instrument} variant="secondary" className="text-xs">
                              {instrumentWithIcon(instrument)}
                            </Badge>
                          ))}
                          {profile.instruments.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{profile.instruments.length - 3}
                            </Badge>
                          )}
                        </div>

                        <div className="flex flex-wrap gap-1 mb-3">
                          {profile?.genres?.slice(0, 4).map((genre) => (
                            <Badge key={genre} variant="outline" className="text-xs">
                              {genre}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex flex-col items-end space-y-2">
                        {/* <span className="text-xs text-muted-foreground">
                        {formatTimeAgo(profile.timestamp)}
                      </span> */}
                        <Badge variant="secondary" className="text-xs">
                          {profile.skillLevel}
                        </Badge>
                      </div>
                    </div>

                    <div className="flex justify-between items-center mt-4">
                      <div className="text-sm text-muted-foreground">
                        Looking for: {profile?.lookingFor?.slice(0, 2).join(', ')}
                        {profile.lookingFor.length > 2 && '...'}
                      </div>
                      <Button size="sm" onClick={() => {}}>
                        <UserPlus className="w-4 h-4 mr-2" />
                        Connect
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
};
