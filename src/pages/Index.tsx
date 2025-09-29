import { useState, useMemo } from 'react';
import Header from '@/components/corporate/Header';
import Sidebar from '@/components/corporate/Sidebar';
import PostCard from '@/components/corporate/PostCard';
import CreatePost from '@/components/corporate/CreatePost';
import FilterTabs from '@/components/corporate/FilterTabs';
import { mockPosts } from '@/data/mockPosts';
import heroBanner from '@/assets/hero-banner.jpg';

const Index = () => {
  const [posts, setPosts] = useState(mockPosts);
  const [activeFilter, setActiveFilter] = useState('todos');

  const addPost = (newPost: any) => {
    const post = {
      id: Date.now().toString(),
      author: {
        name: newPost.autor,
        role: 'Funcionário',
        department: 'Geral',
        avatar: '/src/assets/avatar-placeholder.jpg'
      },
      content: `${newPost.titulo}\n\n${newPost.content}`,
      likes: 0,
      comments: 0,
      timestamp: 'agora',
      tags: [],
      category: newPost.tipo,
      isPinned: false
    };
    setPosts(prev => [post, ...prev]);
  };

  const handlePinPost = (postId: string) => {
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { ...post, isPinned: !(post as any).isPinned }
        : post
    ));
  };

  const filteredPosts = useMemo(() => {
    let filtered = activeFilter === 'todos' ? posts : posts.filter(post => post.category === activeFilter);
    // Sort pinned posts to the top
    return filtered.sort((a, b) => {
      if ((a as any).isPinned && !(b as any).isPinned) return -1;
      if (!(a as any).isPinned && (b as any).isPinned) return 1;
      return 0;
    });
  }, [posts, activeFilter]);

  const postCounts = useMemo(() => {
    const counts = {
      todos: posts.length,
      comunicacao: posts.filter(p => p.category === 'comunicacao').length,
      celebracao: posts.filter(p => p.category === 'celebracao').length,
      evento: posts.filter(p => p.category === 'evento').length,
      campanha: posts.filter(p => p.category === 'campanha').length,
    };
    return counts;
  }, [posts]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      <Header />
      
      {/* Hero Banner */}
      <div className="relative h-64 overflow-hidden">
        <img 
          src={heroBanner} 
          alt="Corporate Banner" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary-hover/90 flex items-center justify-center">
          <div className="text-center text-primary-foreground fade-in">
            <h1 className="text-4xl font-bold mb-2">Mural Digital Corporativo</h1>
            <p className="text-xl opacity-90">Conectando nossa equipe, compartilhando sucessos</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex gap-8 justify-center">
          {/* Main Feed */}
          <main className="w-full max-w-2xl space-y-6">
            <CreatePost onPostCreated={addPost} />
            
            <FilterTabs 
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
              postCounts={postCounts}
            />
            
            <div className="space-y-6">
              {filteredPosts.map((post, index) => (
                <div 
                  key={post.id} 
                  className="slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <PostCard post={post} onPin={handlePinPost} />
                </div>
              ))}
            </div>
          </main>

          {/* Sidebar */}
          <Sidebar />
        </div>
      </div>
    </div>
  );
};

export default Index;
