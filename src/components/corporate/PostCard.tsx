import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Heart, MessageCircle, MoreHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PostCardProps {
  post: {
    id: string;
    author: {
      name: string;
      role: string;
      department: string;
      avatar: string;
    };
    content: string;
    image?: string;
    attachments?: Array<{ type: 'image' | 'video' | 'link', url: string, name?: string }>;
    likes: number;
    comments: number;
    timestamp: string;
    tags?: string[];
    category?: string;
  };
}

const PostCard = ({ post }: PostCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  return (
    <Card className="post-card fade-in hover:shadow-[var(--shadow-hover)] transition-all duration-300">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="h-12 w-12 avatar-ring">
              <AvatarImage src={post.author.avatar} alt={post.author.name} />
              <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                {post.author.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground">{post.author.name}</h3>
              <p className="text-sm text-muted-foreground">{post.author.role}</p>
              <Badge variant="outline" className="text-xs mt-1 bg-primary-light text-primary border-primary/20">
                {post.author.department}
              </Badge>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-xs text-muted-foreground">{post.timestamp}</span>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Post Content */}
        <p className="text-foreground leading-relaxed">{post.content}</p>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-xs bg-accent text-accent-foreground hover:bg-primary hover:text-primary-foreground cursor-pointer transition-colors">
                #{tag}
              </Badge>
            ))}
          </div>
        )}

        {/* Post Image */}
        {post.image && (
          <div className="rounded-xl overflow-hidden bg-muted/30">
            <img 
              src={post.image} 
              alt="Post content" 
              className="w-full h-64 object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
        )}

        {/* Post Attachments */}
        {post.attachments && post.attachments.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {post.attachments.map((attachment, index) => (
              <div key={index} className="rounded-xl overflow-hidden bg-muted/30">
                {attachment.type === 'image' && (
                  <img 
                    src={attachment.url} 
                    alt={attachment.name || 'Attachment'} 
                    className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500"
                  />
                )}
                {attachment.type === 'video' && (
                  <video 
                    src={attachment.url} 
                    controls 
                    className="w-full h-48 object-cover"
                  />
                )}
                {attachment.type === 'link' && (
                  <a 
                    href={attachment.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block p-4 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">Link externo</p>
                        <p className="text-xs text-muted-foreground truncate">{attachment.url}</p>
                      </div>
                    </div>
                  </a>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-border/50">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLike}
              className={cn(
                "flex items-center space-x-2 hover:bg-red-50 hover:text-red-600 transition-colors",
                isLiked && "text-red-600 bg-red-50"
              )}
            >
              <Heart className={cn("h-4 w-4", isLiked && "fill-current")} />
              <span className="text-sm font-medium">{likesCount}</span>
            </Button>

            <Button variant="ghost" size="sm" className="flex items-center space-x-2 hover:bg-blue-50 hover:text-blue-600">
              <MessageCircle className="h-4 w-4" />
              <span className="text-sm font-medium">{post.comments} respostas</span>
            </Button>
          </div>

          <Button variant="ghost" size="sm" className="flex items-center space-x-2 hover:bg-blue-50 hover:text-blue-600">
            <MessageCircle className="h-4 w-4" />
            <span className="text-sm">Comentar</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PostCard;