import { FunctionComponent as FC, useEffect, useRef } from "react";

const CanvasImages: FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // 사각형 모양으로 색깔을 섞는 함수
  const drawColoredRectangles = (ctx: CanvasRenderingContext2D) => {
    // 첫 번째 사각형: 초록색과 검은색
    const gradient1 = ctx.createLinearGradient(0, 0, 40, 20);
    gradient1.addColorStop(0, "green");
    gradient1.addColorStop(1, "yellow");
    ctx.fillStyle = gradient1;
    ctx.fillRect(0, 0, 40, 20);

    // 두 번째 사각형: 파란색과 빨간색
    const gradient2 = ctx.createLinearGradient(50, 0, 90, 20);
    gradient2.addColorStop(0, "blue");
    gradient2.addColorStop(1, "red");
    ctx.fillStyle = gradient2;
    ctx.fillRect(50, 0, 40, 20);

    // 세 번째 사각형:
    const gradient3 = ctx.createLinearGradient(100, 0, 140, 20);
    gradient3.addColorStop(0, "black");
    gradient3.addColorStop(1, "white");
    ctx.fillStyle = gradient3;
    ctx.fillRect(100, 0, 40, 20);

    // 네 번째 사각형: 검은색과 흰색
    const gradient4 = ctx.createLinearGradient(100, 0, 140, 20);
    gradient4.addColorStop(0, "black");
    gradient4.addColorStop(1, "white");
    ctx.fillStyle = gradient4;
    ctx.fillRect(100, 0, 40, 20);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      let animationFrameId: number;

      const render = (time: number) => {
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height); // 캔버스 초기화
          drawColoredRectangles(ctx); // 정적인 사각형 이미지 그리기
        }
        animationFrameId = requestAnimationFrame(render);
      };
      render(0);

      return () => {
        cancelAnimationFrame(animationFrameId);
      };
    }
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={200}
      height={20}
      className="border border-solid border-black"
    />
  );
};

export default CanvasImages;
