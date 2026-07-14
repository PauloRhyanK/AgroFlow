import { Delete } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CustomNumpadProps {
  value: string;
  onChange: (value: string) => void;
}

export default function CustomNumpad({ value, onChange }: CustomNumpadProps) {
  const press = (digit: string) => onChange(value + digit);
  const backspace = () => onChange(value.slice(0, -1));
  const clear = () => onChange('');

  const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'clear', '0', 'back'];

  return (
    <div className="w-full">
      <div className="h-20 rounded-xl bg-muted flex items-center justify-center mb-4">
        <span className="text-5xl font-bold text-foreground tabular-nums">
          {value || '0'}
        </span>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {keys.map(key => {
          if (key === 'clear') {
            return (
              <Button
                key={key}
                variant="outline"
                className="h-16 text-lg font-semibold touch-manipulation rounded-xl"
                onClick={clear}
              >
                C
              </Button>
            );
          }
          if (key === 'back') {
            return (
              <Button
                key={key}
                variant="outline"
                className="h-16 text-lg font-semibold touch-manipulation rounded-xl"
                onClick={backspace}
              >
                <Delete className="h-6 w-6" />
              </Button>
            );
          }
          return (
            <Button
              key={key}
              variant="outline"
              className="h-16 text-2xl font-bold touch-manipulation rounded-xl"
              onClick={() => press(key)}
            >
              {key}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
