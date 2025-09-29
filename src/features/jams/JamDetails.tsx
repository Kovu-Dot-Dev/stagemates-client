import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  MessageCircle,
  Music2,
  Plus,
  Share2,
  UserPlus,
  Users,
} from 'lucide-react';
import { useState } from 'react';
import React from 'react';
import { Link, useParams } from 'react-router';

import { useJamQuery } from '@/api/jams/hooks/useJamQuery';
import type { JamSession, SetListSong } from '@/api/jams/services/types';
import { mockMusicianProfiles } from '@/api/profiles/services/mock';
import type { MusicianProfile } from '@/api/profiles/services/types';
import { ClickableAvatar } from '@/components/block/ClickableAvater';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/Dialog';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';

import { JamDiscussion } from './components/JamDiscussion';

interface JamDetailsProps {
  currentUser?: MusicianProfile;
  onBack?: () => void;
  onJoinJam?: (jam: JamSession) => void;
  onLeaveJam?: (jam: JamSession) => void;
  onAddSong?: (jamId: string, song: Omit<SetListSong, 'id' | 'suggestedBy'>) => void;
  onAddThread?: (jamId: string, content: string) => void;
  onAddReply?: (jamId: string, threadId: string, content: string) => void;
  onViewProfile?: (userId: string) => void;
}

