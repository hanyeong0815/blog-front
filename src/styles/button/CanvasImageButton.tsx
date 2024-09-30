import React, { useRef, useEffect, FunctionComponent as FC } from "react";

// 개별 버튼에 그라데이션 색상을 적용하는 컴포넌트
const CanvasImageButton: React.FC<{
  onClick: (canvas: HTMLCanvasElement) => void;
  x: number;
  colors: [string, string];
  imgNumber: number;
  selectImg: number;
}> = ({ onClick, x, colors, imgNumber, selectImg }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const gradient = ctx.createLinearGradient(0, 0, 200, 100);
        gradient.addColorStop(0, colors[0]);
        gradient.addColorStop(1, colors[1]);
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 200, 100); // 사각형 그리기
      }
    }
  }, [colors]);

  return (
    <canvas
      ref={canvasRef}
      width={200}
      height={100}
      onClick={() => canvasRef.current && onClick(canvasRef.current)}
      className={`border border-solid border-black cursor-pointer rounded-lg ${
        selectImg === imgNumber ? "border-2 border-gray-300" : ""
      }`}
    />
  );
};

// Canvas 이미지를 데이터 URL로 변환하는 함수
const saveCanvasAsImage = (canvas: HTMLCanvasElement) => {
  const dataUrl = canvas.toDataURL("image/png"); // 이미지를 PNG 포맷으로 데이터 URL로 변환
  return dataUrl;
};

interface CanvasImageButtonsProps {
  selectImg: number;
  setSelectImg: React.Dispatch<React.SetStateAction<number>>;
}

// 미리보기 이미지 버튼들
const CanvasImageButtons: FC<CanvasImageButtonsProps> = ({
  selectImg,
  setSelectImg,
}) => {
  const handleButtonClick = async (canvas: HTMLCanvasElement) => {
    const dataUrl = saveCanvasAsImage(canvas); // canvas를 데이터 URL로 변환
    console.log("데이터 URL:", dataUrl); // 데이터 URL 콘솔 출력 (업로드하기 전)

    // 이미지 URL을 사용해 Open Graph 또는 다른 용도로 사용 가능
  };

  return (
    <div style={{ display: "flex", gap: "10px" }}>
      <CanvasImageButton
        onClick={(evt) => {
          handleButtonClick(evt);
          setSelectImg(1);
        }}
        x={0}
        colors={["green", "black"]}
        imgNumber={1}
        selectImg={selectImg}
      />
      <CanvasImageButton
        onClick={(evt) => {
          handleButtonClick(evt);
          setSelectImg(2);
        }}
        x={50}
        colors={["blue", "red"]}
        imgNumber={2}
        selectImg={selectImg}
      />
      <CanvasImageButton
        onClick={(evt) => {
          handleButtonClick(evt);
          setSelectImg(3);
        }}
        x={100}
        colors={["black", "white"]}
        imgNumber={3}
        selectImg={selectImg}
      />
      <CanvasImageButton
        onClick={(evt) => {
          handleButtonClick(evt);
          setSelectImg(4);
        }}
        x={150}
        colors={["purple", "orange"]}
        imgNumber={4}
        selectImg={selectImg}
      />
    </div>
  );
};

export default CanvasImageButtons;
