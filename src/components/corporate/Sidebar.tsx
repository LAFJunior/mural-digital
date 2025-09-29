import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Users, Calendar, Award } from 'lucide-react';

const Sidebar = () => {
  const companyStats = [
    { label: 'Funcionários Ativos', value: '1.2K', icon: Users, color: 'text-blue-600' },
    { label: 'Posts Hoje', value: '47', icon: TrendingUp, color: 'text-green-600' },
    { label: 'Eventos', value: '3', icon: Calendar, color: 'text-purple-600' },
  ];

  const trending = [
    { tag: '#NovaFilial', posts: 23 },
    { tag: '#InnovateTech', posts: 18 },
    { tag: '#TeamBuilding', posts: 15 },
    { tag: '#Sustentabilidade', posts: 12 },
  ];

  const achievements = [
    { title: 'Melhor Performance', department: 'TI', date: 'Ontem' },
    { title: 'Meta Alcançada', department: 'Vendas', date: '2 dias' },
    { title: 'Inovação do Mês', department: 'P&D', date: '1 semana' },
  ];

  return (
    <aside className="w-80 space-y-6 p-6">
      {/* Company Stats */}
      <Card className="post-card">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Estatísticas da Empresa
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {companyStats.map((stat, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center gap-3">
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
                <span className="text-sm font-medium">{stat.label}</span>
              </div>
              <span className="text-lg font-bold text-primary">{stat.value}</span>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Trending Topics */}
      <Card className="post-card">
        <CardHeader>
          <CardTitle className="text-lg">Trending</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {trending.map((trend, index) => (
            <div key={index} className="flex items-center justify-between hover:bg-muted/30 p-2 rounded-lg cursor-pointer transition-colors">
              <span className="text-sm font-medium text-primary">{trend.tag}</span>
              <Badge variant="secondary" className="text-xs">
                {trend.posts} posts
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Recent Achievements */}
      <Card className="post-card">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Award className="h-5 w-5 text-yellow-500" />
            Conquistas Recentes
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {achievements.map((achievement, index) => (
            <div key={index} className="p-3 bg-accent/30 rounded-lg">
              <h4 className="text-sm font-semibold text-foreground">{achievement.title}</h4>
              <p className="text-xs text-muted-foreground">{achievement.department}</p>
              <span className="text-xs text-primary">{achievement.date}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </aside>
  );
};

export default Sidebar;