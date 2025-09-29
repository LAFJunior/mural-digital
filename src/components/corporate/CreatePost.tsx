import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ImageIcon, Smile, Hash, Send } from 'lucide-react';
import avatarPlaceholder from '@/assets/avatar-placeholder.jpg';

const CreatePost = () => {
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      console.log('Novo post:', content);
      setContent('');
      // Aqui seria feita a integração com o backend
    }
  };

  return (
    <Card className="post-card mb-6">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg">Compartilhe uma atualização</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex space-x-3">
            <Avatar className="h-12 w-12 avatar-ring">
              <AvatarImage src={avatarPlaceholder} alt="Você" />
              <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                VC
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <Textarea
                placeholder="O que está acontecendo na empresa hoje?"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="min-h-[100px] resize-none border-0 bg-muted/30 focus:bg-card transition-colors"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Button type="button" variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                <ImageIcon className="h-4 w-4 mr-2" />
                Foto
              </Button>
              <Button type="button" variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                <Smile className="h-4 w-4 mr-2" />
                Emoji
              </Button>
              <Button type="button" variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                <Hash className="h-4 w-4 mr-2" />
                Tag
              </Button>
            </div>

            <Button 
              type="submit" 
              className="btn-primary"
              disabled={!content.trim()}
            >
              <Send className="h-4 w-4 mr-2" />
              Publicar
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default CreatePost;