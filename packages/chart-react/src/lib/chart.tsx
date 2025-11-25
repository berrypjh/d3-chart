import { useEffect, useRef } from 'react';
import { SimpleChart, ChartOptions } from '@berry-chart-test/core';

export interface ChartProps extends Omit<ChartOptions, 'width' | 'height'> {
  width?: number;
  height?: number;
  className?: string;
}

export function Chart({
  width = 500,
  height = 300,
  data,
  color,
  className,
}: ChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<SimpleChart | null>(null);

  // 1. 초기화 (Mount)
  useEffect(() => {
    if (!canvasRef.current) return;

    // Core 클래스 인스턴스 생성
    chartInstance.current = new SimpleChart(canvasRef.current, {
      width,
      height,
      data,
      color,
    });
    chartInstance.current.render();

    // Cleanup (필요시 destroy 메서드 호출 등)
    return () => {
      chartInstance.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // 마운트 시 한 번만 실행

  // 2. 업데이트 (Update): Props가 바뀌면 차트 다시 그리기
  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.update({ data, color, width, height });
    }
  }, [data, color, width, height]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className={className}
    />
  );
}

export default Chart;
