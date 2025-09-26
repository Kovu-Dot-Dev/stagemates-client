import {
  ArrowLeft,
  Calendar,
  Clock,
  ExternalLink,
  Globe,
  Instagram,
  MapPin,
  MessageCircle,
  Music,
  Music2,
  Play,
  Star,
  UserPlus,
  Youtube,
} from 'lucide-react';
import { useState } from 'react';
import { useParams } from 'react-router';

import { useProfileQuery } from '@/api/profiles/hooks/useProfileQuery';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Separator } from '@/components/ui/Separator';

import type { MusicianProfile } from './ProfileSetup';

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

interface UserProfileProps {
  user?: UserProfileData;
  currentUser?: MusicianProfile;
  onBack?: () => void;
  onMessage?: (userId: string) => void;
  onConnect?: (userId: string) => void;
}

export function UserProfile({ user, currentUser, onBack, onMessage, onConnect }: UserProfileProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'media' | 'history'>('overview');
  // get user id from url params if user prop not provided
  const { id } = useParams<{ id: string }>();
  const { data: profile, isLoading } = useProfileQuery(id);

  if (isLoading) {
    return null;
  }
  if (!profile) {
    return <div className="p-4">No user data provided for ID: {id}</div>;
  }
  user = profile;
  //   const isOwnProfile = user.id === currentuser.id;
  //   const isOwnProfile = user.id === currentUser?.id;
  const isOwnProfile = false;

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
    const { days, timeOfDay, frequency } = user.availability;
    return `${days.join(', ')} • ${timeOfDay.join('/')} • ${frequency}`;
  };

  const upcomingJams = user.jamHistory.filter((jam) => jam.type === 'upcoming');
  const pastJams = user.jamHistory.filter((jam) => jam.type === 'past');

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="outline" size="sm" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        {!isOwnProfile && (
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={() => onMessage(user.id)}>
              <MessageCircle className="w-4 h-4 mr-2" />
              Message
            </Button>
            <Button size="sm" onClick={() => onConnect(user.id)}>
              <UserPlus className="w-4 h-4 mr-2" />
              Connect
            </Button>
          </div>
        )}
      </div>

      {/* Profile Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-start space-y-4 md:space-y-0 md:space-x-6">
            <div className="flex flex-col items-center md:items-start">
              <Avatar className="w-32 h-32">
                <AvatarImage src={user.profileImage} />
                <AvatarFallback className="text-4xl">{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex items-center mt-3 space-x-2">
                <Badge
                  variant={user.isAvailableForCollab ? 'default' : 'secondary'}
                  className="text-xs">
                  {user.isAvailableForCollab ? 'Available' : 'Not Available'}
                </Badge>
                {user.yearsExperience >= 5 && (
                  <Badge variant="outline" className="text-xs">
                    <Star className="w-3 h-3 mr-1" />
                    Experienced
                  </Badge>
                )}
              </div>
            </div>

            <div className="flex-1 space-y-4">
              <div>
                <h1 className="text-3xl mb-1">{user.name}</h1>
                <div className="flex items-center text-muted-foreground mb-3">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>{user.location}</span>
                </div>
                <p className="text-muted-foreground">{user.bio}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="mb-2">Primary Instruments</h4>
                  <div className="flex flex-wrap gap-1">
                    {user.primaryInstruments.map((instrument) => (
                      <Badge key={instrument} className="text-xs">
                        {instrument}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="mb-2">Secondary Instruments</h4>
                  <div className="flex flex-wrap gap-1">
                    {user.secondaryInstruments.map((instrument) => (
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
                  {user.preferredGenres.map((genre) => (
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
            onClick={() => setActiveTab(tab.id as any)}
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
                  <Badge variant="outline">{user.skillLevel}</Badge>
                  <span className="text-sm text-muted-foreground">
                    {user.yearsExperience} years experience
                  </span>
                </div>
              </div>

              <div>
                <h4 className="mb-2">Looking For</h4>
                <div className="flex flex-wrap gap-1">
                  {user.collaborationInterests.map((interest) => (
                    <Badge key={interest} variant="outline" className="text-xs">
                      {interest}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="mb-2">Preferred Jam Settings</h4>
                <div className="flex flex-wrap gap-1">
                  {user.preferredJamSettings.map((setting) => (
                    <Badge key={setting} variant="secondary" className="text-xs">
                      {setting}
                    </Badge>
                  ))}
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="mb-2">Musical Influences</h4>
                <p className="text-sm text-muted-foreground">{user.influences}</p>
              </div>

              <div>
                <h4 className="mb-2">Performance Style</h4>
                <p className="text-sm text-muted-foreground">{user.performanceStyle}</p>
              </div>

              <div>
                <h4 className="mb-2">Musical Goals</h4>
                <p className="text-sm text-muted-foreground">{user.musicalGoals}</p>
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
                  {user.preferredDateTime.map((time) => (
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

              {!user.isAvailableForCollab && (
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
          {user.musicLinks.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Music & Performances</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {user.musicLinks.map((link, index) => (
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
          {user.socialLinks.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Social & Online Presence</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3">
                  {user.socialLinks.map((link, index) => (
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

          {user.musicLinks.length === 0 && user.socialLinks.length === 0 && (
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
                    {isOwnProfile
                      ? 'Join some sessions to build your history!'
                      : 'This musician is new to the platform'}
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
