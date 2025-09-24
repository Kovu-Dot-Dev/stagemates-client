import { MessageCircle, Reply, Send } from 'lucide-react';
import { useState } from 'react';

import type { DiscussionThread } from '@/api/jams/services/types';
import type { MusicianProfile } from '@/api/profiles/services/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Textarea } from '@/components/ui/Textarea';

interface JamDiscussionProps {
  jamId: string;
  currentUser: MusicianProfile;
  threads: DiscussionThread[];
  onAddThread: (content: string) => void;
  onAddReply: (threadId: string, content: string) => void;
  isHost: boolean;
  isParticipant: boolean;
}

export function JamDiscussion({
  jamId,
  currentUser,
  threads,
  onAddThread,
  onAddReply,
  isHost,
  isParticipant,
}: JamDiscussionProps) {
  const [newThreadContent, setNewThreadContent] = useState('');
  const [replyContent, setReplyContent] = useState<{ [threadId: string]: string }>({});
  const [showReplyFor, setShowReplyFor] = useState<string | null>(null);

  const canPost = isHost || isParticipant;

  const handleAddThread = () => {
    if (newThreadContent.trim() && canPost) {
      onAddThread(newThreadContent.trim());
      setNewThreadContent('');
    }
  };

  const handleAddReply = (threadId: string) => {
    const content = replyContent[threadId];
    if (content?.trim() && canPost) {
      onAddReply(threadId, content.trim());
      setReplyContent((prev) => ({ ...prev, [threadId]: '' }));
      setShowReplyFor(null);
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays > 0) {
      return `${diffDays}d ago`;
    } else if (diffHours > 0) {
      return `${diffHours}h ago`;
    } else {
      const diffMinutes = Math.floor(diffMs / (1000 * 60));
      return diffMinutes > 0 ? `${diffMinutes}m ago` : 'Just now';
    }
  };

  const getUserRole = (userId: string) => {
    if (userId === currentUser.id) return 'You';
    // In a real app, you'd check if the user is the jam host
    return '';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <MessageCircle className="w-5 h-5" />
          <span>Discussion ({threads.length})</span>
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Open discussion for all participants - ask questions, share updates, and coordinate
          details
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* New Thread Form */}
        {canPost && (
          <div className="space-y-3 p-4 bg-muted/30 rounded-lg">
            <div className="flex items-center space-x-2">
              <Avatar className="w-8 h-8">
                <AvatarImage src={currentUser.profileImage} />
                <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <span className="font-medium">{currentUser.name}</span>
              {isHost && (
                <Badge variant="default" className="text-xs">
                  Host
                </Badge>
              )}
            </div>
            <Textarea
              value={newThreadContent}
              onChange={(e) => setNewThreadContent(e.target.value)}
              placeholder="Start a discussion, ask a question, or share an update..."
              rows={3}
            />
            <div className="flex justify-end">
              <Button onClick={handleAddThread} disabled={!newThreadContent.trim()} size="sm">
                <Send className="w-4 h-4 mr-2" />
                Post
              </Button>
            </div>
          </div>
        )}

        {!canPost && (
          <div className="p-4 bg-muted/30 rounded-lg text-center">
            <p className="text-sm text-muted-foreground">
              Join this jam session to participate in the discussion
            </p>
          </div>
        )}

        {/* Threads */}
        <div className="space-y-6">
          {threads.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <MessageCircle className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p>No discussions yet</p>
              <p className="text-sm">Be the first to start a conversation!</p>
            </div>
          ) : (
            threads.map((thread) => (
              <div key={thread.id} className="space-y-3">
                {/* Main Thread */}
                <div className="flex space-x-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={thread.author.profileImage} />
                    <AvatarFallback>{thread.author.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{thread.author.name}</span>
                      {thread.author.id === currentUser.id && (
                        <Badge variant="outline" className="text-xs">
                          You
                        </Badge>
                      )}
                      <span className="text-sm text-muted-foreground">
                        {formatTimestamp(thread.timestamp)}
                      </span>
                    </div>
                    <div className="bg-muted/50 rounded-lg p-3">
                      <p className="text-sm whitespace-pre-wrap">{thread.content}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      {canPost && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            setShowReplyFor(showReplyFor === thread.id ? null : thread.id)
                          }>
                          <Reply className="w-4 h-4 mr-1" />
                          Reply
                        </Button>
                      )}
                      {thread.replies.length > 0 && (
                        <span className="text-sm text-muted-foreground">
                          {thread.replies.length}{' '}
                          {thread.replies.length === 1 ? 'reply' : 'replies'}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Replies */}
                {thread.replies.length > 0 && (
                  <div className="ml-13 space-y-3 border-l-2 border-muted pl-4">
                    {thread.replies.map((reply) => (
                      <div key={reply.id} className="flex space-x-3">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={reply.author.profileImage} />
                          <AvatarFallback>{reply.author.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center space-x-2">
                            <span className="font-medium">{reply.author.name}</span>
                            {reply.author.id === currentUser.id && (
                              <Badge variant="outline" className="text-xs">
                                You
                              </Badge>
                            )}
                            <span className="text-sm text-muted-foreground">
                              {formatTimestamp(reply.timestamp)}
                            </span>
                          </div>
                          <div className="bg-muted/30 rounded-lg p-3">
                            <p className="text-sm whitespace-pre-wrap">{reply.content}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Reply Form */}
                {showReplyFor === thread.id && canPost && (
                  <div className="ml-13 space-y-3 border-l-2 border-muted pl-4">
                    <div className="flex space-x-3">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={currentUser.profileImage} />
                        <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">{currentUser.name}</span>
                          {isHost && (
                            <Badge variant="default" className="text-xs">
                              Host
                            </Badge>
                          )}
                        </div>
                        <Textarea
                          value={replyContent[thread.id] || ''}
                          onChange={(e) =>
                            setReplyContent((prev) => ({
                              ...prev,
                              [thread.id]: e.target.value,
                            }))
                          }
                          placeholder="Write a reply..."
                          rows={2}
                        />
                        <div className="flex justify-end space-x-2">
                          <Button variant="outline" size="sm" onClick={() => setShowReplyFor(null)}>
                            Cancel
                          </Button>
                          <Button
                            onClick={() => handleAddReply(thread.id)}
                            disabled={!replyContent[thread.id]?.trim()}
                            size="sm">
                            Reply
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
