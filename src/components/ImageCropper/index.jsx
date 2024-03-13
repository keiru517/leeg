import { useRef, useState } from "react";
import ReactCrop, { centerCrop, convertToPixelCrop, makeAspectCrop } from "react-image-crop";
import setCanvasPreview from "./setCanvasPreview";

const ASPECT_RATIO = 1;
const MIN_DIMENSION = 150;

function base64toBlob(base64Data) {
  const byteString = atob(base64Data);
  const arrayBuffer = new ArrayBuffer(byteString.length);
  const int8Array = new Uint8Array(arrayBuffer);

  for (let i = 0; i < byteString.length; i++) {
    int8Array[i] = byteString.charCodeAt(i);
  }

  return new Blob([arrayBuffer], { type: 'image/jpeg' });
}

const ImageCropper = (props) => {
  const imgRef = useRef(null);
  let { setPreviewURL, setModalOpen, setChosenFile } = props;
  const previewCanvasRef = useRef(null)
  const [imgSrc, setImgSrc] = useState('');
  const [crop, setCrop] = useState();
  const [error, setError] = useState('')
  const onSelectFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      const imageElement = new Image();
      const imageUrl = reader.result?.toString() || "";
      imageElement.src = imageUrl;
      imageElement.addEventListener("load", (e) => {
        if (error) setError("");
        const { naturalWidth, naturalHeight } = e.currentTarget;
        if (naturalWidth < MIN_DIMENSION || naturalHeight < MIN_DIMENSION) {
          setError("Image must be at least 150 x 150 pixels.")
          setImgSrc("");
          return;
        }
      })
      setImgSrc(imageUrl);
    })
    reader.readAsDataURL(file);
  }

  const onImageLoad = (e) => {
    const { width, height } = e.currentTarget;
    const cropWidthInPercent = (MIN_DIMENSION / width) * 100;

    const crop = makeAspectCrop(
      {
        unit: '%',
        width: cropWidthInPercent,
      },
      ASPECT_RATIO,
      width,
      height
    );
    const centeredCrop = centerCrop(crop, width, height);
    setCrop(centeredCrop)
  }

  return (
    <>
      <label className="block mb-3 w-fit" htmlFor="">
        <span className="sr-only">Choose profile photo</span>
        <input type="file"
          onChange={onSelectFile}
          className="block w-full text-sm dark:text-white text-slate-500 file:mr-4 file:py-1 file:px-2 file:rounded-full file:border-0 file:text-xs file:bg-gray-700 file:text-sky-300 hover:file:bg-gray-600"
        />
      </label>
      {
        error && <p className="text-red-400 text-xs">{error}</p>
      }
      {
        imgSrc &&
        <div className="flex flex-col items-center">
          <ReactCrop
            crop={crop}
            onChange={
              (pixelCrop, percentCrop) => setCrop(percentCrop)
            }
            circularCrop
            keepSelection
            aspect={ASPECT_RATIO}
            minWidth={MIN_DIMENSION}
          >
            <img
              ref={imgRef}
              src={imgSrc}
              alt="Upload"
              style={{ maxHeight: "50vh" }}
              onLoad={onImageLoad} />
          </ReactCrop>
          <button className="text-white font-mono text-xs py-2 px-4 rounded-2xl mt-4 bg-sky-500 hover:bg-sky-600"
            onClick={() => {
              setCanvasPreview(
                imgRef.current,
                previewCanvasRef.current,
                convertToPixelCrop(
                  crop,
                  imgRef.current.width,
                  imgRef.current.height
                )
              );
              const dataUrl = previewCanvasRef.current.toDataURL()
              setPreviewURL(dataUrl);
              // Extract base64 data from data URL
              const base64Data = dataUrl.split(',')[1];

              // Convert base64 data to a Blob
              const blob = base64toBlob(base64Data);

              // Create a File object from the Blob
              const file = new File([blob], 'image.jpg', { type: 'image/jpeg' });

              // Now you can set the chosen file
              setChosenFile(file);
              setModalOpen(false);
            }}
          >
            Crop Image
          </button>
        </div>
      }
      {
        crop &&
        <canvas
          ref={previewCanvasRef}
          className="mt-4"
          style={{
            display: "none",
            border: "1px solid black",
            objectFit: "contain",
            width: 150,
            height: 150
          }}
        ></canvas>
      }
    </>
  )
}

export default ImageCropper;