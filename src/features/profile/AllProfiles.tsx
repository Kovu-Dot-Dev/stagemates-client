import { Link } from 'react-router';

import { useAllProfilesQuery } from '@/api/profiles/hooks/useAllProfilesQuery';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Text } from '@/components/ui/Text';

import { SongListItem } from './components/SongListItem';
import { VibeCard } from './components/VibeCard';

export const AllProfiles: React.FC = () => {
  const { data: profiles, isLoading } = useAllProfilesQuery();

  if (isLoading) {
    return null;
  }

  if (!profiles || !profiles.length) {
    return 'No profiles found';
  }
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                {/* <Music className="w-5 h-5 text-primary-foreground" /> */}
              </div>
              <h1 className="text-xl">Jammy</h1>
            </div>
            {/* 
            <div className="flex items-center space-x-3">
              <ClickableAvatar
                src={currentUser.profileImage}
                fallback={currentUser.name.charAt(0)}
                className="w-8 h-8"
                onClick={handleViewOwnProfile}
              />
            </div> */}
          </div>
        </div>
      </header>
      {/* Main Content */}
      <main className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {profiles.map((profile) => (
            <Link to={`/profiles/${profile.id}`} key={profile.id} className="no-underline">
              <div className="border p-4 rounded">
                <Text size="h4">{profile.name}</Text>
                <img
                  src={profile.image || 'https://placehold.co/300x300'}
                  alt={profile.name}
                  className="rounded-md"
                />
                <div className="flex flex-col gap-2">
                  <Text size="h6">Genres</Text>
                  <div className="flex flex-wrap gap-2">
                    {profile.genres.map((genre) => (
                      <Badge key={genre}>{genre}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
};
