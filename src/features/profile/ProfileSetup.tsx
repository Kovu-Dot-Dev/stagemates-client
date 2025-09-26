import { Camera, X } from 'lucide-react';
import { useState } from 'react';

import { ImageWithFallback } from '@/components/block/ImageWithFallback';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';
import { Textarea } from '@/components/ui/Textarea';

interface ProfileSetupProps {
  onComplete?: (profile: MusicianProfile) => void;
}

export interface MusicianProfile {
  id: string;
  name: string;
  bio: string;
  location: string;
  instruments: string[];
  genres: string[];
  skillLevel: string;
  lookingFor: string[];
  profileImage?: string;
  soundCloudUrl?: string;
  youtubeUrl?: string;
  spotifyUrl?: string;
}

const instruments = [
  'Guitar',
  'Bass',
  'Drums',
  'Piano',
  'Keyboard',
  'Vocals',
  'Violin',
  'Saxophone',
  'Trumpet',
  'Flute',
  'Clarinet',
  'Cello',
  'Ukulele',
  'Harmonica',
  'Banjo',
];

const genres = [
  'Rock',
  'Jazz',
  'Blues',
  'Classical',
  'Pop',
  'Hip Hop',
  'Electronic',
  'Folk',
  'Country',
  'Reggae',
  'Punk',
  'Metal',
  'R&B',
  'Indie',
  'Alternative',
  'Funk',
];

const skillLevels = ['Beginner', 'Intermediate', 'Advanced', 'Professional'];

const lookingForOptions = [
  'Jam Sessions',
  'Band Formation',
  'Recording Projects',
  'Live Performances',
  'Music Learning',
  'Songwriting',
  'Cover Band',
  'Original Music',
];

