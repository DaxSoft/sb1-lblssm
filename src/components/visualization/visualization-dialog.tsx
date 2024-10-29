import { useState, useCallback, useMemo } from 'react';
import { Table } from '@tanstack/react-table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChartConfig } from './chart-config';
import { ChartPreview } from './chart-preview';
import { ChartFilter } from './chart-filter';
import { useChartStore } from '@/lib/stores/chart-store';
import { ChartType } from '@/lib/types/chart-types';

interface VisualizationDialogProps<TData> {
  table: Table<TData>;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function VisualizationDialog<TData>({
  table,
  open,
  onOpenChange,
}: VisualizationDialogProps<TData>) {
  const [activeTab, setActiveTab] = useState<ChartType>('line');
  const { setChartData, setChartConfig } = useChartStore();

  const columns = useMemo(() => {
    return table
      .getAllColumns()
      .filter((col) => col.id !== 'actions')
      .map((col) => ({
        id: col.id,
        label: col.id.charAt(0).toUpperCase() + col.id.slice(1),
        type: col.columnDef.meta?.type || 'string',
      }));
  }, [table]);

  const handleConfigChange = useCallback((config: any) => {
    setChartConfig(config);
  }, [setChartConfig]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="fluent-glass max-w-6xl">
        <DialogHeader>
          <DialogTitle>Data Visualization</DialogTitle>
        </DialogHeader>
        <ResizablePanelGroup direction="horizontal" className="h-[600px]">
          <ResizablePanel defaultSize={25} minSize={20}>
            <div className="h-full p-4">
              <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as ChartType)}>
                <TabsList className="w-full">
                  <TabsTrigger value="line">Line</TabsTrigger>
                  <TabsTrigger value="bar">Bar</TabsTrigger>
                  <TabsTrigger value="pie">Pie</TabsTrigger>
                  <TabsTrigger value="scatter">Scatter</TabsTrigger>
                  <TabsTrigger value="gauge">Gauge</TabsTrigger>
                </TabsList>
                <ScrollArea className="h-[calc(100vh-200px)] mt-4">
                  <TabsContent value={activeTab} className="mt-0">
                    <ChartConfig
                      type={activeTab}
                      columns={columns}
                      onConfigChange={handleConfigChange}
                    />
                  </TabsContent>
                </ScrollArea>
              </Tabs>
            </div>
          </ResizablePanel>
          <ResizablePanel defaultSize={50}>
            <div className="h-full p-4">
              <ChartPreview table={table} type={activeTab} />
            </div>
          </ResizablePanel>
          <ResizablePanel defaultSize={25} minSize={20}>
            <div className="h-full p-4">
              <ChartFilter table={table} columns={columns} />
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </DialogContent>
    </Dialog>
  );
}