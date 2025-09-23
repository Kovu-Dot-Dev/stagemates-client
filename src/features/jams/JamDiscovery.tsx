import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar';
import { Input } from '@/components/ui/Input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/Dialog';
import { Label } from '@/components/ui/Label';
import { Textarea } from '@/components/ui/Textarea';
import { Calendar, MapPin, Users, Clock, Plus, Filter, Search, ChevronRight } from 'lucide-react';
import type { MusicianProfile } from '@/api/profiles/services/types';
import type { JamSession, Song } from './JamDetails';
import { mockMusicianProfiles } from '@/api/profiles/services/mock';
import { Link } from 'react-router';

interface JamDiscoveryProps {
  currentUser?: MusicianProfile;
  onJoinJam?: (jam: JamSession) => void;
  onCreateJam?: (jam: Omit<JamSession, 'id' | 'host' | 'participants'>) => void;
  onViewJam?: (jam: JamSession) => void;
  onViewProfile?: (userId: string) => void;
}

export const mockJamSessions: JamSession[] = [
  {
    id: '1',
    title: 'Sunday Jazz Jam',
    description:
      "Relaxed jazz session in downtown. All skill levels welcome! We'll have a piano and drum kit available.",
    host: {
      id: 'host1',
      name: 'Marcus Williams',
      bio: '',
      location: 'Seattle, WA',
      instruments: ['Piano', 'Keyboard'],
      genres: ['Jazz'],
      skillLevel: 'Advanced',
      lookingFor: [],
      profileImage:
        'https://images.unsplash.com/photo-1681070907979-33fb54f56c53?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMG1hbiUyMG11c2ljaWFuJTIwcGlhbm98ZW58MXx8fHwxNzU4MDA3ODg1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    date: '2025-01-19',
    time: '14:00',
    location: 'Blue Note Cafe',
    address: '1234 Jazz Street, Seattle, WA 98101',
    maxParticipants: 6,
    currentParticipants: 3,
    genres: ['Jazz', 'Blues'],
    skillLevel: 'All Levels',
    type: 'open',
    participants: [
      {
        id: 'p1',
        name: 'Emma Thompson',
        bio: '',
        location: 'Seattle, WA',
        instruments: ['Saxophone'],
        genres: ['Jazz'],
        skillLevel: 'Intermediate',
        lookingFor: [],
        profileImage:
          'https://images.unsplash.com/photo-1755389176283-3cd924205df0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMHZpb2xpbmlzdCUyMG11c2ljaWFufGVufDF8fHx8MTc1ODAwODMyM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      },
      {
        id: 'p2',
        name: 'David Lee',
        bio: '',
        location: 'Seattle, WA',
        instruments: ['Drums'],
        genres: ['Jazz'],
        skillLevel: 'Advanced',
        lookingFor: [],
        profileImage:
          'https://images.unsplash.com/photo-1719043108436-2ec4f31f1d3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMGRydW1tZXIlMjBwZXJjdXNzaW9ufGVufDF8fHx8MTc1ODAwODIxMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      },
    ],
    setlist: [
      {
        id: 's1',
        title: 'Autumn Leaves',
        artist: 'Les Paul',
        genre: 'Jazz',
        difficulty: 'Medium',
        duration: 5,
        key: 'Gm',
        suggestedBy: 'Marcus Williams',
      },
      {
        id: 's2',
        title: 'Blue Bossa',
        artist: 'Kenny Dorham',
        genre: 'Jazz',
        difficulty: 'Medium',
        duration: 6,
        key: 'Cm',
        suggestedBy: 'Emma Thompson',
      },
    ],
    neededInstruments: ['Bass', 'Trumpet'],
    equipment: ['Piano', 'Drum Kit', 'PA System', 'Microphones'],
    price: 15,
    discussion: [
      {
        id: 't1',
        author: {
          id: 'host1',
          name: 'Marcus Williams',
          bio: '',
          location: 'Seattle, WA',
          instruments: ['Piano', 'Keyboard'],
          genres: ['Jazz'],
          skillLevel: 'Advanced',
          lookingFor: [],
          profileImage:
            'https://images.unsplash.com/photo-1681070907979-33fb54f56c53?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMG1hbiUyMG11c2ljaWFuJTIwcGlhbm98ZW58MXx8fHwxNzU4MDA3ODg1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        },
        content:
          'Hey everyone! Really excited for this session. The venue has a beautiful Steinway grand piano, so we should be able to get some amazing sounds. Looking forward to seeing what everyone brings to the table!',
        timestamp: '2025-01-18T10:30:00Z',
        replies: [
          {
            id: 'r1',
            author: {
              id: 'p1',
              name: 'Emma Thompson',
              bio: '',
              location: 'Seattle, WA',
              instruments: ['Saxophone'],
              genres: ['Jazz'],
              skillLevel: 'Intermediate',
              lookingFor: [],
              profileImage:
                'https://images.unsplash.com/photo-1755389176283-3cd924205df0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMHZpb2xpbmlzdCUyMG11c2ljaWFufGVufDF8fHx8MTc1ODAwODMyM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
            },
            content:
              "That sounds fantastic! I'll bring my tenor sax. Should I prepare anything specific for Autumn Leaves?",
            timestamp: '2025-01-18T11:15:00Z',
          },
        ],
      },
      {
        id: 't2',
        author: {
          id: 'p2',
          name: 'David Lee',
          bio: '',
          location: 'Seattle, WA',
          instruments: ['Drums'],
          genres: ['Jazz'],
          skillLevel: 'Advanced',
          lookingFor: [],
          profileImage:
            'https://images.unsplash.com/photo-1719043108436-2ec4f31f1d3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMGRydW1tZXIlMjBwZXJjdXNzaW9ufGVufDF8fHx8MTc1ODAwODIxMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        },
        content:
          'Quick question about parking - is there street parking available or should I look for a garage nearby?',
        timestamp: '2025-01-18T14:20:00Z',
        replies: [],
      },
    ],
  },
  {
    id: '2',
    title: 'Rock Band Practice',
    description:
      'Looking for a bassist and drummer to complete our indie rock band. We have original songs ready to jam!',
    host: {
      id: 'host2',
      name: 'Sarah Miller',
      bio: '',
      location: 'Austin, TX',
      instruments: ['Guitar', 'Vocals'],
      genres: ['Rock'],
      skillLevel: 'Intermediate',
      lookingFor: [],
      profileImage:
        'https://images.unsplash.com/photo-1588374481268-6cf95436cde2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZSUyMHdvbWFuJTIwc2luZ2VyJTIwc29uZ3dyaXRlcnxlbnwxfHx8fDE3NTgwMDgyMDd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    date: '2025-01-20',
    time: '19:00',
    location: 'Rehearsal Space',
    address: '5678 Music Row, Austin, TX 78701',
    maxParticipants: 4,
    currentParticipants: 2,
    genres: ['Rock', 'Indie', 'Alternative'],
    skillLevel: 'Intermediate',
    type: 'open',
    participants: [
      {
        id: 'p3',
        name: 'Mike Johnson',
        bio: '',
        location: 'Austin, TX',
        instruments: ['Guitar'],
        genres: ['Rock'],
        skillLevel: 'Intermediate',
        lookingFor: [],
        profileImage:
          'https://images.unsplash.com/photo-1594116558587-a9a952fe609a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMG11c2ljaWFuJTIwZ3VpdGFyaXN0fGVufDF8fHx8MTc1ODAwODIwNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      },
    ],
    setlist: [
      {
        id: 's3',
        title: 'Midnight City',
        artist: 'Original',
        genre: 'Indie Rock',
        difficulty: 'Hard',
        duration: 4,
        key: 'Em',
        suggestedBy: 'Sarah Miller',
      },
    ],
    neededInstruments: ['Bass', 'Drums'],
    equipment: ['Amplifiers', 'Microphones'],
    notes:
      'We have 3 original songs to work through. Looking for committed musicians for potential band formation.',
    discussion: [
      {
        id: 't3',
        author: {
          id: 'host2',
          name: 'Sarah Miller',
          bio: '',
          location: 'Austin, TX',
          instruments: ['Guitar', 'Vocals'],
          genres: ['Rock'],
          skillLevel: 'Intermediate',
          lookingFor: [],
          profileImage:
            'https://images.unsplash.com/photo-1588374481268-6cf95436cde2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZSUyMHdvbWFuJTIwc2luZ2VyJTIwc29uZ3dyaXRlcnxlbnwxfHx8fDE3NTgwMDgyMDd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        },
        content:
          "I can send chord charts and lyric sheets before the session if anyone's interested! Also, we're hoping to record a demo after a few practice sessions if the chemistry is right.",
        timestamp: '2025-01-19T09:45:00Z',
        replies: [],
      },
    ],
  },
  {
    id: '3',
    title: 'Acoustic Songwriting Circle',
    description:
      "Bring your original songs or covers! We'll share, collaborate, and maybe create something new together.",
    host: {
      id: 'host3',
      name: 'Jamie Foster',
      bio: '',
      location: 'Nashville, TN',
      instruments: ['Guitar', 'Vocals'],
      genres: ['Folk'],
      skillLevel: 'Intermediate',
      lookingFor: [],
      profileImage:
        'https://images.unsplash.com/photo-1645162711239-f4a4925d3cdd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMG11c2ljaWFuJTIwa2V5Ym9hcmQlMjBwcm9kdWNlcnxlbnwxfHx8fDE3NTgwMDgyMTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    date: '2025-01-21',
    time: '18:30',
    location: 'Community Center',
    address: '910 Music Valley Dr, Nashville, TN 37214',
    maxParticipants: 8,
    currentParticipants: 5,
    genres: ['Folk', 'Indie', 'Country'],
    skillLevel: 'All Levels',
    type: 'open',
    participants: [
      {
        id: 'p4',
        name: 'Alex Rivera',
        bio: '',
        location: 'Nashville, TN',
        instruments: ['Mandolin'],
        genres: ['Folk'],
        skillLevel: 'Intermediate',
        lookingFor: [],
      },
      {
        id: 'p5',
        name: 'Kelly Smith',
        bio: '',
        location: 'Nashville, TN',
        instruments: ['Violin'],
        genres: ['Folk'],
        skillLevel: 'Advanced',
        lookingFor: [],
      },
      {
        id: 'p6',
        name: 'Ryan Davis',
        bio: '',
        location: 'Nashville, TN',
        instruments: ['Harmonica'],
        genres: ['Folk'],
        skillLevel: 'Beginner',
        lookingFor: [],
      },
      {
        id: 'p7',
        name: 'Taylor Wilson',
        bio: '',
        location: 'Nashville, TN',
        instruments: ['Bass'],
        genres: ['Folk'],
        skillLevel: 'Intermediate',
        lookingFor: [],
      },
    ],
    setlist: [],
    neededInstruments: ['Banjo', 'Cajon'],
    equipment: ['Acoustic Amplifier', 'Microphones'],
    notes: "Bring your own acoustic instruments. We'll have coffee and snacks available.",
    discussion: [],
  },
];

export function JamDiscovery({
  currentUser = mockMusicianProfiles[0],
  onJoinJam = () => {},
  onCreateJam = () => {},
  onViewJam = () => {},
  onViewProfile = () => {},
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
          <Link to={`/events/${jam.id}`} key={jam.id} className="block">
            <Card
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
                      <Avatar className="w-6 h-6 mr-2">
                        <AvatarImage src={jam.host.profileImage} />
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
                      onJoinJam(jam);
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
