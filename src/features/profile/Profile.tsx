import {
  ArrowLeft,
  Calendar,
  Clock,
  ExternalLink,
  Globe,
  Instagram,
  MapPin,
  Music,
  Music2,
  Star,
  Youtube,
} from 'lucide-react';
import { useState } from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/Avatar';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Separator } from '../../components/ui/Separator';

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

export interface UserProfileData extends MusicianProfile {
  primaryInstruments: string[];
  secondaryInstruments: string[];
  preferredGenres: string[];
  collaborationInterests: string[];
  availability: {
    days: string[];
    timeOfDay: string[];
    frequency: string;
  };
  preferredJamSettings: string[];
  preferredDateTime: string[];
  musicLinks: {
    type: 'spotify' | 'youtube' | 'soundcloud' | 'bandcamp' | 'website';
    url: string;
    title?: string;
  }[];
  socialLinks: {
    type: 'instagram' | 'twitter' | 'facebook' | 'website';
    url: string;
  }[];
  jamHistory: JamHistoryItem[];
  influences: string;
  performanceStyle: string;
  musicalGoals: string;
  yearsExperience: number;
  isAvailableForCollab: boolean;
}

export interface JamHistoryItem {
  id: string;
  title: string;
  date: string;
  type: 'past' | 'upcoming';
  role: 'host' | 'participant';
  genre: string;
}

const mockUser: UserProfileData = {
  id: "user-123",
  name: "Alex Rivera",
  bio: "Passionate guitarist and songwriter looking to collaborate with like-minded musicians. I love creating original music and jamming across different genres.",
  location: "San Francisco, CA",
  instruments: ["Guitar", "Bass", "Vocals"],
  genres: ["Rock", "Blues", "Jazz", "Indie"],
  skillLevel: "Intermediate",
  lookingFor: ["Band Formation", "Songwriting", "Live Performance"],
  profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
  soundCloudUrl: "https://soundcloud.com/alexrivera",
  youtubeUrl: "https://youtube.com/@alexrivera",
  spotifyUrl: "https://open.spotify.com/artist/alexrivera",
  primaryInstruments: ["Electric Guitar", "Acoustic Guitar"],
  secondaryInstruments: ["Bass Guitar", "Vocals", "Piano"],
  preferredGenres: ["Rock", "Blues", "Jazz", "Indie", "Alternative"],
  collaborationInterests: ["Band Formation", "Songwriting", "Recording", "Live Performance"],
  availability: {
    days: ["Tuesday", "Thursday", "Saturday", "Sunday"],
    timeOfDay: ["Evening", "Weekend"],
    frequency: "2-3 times per week"
  },
  preferredJamSettings: ["Home Studio", "Rehearsal Space", "Outdoor"],
  preferredDateTime: ["Weekday Evenings", "Weekend Afternoons", "Weekend Evenings"],
  musicLinks: [
    {
      type: "spotify",
      url: "https://open.spotify.com/artist/alexrivera",
      title: "Original Songs & Covers"
    },
    {
      type: "youtube",
      url: "https://youtube.com/@alexrivera",
      title: "Live Performances & Tutorials"
    },
    {
      type: "soundcloud",
      url: "https://soundcloud.com/alexrivera",
      title: "Demo Recordings"
    }
  ],
  socialLinks: [
    {
      type: "instagram",
      url: "https://instagram.com/alexrivera_music"
    },
    {
      type: "twitter",
      url: "https://twitter.com/alexrivera_music"
    }
  ],
  jamHistory: [
    {
      id: "jam-1",
      title: "Blues Night Session",
      date: "2024-12-15",
      type: "upcoming",
      role: "participant",
      genre: "Blues"
    },
    {
      id: "jam-2",
      title: "Indie Rock Collaboration",
      date: "2024-12-20",
      type: "upcoming",
      role: "host",
      genre: "Indie Rock"
    },
    {
      id: "jam-3",
      title: "Jazz Fusion Experiment",
      date: "2024-11-28",
      type: "past",
      role: "participant",
      genre: "Jazz"
    },
    {
      id: "jam-4",
      title: "Acoustic Songwriting Circle",
      date: "2024-11-15",
      type: "past",
      role: "host",
      genre: "Folk"
    },
    {
      id: "jam-5",
      title: "Rock Cover Band Practice",
      date: "2024-11-08",
      type: "past",
      role: "participant",
      genre: "Rock"
    }
  ],
  influences: "Influenced by classic rock legends like Hendrix and Page, modern blues masters like Joe Bonamassa, and indie artists like Tame Impala. Always exploring new sounds and techniques.",
  performanceStyle: "Energetic and expressive, with a focus on melodic improvisation and dynamic stage presence. Comfortable both leading and supporting in group settings.",
  musicalGoals: "Looking to form a serious band for original music creation and live performances. Interested in recording an EP and playing local venues.",
  yearsExperience: 8,
  isAvailableForCollab: true
}

