// Previous imports remain the same
import { ShimmerButton } from '@/components/ai/shimmer-button';
import { ChatInterface } from '@/components/ai/chat-interface';

// ... (previous code remains the same until the DataTable component)

export function DataTable<TData, TValue>({
  columns,
  data,
  onEdit,
}: DataTableProps<TData, TValue>) {
  // ... (previous state declarations)
  const [showAIChat, setShowAIChat] = useState(false);

  // ... (rest of the code remains the same until the return statement)

  return (
    <motion.div
      className="space-y-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {/* Previous font size buttons */}
          <ShimmerButton
            onClick={() => setShowAIChat(true)}
            className="ml-4"
          />
        </div>
        {/* Rest of the toolbar buttons */}
      </div>

      {/* Rest of the table code */}

      {/* Add the ChatInterface component */}
      <ChatInterface
        open={showAIChat}
        onOpenChange={setShowAIChat}
        tableData={data}
      />
    </motion.div>
  );
}