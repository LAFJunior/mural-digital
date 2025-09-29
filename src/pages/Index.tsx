import { useState } from 'react';
import Header from '@/components/corporate/Header';
import Sidebar from '@/components/corporate/Sidebar';
import PostCard from '@/components/corporate/PostCard';
import CreatePost from '@/components/corporate/CreatePost';
import { mockPosts } from '@/data/mockPosts';
import heroBanner from '@/assets/hero-banner.jpg';

const Index = () => {
  const [posts] = useState(mockPosts);

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

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Main Feed */}
          <main className="flex-1 max-w-2xl space-y-6">
            <CreatePost />
            
            <div className="space-y-6">
              {posts.map((post, index) => (
                <div 
                  key={post.id} 
                  className="slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <PostCard post={post} />
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
