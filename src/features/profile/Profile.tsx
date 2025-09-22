import { useProfileQuery } from '@/api/profiles/hooks/useProfileQuery';
import { Badge } from '@/components/ui/Badge';
import { Text } from '@/components/ui/Text';
import { useParams } from 'react-router';
import { SongListItem } from './components/SongListItem';
import { Button } from '@/components/ui/Button';
import { VibeCard } from './components/VibeCard';

export const Profile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: profile, isLoading } = useProfileQuery(id);

  if (isLoading) {
    return null;
  }

  if (!profile) {
    return 'No profile found';
  }

  return (
    <div className="flex min-h-screen md:flex-row flex-col">
      <div className="md:w-3xs w-full p-8 gap-6 flex flex-col">
        <div className="flex flex-col gap-2">
          <Text size="h4" align="center">
            {profile.name}
          </Text>
          <img
            className="rounded-md"
            src="https://media.discordapp.net/attachments/702862051957145653/1419255646792192030/image_720.png?ex=68d269d2&is=68d11852&hm=ed303074e7248c1d0f2d8e9ab55508d2cb21bd45eb162f0d86d47e91e6291989&=&format=webp&quality=lossless&width=806&height=806"
          />
        </div>

        <div className="flex justify-center">
          <Button className="w-full">Let's Jam! &#127928;</Button>
        </div>

        <div className="flex flex-col gap-4">
          <div>
            <Text size="h6">Genres</Text>
            <div className="flex flex-wrap gap-2 mt-1">
              {profile.genres.map((genre) => (
                <Badge key={genre}>{genre}</Badge>
              ))}
            </div>
          </div>

          <div>
            <Text size="h6">Instruments</Text>
            <div className="flex flex-wrap gap-2 mt-1">
              {profile.instruments.map((instrument) => (
                <Badge key={instrument} variant="default">
                  {instrument}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <Text size="h6">Preferred days</Text>
            <div className="flex flex-wrap gap-2 mt-1">
              {profile.availability.days.map((day) => (
                <Badge key={day} variant="default">
                  {day}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <Text size="h6">Preferred times</Text>
            <div className="flex flex-wrap gap-2 mt-1">
              {profile.availability.times.map((time) => (
                <Badge key={time} variant="default">
                  {time}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col flex-1 p-4 pt-8 gap-8">
        <div className="pb-4">
          <Text size="h6">My Songs</Text>
          <div className="grid grid-cols-1">
            {profile.songs.map((song, idx) => (
              <>
                <SongListItem
                  enjoy={song.enjoy}
                  wantToPlay={song.wantToPlay}
                  key={song.title}
                  title={song.title}
                  artist={song.artist}
                  albumImage={''}
                  skill={song.skill}
                />
                {idx !== profile.songs.length - 1 && <hr />}
              </>
            ))}
          </div>
        </div>

        <div>
          <Text size="h6" className="mb-1">
            Behind the Music
          </Text>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 mb-4">
            {profile.vibes.map((vibe) => (
              <VibeCard key={vibe.question} question={vibe.question} answer={vibe.answer} />
            ))}
          </div>
        </div>

        <div>
          <Text size="h6" className="mb-1">
            Musical Background
          </Text>
          <Text className="whitespace-pre-line">{profile.background}</Text>
        </div>

        <div>
          <Text size="h6">Event History</Text>

          <Text size="small">To be added...</Text>
        </div>
      </div>
    </div>
  );
};
