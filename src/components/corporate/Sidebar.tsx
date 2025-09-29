import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Users, Calendar, Award } from 'lucide-react';
const Sidebar = () => {
  const companyStats = [{
    label: 'Funcionários Ativos',
    value: '1.2K',
    icon: Users,
    color: 'text-blue-600'
  }, {
    label: 'Posts Hoje',
    value: '47',
    icon: TrendingUp,
    color: 'text-green-600'
  }, {
    label: 'Eventos',
    value: '3',
    icon: Calendar,
    color: 'text-purple-600'
  }];
  const trending = [{
    tag: '#NovaFilial',
    posts: 23
  }, {
    tag: '#InnovateTech',
    posts: 18
  }, {
    tag: '#TeamBuilding',
    posts: 15
  }, {
    tag: '#Sustentabilidade',
    posts: 12
  }];
  const achievements = [{
    title: 'Melhor Performance',
    department: 'TI',
    date: 'Ontem'
  }, {
    title: 'Meta Alcançada',
    department: 'Vendas',
    date: '2 dias'
  }, {
    title: 'Inovação do Mês',
    department: 'P&D',
    date: '1 semana'
  }];
  return (
    <div className="space-y-6">
      {/* Company Stats */}
      <Card className="post-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Estatísticas</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {companyStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Icon className={`h-5 w-5 ${stat.color}`} />
                  <span className="text-sm text-muted-foreground">{stat.label}</span>
                </div>
                <span className="text-lg font-semibold">{stat.value}</span>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Trending Topics */}
      <Card className="post-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Trending</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {trending.map((topic, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="text-sm font-medium text-primary hover:underline cursor-pointer">
                {topic.tag}
              </span>
              <Badge variant="secondary" className="text-xs">
                {topic.posts}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Recent Achievements */}
      <Card className="post-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center">
            <Award className="h-5 w-5 mr-2 text-yellow-600" />
            Conquistas
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {achievements.map((achievement, index) => (
            <div key={index} className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{achievement.title}</span>
                <span className="text-xs text-muted-foreground">{achievement.date}</span>
              </div>
              <p className="text-xs text-muted-foreground">{achievement.department}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};
export default Sidebar;