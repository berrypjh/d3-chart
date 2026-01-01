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
  onBarClick?: (point: DataPoint) => void;
  testIdPrefix?: string;
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
  onBarClick,
  testIdPrefix = 'bar',
}) => {
  const bars = useMemo(() => computeBarCoordinates({ data, width, height }), [data, width, height]);

  return (
    <svg
      width={width}
      height={height}
      role="img"
      aria-label="Bar chart"
      className={['bar-chart', BG_CLASS[background]].join(' ')}
    >
      {bars.map((bar) => {
        const fill = singleColor ?? bar.color;

        return (
          <g key={bar.data.id} className="bar-chart__group">
            <rect
              data-testid={`${testIdPrefix}-${bar.data.id}`}
              x={bar.x}
              y={bar.y}
              width={bar.width}
              height={bar.height}
              fill={fill}
              rx={barRadius}
              ry={barRadius}
              className={['bar-chart__bar', onBarClick ? 'bar-chart__bar--clickable' : '']
                .filter(Boolean)
                .join(' ')}
              onClick={onBarClick ? () => onBarClick(bar.data) : undefined}
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
