import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ImageIcon, Smile, Hash, Send, Video, Link2, X } from 'lucide-react';
import avatarPlaceholder from '@/assets/avatar-placeholder.jpg';

const CreatePost = () => {
  const [content, setContent] = useState('');
  const [attachments, setAttachments] = useState<Array<{ type: 'image' | 'video' | 'link', url: string, name?: string }>>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      console.log('Novo post:', { content, attachments });
      setContent('');
      setAttachments([]);
      // Aqui seria feita a integração com o backend
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        const url = URL.createObjectURL(file);
        const type = file.type.startsWith('image/') ? 'image' : 'video';
        setAttachments(prev => [...prev, { type, url, name: file.name }]);
      });
    }
  };

  const handleAddLink = () => {
    const url = prompt('Digite o link:');
    if (url) {
      setAttachments(prev => [...prev, { type: 'link', url }]);
    }
  };

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
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

          {/* Attachments Preview */}
          {attachments.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4">
              {attachments.map((attachment, index) => (
                <div key={index} className="relative group">
                  {attachment.type === 'image' && (
                    <div className="relative">
                      <img src={attachment.url} alt={attachment.name} className="w-full h-24 object-cover rounded-lg" />
                      <Button
                        type="button"
                        size="icon"
                        variant="destructive"
                        className="absolute -top-2 -right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => removeAttachment(index)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  )}
                  {attachment.type === 'video' && (
                    <div className="relative">
                      <video src={attachment.url} className="w-full h-24 object-cover rounded-lg" />
                      <Video className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-6 w-6 text-white" />
                      <Button
                        type="button"
                        size="icon"
                        variant="destructive"
                        className="absolute -top-2 -right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => removeAttachment(index)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  )}
                  {attachment.type === 'link' && (
                    <div className="relative p-3 bg-muted rounded-lg">
                      <Link2 className="h-4 w-4 mb-1" />
                      <p className="text-xs truncate">{attachment.url}</p>
                      <Button
                        type="button"
                        size="icon"
                        variant="destructive"
                        className="absolute -top-2 -right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => removeAttachment(index)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <input
                type="file"
                accept="image/*,video/*"
                multiple
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
              />
              <Button type="button" variant="ghost" size="sm" className="text-muted-foreground hover:text-primary" onClick={() => document.getElementById('file-upload')?.click()}>
                <ImageIcon className="h-4 w-4 mr-2" />
                Mídia
              </Button>
              <Button type="button" variant="ghost" size="sm" className="text-muted-foreground hover:text-primary" onClick={handleAddLink}>
                <Link2 className="h-4 w-4 mr-2" />
                Link
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