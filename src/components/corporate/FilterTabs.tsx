import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface FilterTabsProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  postCounts: Record<string, number>;
}

const FilterTabs = ({ activeFilter, onFilterChange, postCounts }: FilterTabsProps) => {
  const filters = [
    { id: 'todos', label: 'Todos', count: postCounts.todos || 0 },
    { id: 'comunicacao', label: 'Comunicação', count: postCounts.comunicacao || 0 },
    { id: 'celebracao', label: 'Celebração', count: postCounts.celebracao || 0 },
    { id: 'evento', label: 'Evento', count: postCounts.evento || 0 },
    { id: 'campanha', label: 'Campanha', count: postCounts.campanha || 0 }
  ];

  return (
    <div className="flex flex-wrap gap-2 mb-6 p-4 bg-card rounded-xl border border-border/50">
      {filters.map((filter) => (
        <Button
          key={filter.id}
          variant={activeFilter === filter.id ? "default" : "ghost"}
          size="sm"
          onClick={() => onFilterChange(filter.id)}
          className="flex items-center space-x-2"
        >
          <span>{filter.label}</span>
          <Badge variant="secondary" className="text-xs ml-1">
            {filter.count}
          </Badge>
        </Button>
      ))}
    </div>
  );
};

export default FilterTabs;