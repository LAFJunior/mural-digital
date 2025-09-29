export const mockPosts = [
  {
    id: '1',
    author: {
      name: 'Ana Silva',
      role: 'Gerente de Marketing',
      department: 'Marketing',
      avatar: '/src/assets/avatar-placeholder.jpg'
    },
    content: 'Parabéns à equipe de desenvolvimento pelo lançamento bem-sucedido da nova plataforma! 🚀 O feedback dos clientes tem sido extraordinário. #InovaçãoTech #Sucesso',
    likes: 45,
    comments: 12,
    timestamp: '2h',
    tags: ['InovaçãoTech', 'Sucesso', 'Equipe'],
    category: 'comunicacao'
  },
  {
    id: '2',
    author: {
      name: 'Carlos Mendes',
      role: 'Diretor de RH',
      department: 'Recursos Humanos',
      avatar: '/src/assets/avatar-placeholder.jpg'
    },
    content: 'Hoje tivemos nossa primeira sessão de bem-estar corporativo! Foi incrível ver a participação de todos os departamentos. Cuidar do nosso time é sempre prioridade. 💙',
    image: '/src/assets/hero-banner.jpg',
    likes: 78,
    comments: 24,
    timestamp: '4h',
    tags: ['BemEstar', 'TeamBuilding', 'SaúdeMental'],
    category: 'evento'
  },
  {
    id: '3',
    author: {
      name: 'Marina Costa',
      role: 'Analista de Vendas',
      department: 'Comercial',
      avatar: '/src/assets/avatar-placeholder.jpg'
    },
    content: 'Superamos nossa meta mensal em 120%! 📈 Obrigada a todos os colegas que colaboraram para esse resultado incrível. Juntos somos mais fortes!',
    likes: 89,
    comments: 18,
    timestamp: '6h',
    tags: ['MetaAlcançada', 'Vendas', 'Equipe'],
    category: 'celebracao'
  },
  {
    id: '4',
    author: {
      name: 'Roberto Oliveira',
      role: 'Tech Lead',
      department: 'Tecnologia',
      avatar: '/src/assets/avatar-placeholder.jpg'
    },
    content: 'Acabamos de implementar o novo sistema de CI/CD que vai acelerar nossos deploys em 60%. A automação está revolucionando nosso workflow! ⚡',
    likes: 56,
    comments: 9,
    timestamp: '1d',
    tags: ['Tecnologia', 'Automação', 'DevOps'],
    category: 'comunicacao'
  },
  {
    id: '5',
    author: {
      name: 'Juliana Santos',
      role: 'Coordenadora de Projetos',
      department: 'Gestão',
      avatar: '/src/assets/avatar-placeholder.jpg'
    },
    content: 'Nosso novo escritório sustentável está quase pronto! 🌱 Painéis solares, sistema de reuso de água e jardim vertical. Orgulhosa de trabalhar numa empresa que valoriza o meio ambiente.',
    image: '/src/assets/hero-banner.jpg',
    likes: 124,
    comments: 31,
    timestamp: '1d',
    tags: ['Sustentabilidade', 'NovaFilial', 'MeioAmbiente'],
    category: 'campanha'
  }
];