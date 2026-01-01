import React, { useMemo } from 'react';
import { computeBarCoordinates, DataPoint } from '@berrypjh/core';
import './bar-chart.css';

type Background = 'gray' | 'white' | 'none';
type LabelPosition = 'bottom' | 'none';

interface BarChartProps {
  data: DataPoint[];
  width: number;
  height: number;
  background?: Background;
  labelPosition?: LabelPosition;
  singleColor?: string;
  barRadius?: number;
  className?: string;
  ariaLabel?: string;
}

const BG_CLASS: Record<Background, string> = {
  gray: 'bar-chart--bg-gray',
  white: 'bar-chart--bg-white',
  none: 'bar-chart--bg-none',
};

export const BarChart: React.FC<BarChartProps> = ({
  data,
  width,
  height,
  background = 'gray',
  labelPosition = 'bottom',
  singleColor = '#3b82f6',
  barRadius = 4,
  className,
  ariaLabel = 'Bar chart',
}) => {
  const bars = useMemo(() => {
    return computeBarCoordinates({ data, width, height });
  }, [data, width, height]);

  return (
    <svg
      width={width}
      height={height}
      role="img"
      aria-label={ariaLabel}
      className={['bar-chart', BG_CLASS[background], className].filter(Boolean).join(' ')}
    >
      {bars.map((bar) => {
        const fill = singleColor ?? bar.color;

        return (
          <g key={bar.data.id} className="bar-chart__group">
            <rect
              x={bar.x}
              y={bar.y}
              width={bar.width}
              height={bar.height}
              fill={fill}
              rx={barRadius}
              ry={barRadius}
              className="bar-chart__bar"
            />

            {labelPosition === 'bottom' && (
              <text
                x={bar.x + bar.width / 2}
                y={height - 5}
                textAnchor="middle"
                fontSize={12}
                className="bar-chart__label"
              >
                {bar.data.label}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
};
