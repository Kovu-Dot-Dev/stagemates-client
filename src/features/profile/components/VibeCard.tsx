import { useState } from 'react';
import { Text } from '@/components/ui/Text';
import type { Vibe } from '@/api/profiles/services/types';

export const VibeCard: React.FC<Vibe> = ({ question, answer }) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="h-40 perspective cursor-pointer" onClick={() => setFlipped(!flipped)}>
      <div
        className={`relative w-full h-full transition-transform duration-500 transform-3d ${
          flipped ? 'rotate-y-180' : ''
        }`}>
        <div className="absolute shadow-xl p-3 w-full h-full flex flex-col items-center justify-center rounded-lg bg-black text-white text-center backface-hidden">
          <Text align="center">{question}</Text>
          <Text size="small" className="mt-2 text-gray-300" align="center">
            (click to reveal)
          </Text>
        </div>

        <div className="absolute shadow-xl p-3 w-full h-full flex items-center justify-center rounded-lg text-center rotate-y-180 backface-hidden">
          <Text align="center">{answer}</Text>
        </div>
      </div>
    </div>
  );
};
