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
  return;
};
export default Sidebar;