export function ProfileSetup({ onComplete = () => {} }: ProfileSetupProps) {
  const [profile, setProfile] = useState<Partial<MusicianProfile>>({
    instruments: [],
    genres: [],
    lookingFor: [],
  });

  const addItem = (category: keyof MusicianProfile, item: string) => {
    const currentItems = (profile[category] as string[]) || [];
    if (!currentItems.includes(item)) {
      setProfile((prev) => ({
        ...prev,
        [category]: [...currentItems, item],
      }));
    }
  };

  const removeItem = (category: keyof MusicianProfile, item: string) => {
    const currentItems = (profile[category] as string[]) || [];
    setProfile((prev) => ({
      ...prev,
      [category]: currentItems.filter((i) => i !== item),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (profile.name && profile.location && profile.instruments?.length && profile.genres?.length) {
      onComplete({
        id: Math.random().toString(36).substr(2, 9),
        name: profile.name!,
        bio: profile.bio || '',
        location: profile.location!,
        instruments: profile.instruments!,
        genres: profile.genres!,
        skillLevel: profile.skillLevel || 'Intermediate',
        lookingFor: profile.lookingFor || [],
        profileImage: profile.profileImage,
        soundCloudUrl: profile.soundCloudUrl,
        youtubeUrl: profile.youtubeUrl,
        spotifyUrl: profile.spotifyUrl,
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-2">
        <h1>Create Your Musician Profile</h1>
        <p className="text-muted-foreground">
          Let other musicians know who you are and what you're looking for
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Profile Photo */}
        <Card>
          <CardHeader>
            <CardTitle>Profile Photo</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-4">
            <Avatar className="w-24 h-24">
              <AvatarImage src={profile.profileImage} />
              <AvatarFallback>
                <Camera className="w-8 h-8" />
              </AvatarFallback>
            </Avatar>
            <Button type="button" variant="outline">
              <Camera className="w-4 h-4 mr-2" />
              Upload Photo
            </Button>
          </CardContent>
        </Card>

        {/* Basic Info */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                value={profile.name || ''}
                onChange={(e) => setProfile((prev) => ({ ...prev, name: e.target.value }))}
                placeholder="Your name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location *</Label>
              <Input
                id="location"
                value={profile.location || ''}
                onChange={(e) => setProfile((prev) => ({ ...prev, location: e.target.value }))}
                placeholder="City, State/Country"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value={profile.bio || ''}
                onChange={(e) => setProfile((prev) => ({ ...prev, bio: e.target.value }))}
                placeholder="Tell other musicians about yourself..."
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="skillLevel">Skill Level</Label>
              <Select
                value={profile.skillLevel}
                onValueChange={(value) => setProfile((prev) => ({ ...prev, skillLevel: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your skill level" />
                </SelectTrigger>
                <SelectContent>
                  {skillLevels.map((level) => (
                    <SelectItem key={level} value={level}>
                      {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Instruments */}
        <Card>
          <CardHeader>
            <CardTitle>Instruments *</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Select onValueChange={(value) => addItem('instruments', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Add an instrument" />
              </SelectTrigger>
              <SelectContent>
                {instruments
                  .filter((inst) => !profile.instruments?.includes(inst))
                  .map((instrument) => (
                    <SelectItem key={instrument} value={instrument}>
                      {instrument}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
            <div className="flex flex-wrap gap-2">
              {profile.instruments?.map((instrument) => (
                <Badge
                  key={instrument}
                  variant="secondary"
                  className="cursor-pointer"
                  onClick={() => removeItem('instruments', instrument)}>
                  {instrument}
                  <X className="w-3 h-3 ml-1" />
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Genres */}
        <Card>
          <CardHeader>
            <CardTitle>Musical Genres *</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Select onValueChange={(value) => addItem('genres', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Add a genre" />
              </SelectTrigger>
              <SelectContent>
                {genres
                  .filter((genre) => !profile.genres?.includes(genre))
                  .map((genre) => (
                    <SelectItem key={genre} value={genre}>
                      {genre}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
            <div className="flex flex-wrap gap-2">
              {profile.genres?.map((genre) => (
                <Badge
                  key={genre}
                  variant="secondary"
                  className="cursor-pointer"
                  onClick={() => removeItem('genres', genre)}>
                  {genre}
                  <X className="w-3 h-3 ml-1" />
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Looking For */}
        <Card>
          <CardHeader>
            <CardTitle>What are you looking for?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Select onValueChange={(value) => addItem('lookingFor', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Add what you're looking for" />
              </SelectTrigger>
              <SelectContent>
                {lookingForOptions
                  .filter((option) => !profile.lookingFor?.includes(option))
                  .map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
            <div className="flex flex-wrap gap-2">
              {profile.lookingFor?.map((item) => (
                <Badge
                  key={item}
                  variant="secondary"
                  className="cursor-pointer"
                  onClick={() => removeItem('lookingFor', item)}>
                  {item}
                  <X className="w-3 h-3 ml-1" />
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Social Links */}
        <Card>
          <CardHeader>
            <CardTitle>Music Links (Optional)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="soundcloud">SoundCloud URL</Label>
              <Input
                id="soundcloud"
                value={profile.soundCloudUrl || ''}
                onChange={(e) => setProfile((prev) => ({ ...prev, soundCloudUrl: e.target.value }))}
                placeholder="https://soundcloud.com/yourusername"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="youtube">YouTube Channel</Label>
              <Input
                id="youtube"
                value={profile.youtubeUrl || ''}
                onChange={(e) => setProfile((prev) => ({ ...prev, youtubeUrl: e.target.value }))}
                placeholder="https://youtube.com/@yourusername"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="spotify">Spotify Profile</Label>
              <Input
                id="spotify"
                value={profile.spotifyUrl || ''}
                onChange={(e) => setProfile((prev) => ({ ...prev, spotifyUrl: e.target.value }))}
                placeholder="https://open.spotify.com/artist/..."
              />
            </div>
          </CardContent>
        </Card>

        <Button type="submit" className="w-full" size="lg">
          Complete Profile Setup
        </Button>
      </form>
    </div>
  );
}
