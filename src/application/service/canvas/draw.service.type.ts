export interface DrawService {
  draw: (param: {
    ctx: CanvasRenderingContext2D;
    canvasWidth: number;
    canvasHeight: number;
    nodeCount: number;
  }) => void;
}
