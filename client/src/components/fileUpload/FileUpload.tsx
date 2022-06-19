import React, {
    ChangeEvent,
    useCallback,
    useRef,
    useState,
    useEffect
  } from "react";
  import "./fileUpload.scss";
  
  interface IFileTypes {
    id: number;
    object: File;
  }
  interface FileModalProps {
    mulit : boolean;
    parentCallBack:(files: IFileTypes[]) => void;
  };
  
const FileUpload:React.FC<FileModalProps> =  (props) => {
    const [isDragging, setIsDragging] = useState<boolean>(false); // 드래그 중인지 확인 변수
    const [files, setFiles] = useState<IFileTypes[]>([]);   //file 변수
    const [isMulit, setIsmult] = useState<boolean>(props.mulit); // 드래그 중인지 확인 변수
    
    const dragRef = useRef<HTMLLabelElement | null>(null);
    const fileId = useRef<number>(0);
  
    useEffect(()=>{
      props.parentCallBack(files)
    })

    const onChangeFiles = useCallback( (e: ChangeEvent<HTMLInputElement> | any): void => { 
        let selectFiles: File[] = [];
        let tempFiles: IFileTypes[] = files;
  
        if (e.type === "drop") {
          selectFiles = e.dataTransfer.files;
        } else {
          selectFiles = e.target.files;
        }
        if(!props.mulit){
          if(selectFiles.length > 1){
            alert("하나만 올려라")
            return
          }
          for (const file of selectFiles) {
            tempFiles = [
              {
                id: fileId.current++,
                object: file
              }
            ];
          }
          setFiles(tempFiles);   
        }else{
          for (const file of selectFiles) {
            tempFiles = [
              ...tempFiles,
              {
                id: fileId.current++,
                object: file
              }
            ];
          }       
          setFiles(tempFiles);
        }

      },
      [files]
    );
  
    const handleFilterFile = useCallback(
      (id: number): void => {
        setFiles(files.filter((file: IFileTypes) => file.id !== id));
      },
      [files]
    );
  
    const handleDragIn = useCallback((e: DragEvent): void => {
      e.preventDefault();   //브라우저 이벤트 방지
      e.stopPropagation();  //부모 이벤트 방지
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
        //드래그앤드랍 이벤트 등록
      if (dragRef.current !== null) {
        dragRef.current.addEventListener("dragenter", handleDragIn);
        dragRef.current.addEventListener("dragleave", handleDragOut);
        dragRef.current.addEventListener("dragover", handleDragOver);
        dragRef.current.addEventListener("drop", handleDrop);
      }
    }, [handleDragIn, handleDragOut, handleDragOver, handleDrop]);
  
    const resetDragEvents = useCallback((): void => {
        //드래그앤드랍 이벤트 제거
      if (dragRef.current !== null) {
        dragRef.current.removeEventListener("dragenter", handleDragIn);
        dragRef.current.removeEventListener("dragleave", handleDragOut);
        dragRef.current.removeEventListener("dragover", handleDragOver);
        dragRef.current.removeEventListener("drop", handleDrop);
      }
    }, [handleDragIn, handleDragOut, handleDragOver, handleDrop]);
  
    useEffect(() => {
      initDragEvents();
  
      return () => resetDragEvents();
    }, [initDragEvents, resetDragEvents]);
  
    return (
      <div className="FileUpload">
        <input 
          type="file"
          id="fileUpload"
          style={{ display: "none" }}
          multiple={isMulit}
          onChange={onChangeFiles}
        />
  
        <label
          className={isDragging ? "FileUpload-File-Dragging" : "FileUpload-File"}
          htmlFor="fileUpload"
          ref={dragRef}
        >
          <div>파일 첨부</div>
        </label>
          <div className="FileUpload-Files">
            {files.length > 0 &&
              files.map((file: IFileTypes) => {
                const {
                  id,
                  object: { name }
                } = file;
    
                return (
                  <div key={id}>
                    <div>{name}</div>
                    <div
                      className="FileUpload-Files-Filter"
                      onClick={() => handleFilterFile(id)}
                    >
                      X
                    </div>
                  </div>
                );
              })}
          </div>
        
        </div>
    );
  };
  
  export default FileUpload;