export interface ChartOptions {
  width: number;
  height: number;
  data: number[];
  color?: string;
}

export class SimpleChart {
  private ctx: CanvasRenderingContext2D;
  private options: ChartOptions;

  constructor(canvas: HTMLCanvasElement, options: ChartOptions) {
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Cannot get 2d context');

    this.ctx = ctx;
    this.options = options;

    // 캔버스 크기 조정 (Retina 디스플레이 대응 등을 위해 스케일링 로직 필요 가능)
    canvas.width = options.width;
    canvas.height = options.height;
  }

  public render() {
    this.clear();
    this.drawBars();
  }

  public update(newOptions: Partial<ChartOptions>) {
    this.options = { ...this.options, ...newOptions };
    if (newOptions.width !== undefined || newOptions.height !== undefined) {
      const canvas = this.ctx.canvas;
      if (newOptions.width !== undefined) canvas.width = newOptions.width;
      if (newOptions.height !== undefined) canvas.height = newOptions.height;
    }
    this.render();
  }

  private clear() {
    this.ctx.clearRect(0, 0, this.options.width, this.options.height);
  }

  private drawBars() {
    const { data, width, height, color } = this.options;
    const barWidth = width / data.length;
    const maxVal = Math.max(...data);

    this.ctx.fillStyle = color || '#3b82f6';

    data.forEach((value, index) => {
      const barHeight = (value / maxVal) * height;
      const x = index * barWidth;
      const y = height - barHeight;

      // 막대 그리기
      this.ctx.fillRect(x, y, barWidth - 2, barHeight);
    });
  }
}
