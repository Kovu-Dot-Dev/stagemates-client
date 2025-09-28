import {
  Calendar,
  ChevronRight,
  Filter,
  Heart,
  MapPin,
  MessageCircle,
  Music,
  Play,
  Search,
  Share2,
  UserPlus,
  Users,
} from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router';

import type { JamSession } from '@/api/jams/services/types';
import type { MusicianProfile } from '@/api/profiles/services/types';
import { ClickableAvatar } from '@/components/block/ClickableAvater';
import { Badge } from '@/components/ui/Badge';
import { Box } from '@/components/ui/Box';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';
import { Text } from '@/components/ui/Text';

import { createFeedItems } from './mock';
import type { FeedItem } from './mock';

interface DiscoveryFeedProps {
  currentUser?: MusicianProfile;
  onViewProfile?: (userId: string) => void;
  onViewJam?: (jam: JamSession) => void;
  onJoinJam?: (jam: JamSession) => void;
  onFollowBand?: (bandId: string) => void;
  onLikePost?: (postId: string) => void;
  onConnect?: (userId: string) => void;
}

export function DiscoveryFeed({
  currentUser,
  onViewProfile = () => {},
  onViewJam = () => {},
  onJoinJam = () => {},
  onFollowBand = () => {},
  onLikePost = () => {},
  onConnect = () => {},
}: DiscoveryFeedProps) {
  const [feedItems] = useState<FeedItem[]>(createFeedItems());
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterGenre, setFilterGenre] = useState<string>('');

  const filteredItems = feedItems.filter((item) => {
    // Search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      switch (item.type) {
        case 'musician':
          const musician = item.data as MusicianProfile;
          if (
            !musician.name.toLowerCase().includes(searchLower) &&
            !musician.bio.toLowerCase().includes(searchLower) &&
            !musician.instruments.some((inst) => inst.toLowerCase().includes(searchLower))
          ) {
            return false;
          }
          break;
        case 'jam':
          const jam = item.data as JamSession;
          if (
            !jam.title.toLowerCase().includes(searchLower) &&
            !jam.description.toLowerCase().includes(searchLower)
          ) {
            return false;
          }
          break;
      }
    }

    // Type filter
    if (filterType !== 'all' && item.type !== filterType) {
      return false;
    }

    // Genre filter
    if (filterGenre) {
      switch (item.type) {
        case 'musician': {
          const musician = item.data as MusicianProfile;
          if (!musician.genres.find((g) => g.includes(filterGenre))) return false;
          break;
        }
        case 'jam': {
          const jam = item.data as JamSession;
          if (!jam.genres.find((g) => g.includes(filterGenre))) return false;
          break;
        }
      }
    }

    return true;
  });

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInHours = Math.floor((now.getTime() - time.getTime()) / (1000 * 60 * 60));

    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

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

  const renderFeedItem = (item: FeedItem) => {
    switch (item.type) {
      case 'musician':
        const musician = item.data as MusicianProfile;
        return (
          <Link to={`/profiles/${musician.id}`} key={musician.id} className="no-underline">
            <Card
              key={item.id}
              className="hover:shadow-md transition-shadow pb-0 h-120 relative"
              style={{
                backgroundImage: `url(${musician.image || 'https://placehold.co/100x100'})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}>
              <CardHeader>
                {/* <Box className="border border-background rounded">
                  <img
                    src={musician.image || 'https://placehold.co/100x100'}
                    alt={musician.name}
                    className="rounded-md justify-self-center-safe"
                  />
                </Box> */}
                {/* <Box style={{ minHeight: 120, background: 'transparent' }} /> */}
              </CardHeader>
              <CardContent
                className="p-4 absolute bottom-0 w-full min-h-50 rounded-b-[inherit]"
                style={{
                  background:
                    'linear-gradient(to top, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.80) 90%)',
                }}>
                <div className="flex items-start space-x-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <button
                          onClick={() => onViewProfile(musician.id)}
                          className="text-left hover:text-primary transition-colors">
                          <h3 className="font-medium">{musician.name}</h3>
                        </button>
                        <p className="text-sm text-muted-foreground mb-2">{musician.location}</p>
                        {/* <p className="text-sm mb-3 line-clamp-2">{musician.bio}</p> */}

                        <div className="flex flex-wrap gap-2">
                          {musician?.instruments?.slice(0, 3).map((instrument) => (
                            <Badge
                              key={instrument}
                              variant="secondary"
                              className="text-xs bg-blue-100 text-blue-800 border-blue-300">
                              {instrumentWithIcon(instrument)}
                            </Badge>
                          ))}
                          {musician.instruments.length > 3 && (
                            <Badge
                              variant="outline"
                              className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                              +{musician.instruments.length - 3}
                            </Badge>
                          )}

                          {musician?.genres?.slice(0, 4).map((genre) => (
                            <Badge
                              key={genre}
                              variant="outline"
                              className="text-xs text-blue-800 border-blue-300">
                              {genre}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex flex-col items-end space-y-2">
                        {/* <span className="text-xs text-muted-foreground">
                        {formatTimeAgo(item.timestamp)}
                      </span> */}
                        <Badge
                          variant="secondary"
                          className="text-xs bg-muted-background border-accent-foreground">
                          {(() => {
                            const skillEmoji: Record<string, string> = {
                              Beginner: '♩',
                              Intermediate: '♪',
                              Advanced: '♫',
                              Expert: '♬',
                              Professional: '🎼',
                            };
                            return `${skillEmoji[musician.skillLevel] || '🤷🏻'} ${musician.skillLevel}`;
                          })()}
                        </Badge>
                      </div>
                    </div>

                    <div className="flex justify-between items-center mt-4">
                      <div className="text-sm text-muted-foreground">
                        Looking for: {musician?.lookingFor?.slice(0, 2).join(', ')}
                        {musician.lookingFor.length > 2 && '...'}
                      </div>
                      {/* <Button size="sm" onClick={() => onConnect(musician.id)}>
                        <UserPlus className="w-4 h-4 mr-2" />
                        Connect
                      </Button> */}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        );

      case 'jam':
        const jam = item.data as JamSession;
        return (
          <Link to={`/jams/${jam.id}`} key={item.id} className="no-underline">
            <Card
              className="hover:shadow-md transition-shadow pb-0 h-120 relative"
              style={{
                backgroundImage: `url(${jam?.image || 'https://placehold.co/300x300'})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}>
              <CardHeader>
                {/* <Box className="border border-background rounded">
                <img
                  src={jam?.image || 'https://placehold.co/300x300'}
                  alt={jam.title}
                  className="rounded-md border-background justify-self-center-safe object-cover"
                />
              </Box> */}
                <Box className="min-h-100 bg-transparent"></Box>
              </CardHeader>

              <CardContent
                className="p-4 absolute bottom-0 w-full min-h-50 rounded-b-[inherit]"
                style={{
                  background:
                    'linear-gradient(to top, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.80) 90%)',
                }}>
                <CardTitle className="flex items-center justify-between">
                  <span className="text-lg font-semibold">{jam.title}</span>
                  <Badge
                    variant="secondary"
                    className="text-xs bg-emerald-100 text-emerald-700 border-emerald-300">
                    {jam.skillLevel}
                  </Badge>
                </CardTitle>
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {new Date(jam.date).toLocaleDateString()} at {jam.time}
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {jam.location}
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {jam.genres.map((genre) => (
                      <Badge
                        key={genre}
                        variant="outline"
                        className="text-xs border-cyan-400 text-cyan-700 bg-cyan-50/80">
                        {genre}
                      </Badge>
                    ))}
                  </div>
                  {/* add instruments jam is looking for */}
                  <div className="flex items-center gap-1">
                    <span className="font-semibold text-xs text-blue-700 mr-1">Needs:</span>
                    {jam.neededInstruments.map((instrument) => (
                      <Badge
                        key={instrument}
                        variant="secondary"
                        className="text-xs border-blue-600 text-blue-900 bg-blue-100 font-semibold px-2 py-1 shadow-sm">
                        {instrumentWithIcon(instrument)}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="mt-2 flex justify-between items-center">
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    {jam.currentParticipants}/{jam.maxParticipants} participants
                  </div>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      onJoinJam(jam);
                    }}
                    disabled={jam.currentParticipants >= jam.maxParticipants}
                    size="sm">
                    {jam.currentParticipants >= jam.maxParticipants ? 'Full' : 'Join'}
                  </Button>
                </div>
                {/* <p className="text-sm text-muted-foreground">{jam.description}</p> */}

                {/* <div className="flex justify-between items-center">
                <div className="text-sm text-muted-foreground">
                  {jam.maxParticipants - jam.currentParticipants} spots left
                </div>
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    onJoinJam(jam);
                  }}
                  disabled={jam.currentParticipants >= jam.maxParticipants}
                  size="sm">
                  {jam.currentParticipants >= jam.maxParticipants ? 'Full' : 'Join'}
                </Button>
              </div> */}
              </CardContent>
            </Card>
          </Link>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
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

      {/* Feed */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredItems.length === 0 ? (
          <Card className="p-8 text-center">
            <Music className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="mb-2">No content found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search filters to find more content.
            </p>
          </Card>
        ) : (
          filteredItems.map(renderFeedItem)
        )}
      </div>
    </div>
  );
}
