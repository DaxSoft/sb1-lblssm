import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ShimmerButtonProps {
  onClick: () => void;
  className?: string;
}

export function ShimmerButton({ onClick, className }: ShimmerButtonProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn('relative', className)}
    >
      <Button
        onClick={onClick}
        className="relative overflow-hidden bg-gradient-to-r from-primary/80 to-primary"
      >
        <div className="absolute inset-0 bg-[linear-gradient(110deg,#00000000,45%,#ffffff50,55%,#00000000)] translate-x-[-100%] animate-[shimmer_1.5s_infinite]" />
        <Sparkles className="mr-2 h-4 w-4" />
        AI Assistant
      </Button>
    </motion.div>
  );
}