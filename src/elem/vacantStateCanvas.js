//캔버스 비어있을 때 감지
const isCanvasBlank = (canvas) => {
      const context = canvas.getContext('2d');
      const pixelBuffer = new Uint32Array(
          context.getImageData(0, 0, canvas.width, canvas.height).data.buffer
        );
      
        return !pixelBuffer.some(color => color !== 0);
}
  
export  default isCanvasBlank