export function Profile() {
  const [activeTab, setActiveTab] = useState<'overview' | 'media' | 'history'>('overview');

  const getLinkIcon = (type: string) => {
    switch (type) {
      case 'spotify':
        return <Music className="w-4 h-4" />;
      case 'youtube':
        return <Youtube className="w-4 h-4" />;
      case 'soundcloud':
        return <Music2 className="w-4 h-4" />;
      case 'instagram':
        return <Instagram className="w-4 h-4" />;
      default:
        return <Globe className="w-4 h-4" />;
    }
  };

  const formatAvailability = () => {
    const { days, timeOfDay, frequency } = mockUser.availability;
    return `${days.join(', ')} • ${timeOfDay.join('/')} • ${frequency}`;
  };

  const upcomingJams = mockUser.jamHistory.filter((jam) => jam.type === 'upcoming');
  const pastJams = mockUser.jamHistory.filter((jam) => jam.type === 'past');

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="outline" size="sm">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
      </div>

      {/* Profile Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-start space-y-4 md:space-y-0 md:space-x-6">
            <div className="flex flex-col items-center md:items-start">
              <Avatar className="w-32 h-32">
                <AvatarImage src={mockUser.profileImage} />
                <AvatarFallback className="text-4xl">{mockUser.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex items-center mt-3 space-x-2">
                <Badge
                  variant={mockUser.isAvailableForCollab ? 'default' : 'secondary'}
                  className="text-xs">
                  {mockUser.isAvailableForCollab ? 'Available' : 'Not Available'}
                </Badge>
                {mockUser.yearsExperience >= 5 && (
                  <Badge variant="outline" className="text-xs">
                    <Star className="w-3 h-3 mr-1" />
                    Experienced
                  </Badge>
                )}
              </div>
            </div>

            <div className="flex-1 space-y-4">
              <div>
                <h1 className="text-3xl mb-1">{mockUser.name}</h1>
                <div className="flex items-center text-muted-foreground mb-3">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>{mockUser.location}</span>
                </div>
                <p className="text-muted-foreground">{mockUser.bio}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="mb-2">Primary Instruments</h4>
                  <div className="flex flex-wrap gap-1">
                    {mockUser.primaryInstruments.map((instrument) => (
                      <Badge key={instrument} className="text-xs">
                        {instrument}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="mb-2">Secondary Instruments</h4>
                  <div className="flex flex-wrap gap-1">
                    {mockUser.secondaryInstruments.map((instrument) => (
                      <Badge key={instrument} variant="outline" className="text-xs">
                        {instrument}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <h4 className="mb-2">Preferred Genres</h4>
                <div className="flex flex-wrap gap-1">
                  {mockUser.preferredGenres.map((genre) => (
                    <Badge key={genre} variant="secondary" className="text-xs">
                      {genre}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Navigation Tabs */}
      <div className="flex border-b">
        {[
          { id: 'overview', label: 'Overview' },
          { id: 'media', label: 'Music & Links' },
          { id: 'history', label: 'Jam History' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as unknown)}
            className={`px-4 py-2 border-b-2 transition-colors ${
              activeTab === tab.id
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="grid md:grid-cols-2 gap-6">
          {/* Musical Profile */}
          <Card>
            <CardHeader>
              <CardTitle>Musical Profile</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="mb-2">Experience Level</h4>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline">{mockUser.skillLevel}</Badge>
                  <span className="text-sm text-muted-foreground">
                    {mockUser.yearsExperience} years experience
                  </span>
                </div>
              </div>

              <div>
                <h4 className="mb-2">Looking For</h4>
                <div className="flex flex-wrap gap-1">
                  {mockUser.collaborationInterests.map((interest) => (
                    <Badge key={interest} variant="outline" className="text-xs">
                      {interest}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="mb-2">Preferred Jam Settings</h4>
                <div className="flex flex-wrap gap-1">
                  {mockUser.preferredJamSettings.map((setting) => (
                    <Badge key={setting} variant="secondary" className="text-xs">
                      {setting}
                    </Badge>
                  ))}
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="mb-2">Musical Influences</h4>
                <p className="text-sm text-muted-foreground">{mockUser.influences}</p>
              </div>

              <div>
                <h4 className="mb-2">Performance Style</h4>
                <p className="text-sm text-muted-foreground">{mockUser.performanceStyle}</p>
              </div>

              <div>
                <h4 className="mb-2">Musical Goals</h4>
                <p className="text-sm text-muted-foreground">{mockUser.musicalGoals}</p>
              </div>
            </CardContent>
          </Card>

          {/* Availability & Logistics */}
          <Card>
            <CardHeader>
              <CardTitle>Availability & Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="mb-2 flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  General Availability
                </h4>
                <p className="text-sm text-muted-foreground">{formatAvailability()}</p>
              </div>

              <div>
                <h4 className="mb-2 flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  Preferred Times
                </h4>
                <div className="flex flex-wrap gap-1">
                  {mockUser.preferredDateTime.map((time) => (
                    <Badge key={time} variant="outline" className="text-xs">
                      {time}
                    </Badge>
                  ))}
                </div>
              </div>

              {upcomingJams.length > 0 && (
                <div>
                  <h4 className="mb-2">Upcoming Sessions</h4>
                  <div className="space-y-2">
                    {upcomingJams.slice(0, 3).map((jam) => (
                      <div
                        key={jam.id}
                        className="flex items-center justify-between p-2 bg-muted/30 rounded">
                        <div>
                          <p className="text-sm font-medium">{jam.title}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(jam.date).toLocaleDateString()} • {jam.genre}
                          </p>
                        </div>
                        <Badge
                          variant={jam.role === 'host' ? 'default' : 'secondary'}
                          className="text-xs">
                          {jam.role}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {!mockUser.isAvailableForCollab && (
                <div className="p-3 bg-muted/30 rounded">
                  <p className="text-sm text-muted-foreground">
                    Currently not actively looking for new collaborations
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'media' && (
        <div className="space-y-6">
          {/* Music Links */}
          {mockUser.musicLinks.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Music & Performances</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {mockUser.musicLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="p-2 bg-primary/20 rounded">{getLinkIcon(link.type)}</div>
                      <div className="flex-1">
                        <p className="font-medium capitalize">{link.type}</p>
                        {link.title && (
                          <p className="text-sm text-muted-foreground">{link.title}</p>
                        )}
                      </div>
                      <ExternalLink className="w-4 h-4 text-muted-foreground" />
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Social Links */}
          {mockUser.socialLinks.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Social & Online Presence</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3">
                  {mockUser.socialLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 px-3 py-2 border rounded-full hover:bg-muted/50 transition-colors">
                      {getLinkIcon(link.type)}
                      <span className="text-sm capitalize">{link.type}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {mockUser.musicLinks.length === 0 && mockUser.socialLinks.length === 0 && (
            <Card>
              <CardContent className="p-8 text-center">
                <Music2 className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                <p className="text-muted-foreground">No music or social links shared yet</p>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {activeTab === 'history' && (
        <div className="space-y-6">
          {/* Upcoming Jams */}
          {upcomingJams.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Jam Sessions ({upcomingJams.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {upcomingJams.map((jam) => (
                    <div
                      key={jam.id}
                      className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{jam.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(jam.date).toLocaleDateString()} • {jam.genre}
                        </p>
                      </div>
                      <Badge variant={jam.role === 'host' ? 'default' : 'secondary'}>
                        {jam.role}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Past Jams */}
          <Card>
            <CardHeader>
              <CardTitle>
                Jam Session History ({pastJams.length})
                {pastJams.length > 0 && (
                  <Badge variant="outline" className="ml-2 text-xs">
                    Active Member
                  </Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {pastJams.length === 0 ? (
                <div className="text-center py-6">
                  <Calendar className="w-8 h-8 mx-auto mb-2 text-muted-foreground opacity-50" />
                  <p className="text-muted-foreground">No jam session history yet</p>
                  <p className="text-sm text-muted-foreground mt-1">
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {pastJams.slice(0, 10).map((jam) => (
                    <div
                      key={jam.id}
                      className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <div>
                        <p className="font-medium">{jam.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(jam.date).toLocaleDateString()} • {jam.genre}
                        </p>
                      </div>
                      <Badge
                        variant={jam.role === 'host' ? 'outline' : 'secondary'}
                        className="text-xs">
                        {jam.role}
                      </Badge>
                    </div>
                  ))}
                  {pastJams.length > 10 && (
                    <p className="text-center text-sm text-muted-foreground">
                      And {pastJams.length - 10} more sessions...
                    </p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
