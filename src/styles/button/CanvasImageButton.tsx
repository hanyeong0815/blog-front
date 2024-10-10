import React, {
  useRef,
  useEffect,
  FunctionComponent as FC,
  useCallback,
  useState,
  ChangeEvent,
} from "react";

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
  file: any;
  setFile: React.Dispatch<React.SetStateAction<any>>;
  setSelectImg: React.Dispatch<React.SetStateAction<number>>;
}

// 미리보기 이미지 버튼들
const CanvasImageButtons: FC<CanvasImageButtonsProps> = ({
  selectImg,
  file,
  setFile,
  setSelectImg,
}) => {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [imgName, setImgName] = useState<string>("");
  const [imgUrl, setImgUrl] = useState<string>();

  const ALLOW_FILE_EXTENSION = ["image/jpg", "image/jpeg", "image/png"];

  const dragRef = useRef<HTMLLabelElement | null>(null);

  const handleDragIn = useCallback((e: DragEvent): void => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragOut = useCallback((e: DragEvent): void => {
    e.preventDefault();
    e.stopPropagation();

    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: DragEvent): void => {
    e.preventDefault();
    e.stopPropagation();

    if (e.dataTransfer!.files) {
      setIsDragging(true);
    }
  }, []);

  const onChangeFiles = useCallback(
    (e: ChangeEvent<HTMLInputElement> | any): void => {
      let selectFiles;

      if (e.type === "drop") {
        selectFiles = e.dataTransfer.files;
      } else {
        selectFiles = e.target.files;
      }

      if (selectFiles) {
        const selectFile = selectFiles[0];

        if (!ALLOW_FILE_EXTENSION.includes(selectFile.type)) return;

        setImgName(selectFile.name);
        imgChangeHandler(selectFile);
        setFile(selectFile);
        setSelectImg(5);
      }
    },
    []
  );

  const handleDrop = useCallback(
    (e: DragEvent): void => {
      e.preventDefault();
      e.stopPropagation();

      onChangeFiles(e);
      setIsDragging(false);
    },
    [onChangeFiles]
  );

  const initDragEvents = useCallback((): void => {
    if (dragRef.current === null) {
      return;
    }
    dragRef.current.addEventListener("dragenter", handleDragIn);
    dragRef.current.addEventListener("dragleave", handleDragOut);
    dragRef.current.addEventListener("dragover", handleDragOver);
    dragRef.current.addEventListener("drop", handleDrop);
  }, [handleDragIn, handleDragOut, handleDragOver, handleDrop]);

  const resetDragEvents = useCallback((): void => {
    if (dragRef.current === null) {
      return;
    }
    dragRef.current.removeEventListener("dragenter", handleDragIn);
    dragRef.current.removeEventListener("dragleave", handleDragOut);
    dragRef.current.removeEventListener("dragover", handleDragOver);
    dragRef.current.removeEventListener("drop", handleDrop);
  }, [handleDragIn, handleDragOut, handleDragOver, handleDrop]);

  useEffect(() => {
    initDragEvents();

    return () => resetDragEvents();
  }, [initDragEvents, resetDragEvents]);

  const imgChangeHandler = useCallback((file: any) => {
    console.log(file);
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const newImgUrl = reader.result; // 새로운 이미지 URL
      setImgUrl(newImgUrl?.toString()); // 상태 업데이트
      // 추가 로직을 여기서 실행
    };
  }, []);

  const handleButtonClick = async (canvas: HTMLCanvasElement) => {
    const dataUrl = saveCanvasAsImage(canvas); // canvas를 데이터 URL로 변환
    console.log(dataUrl);

    // 이미지 URL을 사용해 Open Graph 또는 다른 용도로 사용 가능
  };

  return (
    <div className="flex gap-2">
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
      <input
        type="file"
        id="fileUpload"
        className="hidden"
        multiple={true}
        onChange={onChangeFiles}
        accept="image/gif, image/jpeg, image/png"
      />
      <label
        htmlFor="fileUpload"
        ref={dragRef}
        onClick={() => setSelectImg(5)}
        className={
          isDragging
            ? `w-[202px] h-[104px] flex flex-col border border-solid border-black rounded-3xl cursor-pointer ease-in duration-100 bg-gray-600 text-white`
            : `w-[202px] h-[104px] flex flex-col ${
                selectImg === 5
                  ? "border-2 border-gray-300"
                  : "border border-black"
              } rounded-lg cursor-pointer bg-gray-400 font-bold ease-in opacity-100`
        }
      >
        {file ? (
          <img
            src={imgUrl}
            alt={imgName || "Image Preview"}
            className="flex justify-center items-center w-full h-full text-center rounded-lg"
          />
        ) : (
          <p className="flex justify-center items-center w-full h-full text-center">
            클릭 혹은 파일을 드래그 해주세요.
          </p>
        )}
      </label>
    </div>
  );
};

export default CanvasImageButtons;
