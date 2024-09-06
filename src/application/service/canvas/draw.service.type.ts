/**
 * @fileoverview draw.service.type.ts - draw service type
 * @module drawServiceType
 */
export interface DrawService {
  draw: (param: {
    ctx: CanvasRenderingContext2D; // canvas 2d context
    canvasWidth: number; // canvas width
    canvasHeight: number; // canvas height
    nodeCount: number; // node count
  }) => void;
}
