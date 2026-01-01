import type { Meta, StoryObj } from '@storybook/react';
import { BarChart } from './bar-chart';

const meta: Meta<typeof BarChart> = {
  title: 'Charts/BarChart',
  component: BarChart,
  argTypes: {
    width: {
      description: '너비를 변경할 수 있습니다.',
      table: {
        defaultValue: { summary: '500' },
      },
    },
    height: {
      description: '높이를 변경할 수 있습니다.',
      table: {
        defaultValue: { summary: '300' },
      },
    },
    background: {
      control: { type: 'select' },
      options: ['gray', 'white', 'none'],
      description: '배경색을 변경할 수 있습니다.',
    },
    labelPosition: {
      control: { type: 'select' },
      options: ['bottom', 'none'],
      description: '라벨 위치를 변경할 수 있습니다.',
    },
    singleColor: {
      control: { type: 'color' },
      description: '단일 색상을 변경할 수 있습니다.',
    },
    barRadius: {
      control: { type: 'range', min: 0, max: 16, step: 1 },
      description: '막대 라운드를 변경할 수 있습니다.',
    },
  },
};

export default meta;

type Story = StoryObj<typeof BarChart>;

export const Default: Story = {
  args: {
    width: 500,
    height: 300,
    background: 'gray',
    labelPosition: 'bottom',
    singleColor: '#3b82f6',
    barRadius: 4,
    data: [
      { id: 1, label: 'A', value: 100 },
      { id: 2, label: 'B', value: 200 },
      { id: 3, label: 'C', value: 150 },
      { id: 4, label: 'D', value: 130 },
      { id: 5, label: 'E', value: 0 },
      { id: 6, label: 'F', value: 40 },
      { id: 7, label: 'G', value: 100 },
      { id: 8, label: 'H', value: 230 },
      { id: 9, label: 'I', value: 20 },
      { id: 10, label: 'J', value: 10 },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: '기본 값으로 설정한 예제입니다.',
      },
    },
  },
};

export const WhiteBackground: Story = {
  args: {
    ...Default.args,
    background: 'white',
  },
  parameters: {
    docs: {
      description: {
        story: '배경색을 white로 설정한 예제입니다.',
      },
    },
  },
};
