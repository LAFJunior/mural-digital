import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ImageIcon, Send, Video, Link2, X } from 'lucide-react';
import avatarPlaceholder from '@/assets/avatar-placeholder.jpg';

const CreatePost = () => {
  const [tipo, setTipo] = useState('');
  const [autor, setAutor] = useState('');
  const [titulo, setTitulo] = useState('');
  const [content, setContent] = useState('');
  const [attachments, setAttachments] = useState<Array<{ type: 'image' | 'video' | 'link', url: string, name?: string }>>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim() && tipo && autor && titulo) {
      console.log('Novo post:', { tipo, autor, titulo, content, attachments });
      setTipo('');
      setAutor('');
      setTitulo('');
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
        <CardTitle className="text-lg">Nova Publicação</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="tipo">Tipo</Label>
              <Select value={tipo} onValueChange={setTipo}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="celebracao">Celebração</SelectItem>
                  <SelectItem value="comunicacao">Comunicação</SelectItem>
                  <SelectItem value="evento">Evento</SelectItem>
                  <SelectItem value="campanha">Campanha</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="autor">Autor</Label>
              <Input
                id="autor"
                placeholder="Nome do autor"
                value={autor}
                onChange={(e) => setAutor(e.target.value)}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="titulo">Título</Label>
            <Input
              id="titulo"
              placeholder="Título da publicação"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="conteudo">Conteúdo</Label>
            <Textarea
              id="conteudo"
              placeholder="Escreva o conteúdo da publicação..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[120px] resize-none"
            />
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
            </div>

            <Button 
              type="submit" 
              className="btn-primary"
              disabled={!content.trim() || !tipo || !autor || !titulo}
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