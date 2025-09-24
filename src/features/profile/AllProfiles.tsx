import { Music } from 'lucide-react';
import { Link } from 'react-router';

import { useProfilesQuery } from '@/api/profiles/hooks/useProfilesQuery';
import { ClickableAvatar } from '@/components/block/ClickableAvater';
import { Badge } from '@/components/ui/Badge';
import { Text } from '@/components/ui/Text';
import { Navbar01 } from '@/components/ui/shadcn-io/navbar-01';

export const AllProfiles: React.FC = () => {
  const { data: profiles, isLoading } = useProfilesQuery();

  if (isLoading) {
    return null;
  }

  if (!profiles || !profiles.length) {
    return 'No profiles found';
  }
  return (
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
                  {profile.genres?.map((genre) => (
                    <Badge key={genre}>{genre}</Badge>
                  ))}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
};
