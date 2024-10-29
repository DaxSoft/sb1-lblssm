import { useRef, useState } from 'react';
import { useChat } from 'ai/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Send, User, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

interface ChatInterfaceProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tableData: any[];
}

export function ChatInterface({ open, onOpenChange, tableData }: ChatInterfaceProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [contextSent, setContextSent] = useState(false);

  const { messages, input, handleInputChange, handleSubmit } = useChat({
    onFinish: () => {
      setTimeout(() => {
        scrollRef.current?.scrollTo({
          top: scrollRef.current.scrollHeight,
          behavior: 'smooth',
        });
      }, 100);
    },
    body: {
      tableData: !contextSent ? tableData : undefined,
    },
  });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContextSent(true);
    handleSubmit(e);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="fluent-glass sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5" />
            AI Assistant
          </DialogTitle>
        </DialogHeader>

        <div className="flex h-[500px] flex-col gap-4">
          <ScrollArea ref={scrollRef} className="flex-1 rounded-md border p-4">
            <AnimatePresence mode="popLayout">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={cn(
                    'mb-4 flex items-start gap-3 rounded-lg p-4',
                    message.role === 'assistant'
                      ? 'bg-muted/50'
                      : 'bg-primary/5'
                  )}
                >
                  {message.role === 'assistant' ? (
                    <Bot className="h-5 w-5 text-primary" />
                  ) : (
                    <User className="h-5 w-5 text-muted-foreground" />
                  )}
                  <div className="flex-1">
                    <div className="text-sm">{message.content}</div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </ScrollArea>

          <form onSubmit={handleFormSubmit} className="flex gap-2">
            <Input
              value={input}
              onChange={handleInputChange}
              placeholder="Ask about your data..."
              className="fluent-input"
            />
            <Button type="submit" size="icon" className="fluent-button">
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}