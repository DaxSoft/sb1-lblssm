import ReactECharts from 'echarts-for-react';
import { Table } from '@tanstack/react-table';
import { useChartStore } from '@/lib/stores/chart-store';
import { ChartType } from '@/lib/types/chart-types';
import { getChartOptions } from '@/lib/chart-options';

interface ChartPreviewProps<TData> {
  table: Table<TData>;
  type: ChartType;
}

export function ChartPreview<TData>({ table, type }: ChartPreviewProps<TData>) {
  const { chartConfig } = useChartStore();
  const data = table.getFilteredRowModel().rows.map((row) => row.original);
  const options = getChartOptions(type, data, chartConfig);

  return (
    <div className="h-full w-full">
      <ReactECharts
        option={options}
        style={{ height: '100%', width: '100%' }}
        opts={{ renderer: 'canvas' }}
      />
    </div>
  );
}