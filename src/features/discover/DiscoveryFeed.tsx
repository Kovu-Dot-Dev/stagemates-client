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

import type { JamSession } from '@/api/jams/services/types';
import type { MusicianProfile } from '@/api/profiles/services/types';
import { ClickableAvatar } from '@/components/block/ClickableAvater';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
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

import { createFeedItems } from './mock';
import type { Band, FeedItem, Post } from './mock';

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
        case 'band':
          const band = item.data as Band;
          if (
            !band.name.toLowerCase().includes(searchLower) &&
            !band.description.toLowerCase().includes(searchLower)
          ) {
            return false;
          }
          break;
        case 'post':
          const post = item.data as Post;
          if (!post.content.toLowerCase().includes(searchLower)) {
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
        case 'band': {
          const band = item.data as Band;
          if (!band.genre.find((g) => g.includes(filterGenre))) return false;
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

  const renderFeedItem = (item: FeedItem) => {
    switch (item.type) {
      case 'musician':
        const musician = item.data as MusicianProfile;
        return (
          <Card key={item.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <ClickableAvatar
                  route={`/profile/${musician.id}`}
                  src={musician.image}
                  fallback={musician.name.charAt(0)}
                  className="w-16 h-16"
                  onClick={() => onViewProfile(musician.id)}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <button
                        onClick={() => onViewProfile(musician.id)}
                        className="text-left hover:text-primary transition-colors">
                        <h3 className="font-medium">{musician.name}</h3>
                      </button>
                      <p className="text-sm text-muted-foreground mb-2">{musician.location}</p>
                      <p className="text-sm mb-3 line-clamp-2">{musician.bio}</p>

                      <div className="flex flex-wrap gap-2 mb-3">
                        {musician.instruments.slice(0, 3).map((instrument) => (
                          <Badge key={instrument} variant="secondary" className="text-xs">
                            {instrument}
                          </Badge>
                        ))}
                        {musician.instruments.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{musician.instruments.length - 3}
                          </Badge>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-1 mb-3">
                        {musician.genres.slice(0, 4).map((genre) => (
                          <Badge key={genre} variant="outline" className="text-xs">
                            {genre}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                      <span className="text-xs text-muted-foreground">
                        {formatTimeAgo(item.timestamp)}
                      </span>
                      <Badge variant="secondary" className="text-xs">
                        {musician.skillLevel}
                      </Badge>
                    </div>
                  </div>

                  <div className="flex justify-between items-center mt-4">
                    <div className="text-sm text-muted-foreground">
                      Looking for: {musician.lookingFor.slice(0, 2).join(', ')}
                      {musician.lookingFor.length > 2 && '...'}
                    </div>
                    <Button size="sm" onClick={() => onConnect(musician.id)}>
                      <UserPlus className="w-4 h-4 mr-2" />
                      Connect
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );

      case 'jam':
        const jam = item.data as JamSession;
        return (
          <Card
            key={item.id}
            className="hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => onViewJam(jam)}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{jam.title}</CardTitle>
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground mt-1">
                    <ClickableAvatar
                      route={`/profile/${jam.host.id}`}
                      src={jam.host.image}
                      fallback={jam.host.name.charAt(0)}
                      className="w-6 h-6 mr-2"
                    />
                    Hosted by{' '}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onViewProfile(jam.host.id);
                      }}
                      className="text-foreground hover:text-primary transition-colors underline ml-1">
                      {jam.host.name}
                    </button>
                  </div>
                </div>
                <div className="text-xs text-muted-foreground">{formatTimeAgo(item.timestamp)}</div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{jam.description}</p>

              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  {new Date(jam.date).toLocaleDateString()} at {jam.time}
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  {jam.location}
                </div>
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-1" />
                  {jam.currentParticipants}/{jam.maxParticipants} participants
                </div>
              </div>

              <div className="flex flex-wrap gap-1">
                {jam.genres.map((genre) => (
                  <Badge key={genre} variant="outline" className="text-xs">
                    {genre}
                  </Badge>
                ))}
                <Badge variant="secondary" className="text-xs">
                  {jam.skillLevel}
                </Badge>
              </div>

              <div className="flex justify-between items-center">
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
              </div>
            </CardContent>
          </Card>
        );

      case 'band':
        const band = item.data as Band;
        return (
          <Card key={item.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg flex items-center justify-center">
                  <Music className="w-8 h-8 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-medium">{band.name}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{band.location}</p>
                      <p className="text-sm mb-3 line-clamp-2">{band.description}</p>

                      <div className="flex flex-wrap gap-1 mb-3">
                        {band.genre.map((genre) => (
                          <Badge key={genre} variant="outline" className="text-xs">
                            {genre}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
                        <span>{band.members.length} members</span>
                        <span>{band.followers} followers</span>
                        <span>{band.upcomingShows} upcoming shows</span>
                      </div>

                      <div className="flex -space-x-2 mb-3">
                        {band.members.slice(0, 4).map((member, index) => (
                          <ClickableAvatar
                            route={`/profile/${member.id}`}
                            key={member.id}
                            src={member.image}
                            fallback={member.name.charAt(0)}
                            className="w-8 h-8 border-2 border-background"
                          />
                        ))}
                        {band.members.length > 4 && (
                          <div className="w-8 h-8 rounded-full bg-muted border-2 border-background flex items-center justify-center">
                            <span className="text-xs font-medium">+{band.members.length - 4}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                      <span className="text-xs text-muted-foreground">
                        {formatTimeAgo(item.timestamp)}
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center mt-4">
                    <div className="text-sm text-muted-foreground">
                      Looking for: {band.lookingFor.join(', ')}
                    </div>
                    <Button size="sm" variant="outline" onClick={() => onFollowBand(band.id)}>
                      <Heart className="w-4 h-4 mr-2" />
                      Follow
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );

      case 'post':
        const post = item.data as Post;
        return (
          <Card key={item.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <ClickableAvatar
                  route={`/profile/${post.author.id}`}
                  src={post.author.image}
                  fallback={post.author.name.charAt(0)}
                  className="w-12 h-12"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <button
                          onClick={() => onViewProfile(post.author.id)}
                          className="text-left hover:text-primary transition-colors font-medium">
                          {post.author.name}
                        </button>
                        <span className="text-sm text-muted-foreground">•</span>
                        <span className="text-sm text-muted-foreground">
                          {post.author.location}
                        </span>
                        <Badge variant="secondary" className="text-xs">
                          {post.type}
                        </Badge>
                      </div>

                      <p className="text-sm mb-3">{post.content}</p>

                      {post.media && (
                        <div className="bg-muted/50 rounded-lg p-3 mb-3">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                              <Play className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                              <p className="text-sm font-medium">{post.media.title}</p>
                              <p className="text-xs text-muted-foreground">{post.media.type}</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {post.tags && (
                        <div className="flex flex-wrap gap-1 mb-3">
                          {post.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              #{tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {formatTimeAgo(item.timestamp)}
                    </span>
                  </div>

                  <div className="flex items-center space-x-4 pt-3 border-t">
                    <Button variant="ghost" size="sm" onClick={() => onLikePost(post.id)}>
                      <Heart className="w-4 h-4 mr-2" />
                      {post.likes}
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      {post.comments}
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Share2 className="w-4 h-4 mr-2" />
                      Share
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
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

      {/* Feed */}
      <div className="space-y-4">
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
