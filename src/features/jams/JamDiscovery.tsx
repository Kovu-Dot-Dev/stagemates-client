import { Calendar, ChevronRight, Clock, Filter, MapPin, Plus, Search, Users } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router';

import { mockJamSessions } from '@/api/jams/services/mock';
import type { JamSession, SetListSong } from '@/api/jams/services/types';
import { mockMusicianProfiles } from '@/api/profiles/services/mock';
import type { MusicianProfile } from '@/api/profiles/services/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';
import { Textarea } from '@/components/ui/Textarea';

interface JamDiscoveryProps {
  currentUser?: MusicianProfile;
  onCreateJam?: (jam: Omit<JamSession, 'id' | 'host' | 'participants'>) => void;
}

export function JamDiscovery({
  currentUser = mockMusicianProfiles[0],
  onCreateJam = () => {},
}: JamDiscoveryProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterGenre, setFilterGenre] = useState<string>('');
  const [filterDate, setFilterDate] = useState<string>('');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newJam, setNewJam] = useState<Partial<JamSession>>({
    genres: [],
    type: 'open',
    maxParticipants: 4,
  });

  const filteredJams = mockJamSessions.filter((jam) => {
    const matchesSearch =
      jam.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      jam.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGenre = !filterGenre || jam.genres.includes(filterGenre);
    const matchesDate = !filterDate || jam.date === filterDate;

    return matchesSearch && matchesGenre && matchesDate;
  });

  const handleCreateJam = () => {
    if (newJam.title && newJam.date && newJam.time && newJam.location) {
      onCreateJam({
        title: newJam.title,
        description: newJam.description || '',
        date: newJam.date,
        time: newJam.time,
        location: newJam.location,
        maxParticipants: newJam.maxParticipants || 4,
        currentParticipants: 1,
        genres: newJam.genres || [],
        skillLevel: newJam.skillLevel || 'All Levels',
        type: newJam.type || 'open',
        setlist: [],
        neededInstruments: [],
      });
      setIsCreateDialogOpen(false);
      setNewJam({ genres: [], type: 'open', maxParticipants: 4 });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      {/* Header with Search and Create */}
      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <h1>Discover Jam Sessions</h1>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Create Jam
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Create New Jam Session</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="jam-title">Session Title</Label>
                  <Input
                    id="jam-title"
                    value={newJam.title || ''}
                    onChange={(e) => setNewJam((prev) => ({ ...prev, title: e.target.value }))}
                    placeholder="Sunday Jazz Jam"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="jam-description">Description</Label>
                  <Textarea
                    id="jam-description"
                    value={newJam.description || ''}
                    onChange={(e) =>
                      setNewJam((prev) => ({ ...prev, description: e.target.value }))
                    }
                    placeholder="Tell musicians what to expect..."
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="jam-date">Date</Label>
                    <Input
                      id="jam-date"
                      type="date"
                      value={newJam.date || ''}
                      onChange={(e) => setNewJam((prev) => ({ ...prev, date: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="jam-time">Time</Label>
                    <Input
                      id="jam-time"
                      type="time"
                      value={newJam.time || ''}
                      onChange={(e) => setNewJam((prev) => ({ ...prev, time: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="jam-location">Location</Label>
                  <Input
                    id="jam-location"
                    value={newJam.location || ''}
                    onChange={(e) => setNewJam((prev) => ({ ...prev, location: e.target.value }))}
                    placeholder="Venue name and address"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="jam-participants">Max Participants</Label>
                    <Input
                      id="jam-participants"
                      type="number"
                      min="2"
                      max="20"
                      value={newJam.maxParticipants || 4}
                      onChange={(e) =>
                        setNewJam((prev) => ({
                          ...prev,
                          maxParticipants: parseInt(e.target.value),
                        }))
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="jam-skill">Skill Level</Label>
                    <Select
                      value={newJam.skillLevel}
                      onValueChange={(value) =>
                        setNewJam((prev) => ({ ...prev, skillLevel: value }))
                      }>
                      <SelectTrigger>
                        <SelectValue placeholder="All Levels" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="All Levels">All Levels</SelectItem>
                        <SelectItem value="Beginner">Beginner</SelectItem>
                        <SelectItem value="Intermediate">Intermediate</SelectItem>
                        <SelectItem value="Advanced">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button onClick={handleCreateJam} className="w-full">
                  Create Jam Session
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search jam sessions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Select
              value={filterGenre || 'all'}
              onValueChange={(value) => setFilterGenre(value === 'all' ? '' : value)}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="All Genres" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Genres</SelectItem>
                <SelectItem value="Jazz">Jazz</SelectItem>
                <SelectItem value="Rock">Rock</SelectItem>
                <SelectItem value="Folk">Folk</SelectItem>
                <SelectItem value="Blues">Blues</SelectItem>
                <SelectItem value="Indie">Indie</SelectItem>
              </SelectContent>
            </Select>
            <Input
              type="date"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className="w-[160px]"
            />
          </div>
        </div>
      </div>

      {/* Jam Sessions List */}
      <div className="grid gap-4">
        {filteredJams.map((jam) => (
          <Link to={`/jams/${jam.id}`} key={jam.id} className="block">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{jam.title}</CardTitle>
                      <ChevronRight className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground mt-1">
                      <Avatar className="w-6 h-6 mr-2">
                        <AvatarImage src={jam.host.image} />
                        <AvatarFallback className="text-xs">
                          {jam.host.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      Hosted by {jam.host.name}
                    </div>
                  </div>
                  <Badge variant={jam.type === 'open' ? 'default' : 'secondary'}>
                    {jam.type === 'open' ? 'Open' : 'Private'}
                  </Badge>
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
                    {jam.setlist.length > 0 && ` • ${jam.setlist.length} songs planned`}
                  </div>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    disabled={jam.currentParticipants >= jam.maxParticipants}
                    size="sm">
                    {jam.currentParticipants >= jam.maxParticipants ? 'Full' : 'Join'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}

        {filteredJams.length === 0 && (
          <Card className="p-8 text-center">
            <Users className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="mb-2">No jam sessions found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search filters or create a new jam session.
            </p>
            <Button onClick={() => setIsCreateDialogOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Create Your First Jam
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
}