export function JamDetails({
  currentUser = mockMusicianProfiles[0],
  onBack = () => {},
  onJoinJam = () => {},
  onLeaveJam = () => {},
  onAddSong = () => {},
  onAddThread = () => {},
  onAddReply = () => {},
  onViewProfile = () => {},
}: JamDetailsProps) {
  const { id } = useParams<{ id: string }>();
  const { data: jam, isLoading } = useJamQuery(id);
  const [isAddSongDialogOpen, setIsAddSongDialogOpen] = useState(false);
  const [newSong, setNewSong] = useState<Partial<SetListSong>>({
    difficulty: 'Medium',
  });

  if (isLoading) {
    return null;
  }

  if (!jam) {
    return 'No Jam found';
  }

  const isParticipant = jam.participants.some((p) => p.id === currentUser.id);
  const isHost = jam.host.id === currentUser.id;
  const isFull = jam.currentParticipants >= jam.maxParticipants;
  const spotsRemaining = jam.maxParticipants - jam.currentParticipants;

  const handleAddSong = () => {
    if (newSong.title && newSong.artist) {
      onAddSong(jam.id, {
        title: newSong.title,
        artist: newSong.artist,
        genre: newSong.genre || '',
        difficulty: newSong.difficulty || 'Medium',
        duration: newSong.duration,
        key: newSong.key,
      });
      setIsAddSongDialogOpen(false);
      setNewSong({ difficulty: 'Medium' });
    }
  };

  const handleAddThread = (content: string) => {
    onAddThread(jam.id, content);
  };

  const handleAddReply = (threadId: string, content: string) => {
    onAddReply(jam.id, threadId, content);
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = (timeStr: string) => {
    const [hours, minutes] = timeStr.split(':');
    const date = new Date();
    date.setHours(parseInt(hours), parseInt(minutes));
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Link to="/jams">
          <Button variant="outline" size="sm" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Jams
          </Button>
        </Link>
        <div className="flex items-center space-x-2">
          <Badge variant={jam.type === 'open' ? 'default' : 'secondary'}>
            {jam.type === 'open' ? 'Open Session' : 'Private Session'}
          </Badge>
          <Badge variant="outline">{jam.skillLevel}</Badge>
        </div>
      </div>

      {/* Main Jam Info */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <CardTitle className="text-2xl">{jam.title}</CardTitle>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <ClickableAvatar
                  route={`/profiles/u1`} // hardcoded for now
                  src={jam.host.image}
                  fallback={jam.host.name.charAt(0)}
                  className="w-8 h-8"
                  onClick={() => onViewProfile(jam.host.id)}
                />
                <span>
                  Hosted by{' '}
                  <button
                    onClick={() => onViewProfile(jam.host.id)}
                    className="text-foreground hover:text-primary transition-colors underline">
                    {jam.host.name}
                  </button>
                </span>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm">
                <MessageCircle className="w-4 h-4 mr-2" />
                Message Host
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-muted-foreground">{jam.description}</p>

          {/* Date, Time, Location */}
          <div className="grid md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-3">
              <Calendar className="w-5 h-5 text-primary" />
              <div>
                <p className="font-medium">{formatDate(jam.date)}</p>
                <p className="text-sm text-muted-foreground">Date</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Clock className="w-5 h-5 text-primary" />
              <div>
                <p className="font-medium">{formatTime(jam.time)}</p>
                <p className="text-sm text-muted-foreground">Time</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="w-5 h-5 text-primary" />
              <div>
                <p className="font-medium">{jam.location}</p>
                {jam.address && <p className="text-sm text-muted-foreground">{jam.address}</p>}
              </div>
            </div>
          </div>

          {/* Genres */}
          <div>
            <h4 className="mb-2">Genres</h4>
            <div className="flex flex-wrap gap-2">
              {jam.genres.map((genre) => (
                <Badge key={genre} variant="outline">
                  {genre}
                </Badge>
              ))}
            </div>
          </div>

          {jam.notes && (
            <div>
              <h4 className="mb-2">Additional Notes</h4>
              <p className="text-sm text-muted-foreground">{jam.notes}</p>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Participants */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <Users className="w-5 h-5" />
                <span>
                  Participants ({jam.currentParticipants}/{jam.maxParticipants})
                </span>
              </CardTitle>
              {!isFull && !isParticipant && (
                <Button size="sm" onClick={() => onJoinJam(jam)}>
                  <UserPlus className="w-4 h-4 mr-2" />
                  Join
                </Button>
              )}
              {isParticipant && !isHost && (
                <Button size="sm" variant="outline" onClick={() => onLeaveJam(jam)}>
                  Leave
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Host */}
            <div
              className="flex items-center space-x-3 p-3 bg-primary/10 rounded-lg cursor-pointer hover:bg-primary/15 transition-colors"
              onClick={() => onViewProfile(jam.host.id)}>
              <ClickableAvatar
                route={`/profiles/${jam.host.id}`} // hardcoded for now
                src={jam.host.image}
                fallback={jam.host.name.charAt(0)}
                className="w-10 h-10"
                onClick={() => onViewProfile(jam.host.id)}
              />
              <div className="flex-1">
                <p className="font-medium hover:text-primary">{jam.host.name}</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {jam.host.instruments?.map((instrument) => (
                    <Badge key={instrument} variant="secondary" className="text-xs">
                      {instrument}
                    </Badge>
                  ))}
                  <Badge className="text-xs">Host</Badge>
                </div>
              </div>
            </div>

            {/* Other Participants */}
            {jam.participants.map((participant) => (
              <div
                key={participant.id}
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                onClick={() => onViewProfile(participant.id)}>
                <ClickableAvatar
                  route={`/profiles/${participant.id}`} // hardcoded for now
                  src={participant.image}
                  fallback={participant.name.charAt(0)}
                  className="w-10 h-10"
                  onClick={() => onViewProfile(participant.id)}
                />
                <div className="flex-1">
                  <p className="font-medium hover:text-primary">{participant.name}</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {participant?.instruments?.map((instrument) => (
                      <Badge key={instrument} variant="secondary" className="text-xs">
                        {instrument}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            {/* Needed Instruments */}
            {jam.neededInstruments.length > 0 && (
              <div className="pt-4 border-t">
                <h5 className="text-sm font-medium mb-2">Still Looking For:</h5>
                <div className="flex flex-wrap gap-1">
                  {jam.neededInstruments.map((instrument) => (
                    <Badge key={instrument} variant="outline" className="text-xs">
                      {instrument}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Available spots */}
            {spotsRemaining > 0 && (
              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  {spotsRemaining} {spotsRemaining === 1 ? 'spot' : 'spots'} remaining
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Setlist */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <Music2 className="w-5 h-5" />
                <span>Setlist ({jam.setlist.length} songs)</span>
              </CardTitle>
              {(isParticipant || isHost) && (
                <Dialog open={isAddSongDialogOpen} onOpenChange={setIsAddSongDialogOpen}>
                  <DialogTrigger asChild>
                    <Button size="sm" variant="outline">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Song
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add Song to Setlist</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="song-title">Song Title</Label>
                          <Input
                            id="song-title"
                            value={newSong.title || ''}
                            onChange={(e) =>
                              setNewSong((prev) => ({ ...prev, title: e.target.value }))
                            }
                            placeholder="Song name"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="song-artist">Artist</Label>
                          <Input
                            id="song-artist"
                            value={newSong.artist || ''}
                            onChange={(e) =>
                              setNewSong((prev) => ({ ...prev, artist: e.target.value }))
                            }
                            placeholder="Artist name"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="song-key">Key</Label>
                          <Input
                            id="song-key"
                            value={newSong.key || ''}
                            onChange={(e) =>
                              setNewSong((prev) => ({ ...prev, key: e.target.value }))
                            }
                            placeholder="C, Dm, etc."
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="song-genre">Genre</Label>
                          <Input
                            id="song-genre"
                            value={newSong.genre || ''}
                            onChange={(e) =>
                              setNewSong((prev) => ({ ...prev, genre: e.target.value }))
                            }
                            placeholder="Rock, Jazz, etc."
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="song-duration">Duration (min)</Label>
                          <Input
                            id="song-duration"
                            type="number"
                            value={newSong.duration || ''}
                            onChange={(e) =>
                              setNewSong((prev) => ({
                                ...prev,
                                duration: parseInt(e.target.value),
                              }))
                            }
                            placeholder="4"
                          />
                        </div>
                      </div>
                      <Button onClick={handleAddSong} className="w-full">
                        Add to Setlist
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {jam.setlist.length === 0 ? (
              <div className="text-center p-6 text-muted-foreground">
                <Music2 className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p>No songs in the setlist yet</p>
                <p className="text-sm">Be the first to suggest a song!</p>
              </div>
            ) : (
              <div className="space-y-3">
                {jam.setlist.map((song, index) => (
                  <div key={song.id} className="flex items-center space-x-3 p-3 rounded-lg border">
                    <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium">{index + 1}</span>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{song.title}</p>
                      <p className="text-sm text-muted-foreground">
                        by {song.artist}
                        {song.key && ` • Key: ${song.key}`}
                        {song.duration && ` • ${song.duration}min`}
                      </p>
                    </div>
                    <div className="flex flex-col items-end space-y-1">
                      <Badge variant="outline" className="text-xs">
                        {song.difficulty}
                      </Badge>
                      <span className="text-xs text-muted-foreground">by {song.suggestedBy}</span>
                    </div>
                  </div>
                ))}
                <div className="text-center pt-2 text-sm text-muted-foreground">
                  Total duration: {jam.setlist.reduce((acc, song) => acc + (song.duration || 0), 0)}{' '}
                  minutes
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Equipment & Additional Info */}
      {(jam.equipment || jam.price) && (
        <Card>
          <CardHeader>
            <CardTitle>Additional Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {jam.equipment && (
              <div>
                <h4 className="mb-2">Available Equipment</h4>
                <div className="flex flex-wrap gap-2">
                  {jam.equipment.map((item) => (
                    <Badge key={item} variant="secondary">
                      {item}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            {jam.price && (
              <div>
                <h4 className="mb-2">Cost</h4>
                <p className="text-lg font-medium">${jam.price} per person</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Discussion */}
      <JamDiscussion
        jamId={jam.id}
        currentUser={currentUser}
        threads={jam.discussion || []}
        onAddThread={handleAddThread}
        onAddReply={handleAddReply}
        isHost={isHost}
        isParticipant={isParticipant}
      />
    </div>
  );
}
