import CropIcon from '@mui/icons-material/Crop';
import Crop32Icon from '@mui/icons-material/Crop32';
import CropDinIcon from '@mui/icons-material/CropDin';
import { Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Slider } from "@mui/material";
import { useState } from "react";
import Cropper from "react-easy-crop";
import { toast } from 'react-hot-toast';
import getCroppedImg from "./utils/cropImage";


const zoomPercent = (value) => {
    return `${Math.round(value * 100)}%`;
};


const Crop = ({ imageString, img, setHistory, history }) => {

    const [open, setOpen] = useState(false)
    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [zoom, setZoom] = useState(1)
    const [rotation, setRotation] = useState(0)
    const [aspact, setAspact] = useState(1)
    const [croppedPixels, setCroppedPixels] = useState(null)

    const cropComplate = (croppedArea, pixels) => {
        setCroppedPixels(pixels)
    }

    const HelperAspact = (aspact) => {
        if (aspact !== "circle") {
            setAspact(aspact)
        } else {
            setAspact(1)
        }
    }

    const HelperSave = async () => {
        try {
            const url = await getCroppedImg(
                imageString,
                croppedPixels,
                rotation
            );
            setHistory([url, ...history]);
            toast.success("Image Cropped!")
            setOpen(false)
        } catch (error) {
            toast.error("Image Croping Failed!")
            console.log(error);
        }
    }

    return (
        <>
            <button className="h-12 flex items-center gap-1text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-offset-2 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 disabled:cursor-not-allowed disabled:bg-slate-600 disabled:text-slate-800 disabled:outline-none disabled:border-none disabled:hover:bg-slate-600 "
                onClick={() => { setOpen(true) }} disabled={!img} >
                <CropIcon fontSize='small' />&nbsp;
                Crop
            </button>

            <Dialog scroll="paper" open={open} onClose={() => { setOpen(false) }} >
                <DialogTitle
                    sx={{ backgroundColor: "#252525", color: "#fff" }}
                >CROP</DialogTitle>
                <DialogContent
                    dividers
                    sx={{ backgroundColor: "#252525", color: "#fff", position: "relative", width: "auto", height: "90vh", minWidth: { sm: 500 }, padding: 0, overflowX: "hidden", overflowY: "auto" }}
                >
                    <div className=" relative w-full h-[260px] " >
                        <Cropper
                            image={imageString}
                            crop={crop}
                            rotation={rotation}
                            zoom={zoom}
                            aspect={aspact}
                            onCropChange={setCrop}
                            onRotationChange={setRotation}
                            onZoomChange={setZoom}
                            onCropComplete={cropComplate}
                            showGrid={false}
                        />

                    </div>
                    <h2 className="w-full px-3 pt-2" >Aspact ratio :</h2>
                    <div className=" w-full flex items-center justify-around px-3  " >

                        <IconButton
                            onClick={() => HelperAspact(1 / 1)}
                            sx={{ display: "flex", flexDirection: "column", width: "3.5rem", height: "3.5rem" }} >
                            <CropDinIcon sx={{ fill: "#fff" }} />
                            <p className=" text-sm text-white" >1 : 1</p>
                        </IconButton>
                        <IconButton
                            onClick={() => HelperAspact(3 / 4)}
                            sx={{ display: "flex", flexDirection: "column", width: "3.5rem", height: "3.5rem" }}>
                            <Crop32Icon
                                sx={{ rotate: "90deg", fill: "#fff" }}
                            />
                            <p className=" text-sm text-white" >4 : 3</p>
                        </IconButton>
                        <IconButton
                            onClick={() => HelperAspact(4 / 3)}
                            sx={{ display: "flex", flexDirection: "column", width: "3.5rem", height: "3.5rem" }}>
                            <Crop32Icon sx={{ fill: "#fff" }} />
                            <p className=" text-sm text-white" >3 : 4</p>
                        </IconButton>

                    </div>

                    <div className=" w-full flex flex-col px-3  justify-between " >
                        <h2 className=" text-left  " >zoom :</h2>
                        <Slider
                            valueLabelFormat={zoomPercent}
                            min={1}
                            max={3}
                            step={0.1}
                            value={zoom}
                            onChange={(event, zoom) => setZoom(zoom)}
                            valueLabelDisplay="auto"
                        />
                    </div>

                    <div className=" w-full flex flex-col px-3  justify-between " >
                        <h2 className=" text-left">rotate :</h2>
                        <Slider
                            valueLabelFormat={rotation + " °"}
                            min={0}
                            max={360}
                            step={1}
                            value={rotation}
                            onChange={(event, rotate) => setRotation(rotate)}
                            valueLabelDisplay="auto"
                        />
                    </div>

                </DialogContent>
                <DialogActions sx={{ backgroundColor: "#252525", color: "#fff", display: "flex", flexDirection: "column", alignItems: "center", gap: 2, py: 2, px: 2 }} >


                    <div className=" flex gap-3 justify-end w-full " >
                        <button
                            onClick={() => { setOpen(false) }}
                            className="h-12 flex w-24 justify-center items-center gap-1text-white hover:bg-gray-900 focus:outline-none focus:ring-offset-2 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5  "
                        >
                            DISCARD
                        </button>
                        <button
                            onClick={HelperSave}
                            className="h-12 flex w-24 justify-center items-center gap-1text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-offset-2 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 "
                        >
                            SAVE
                        </button>
                    </div>

                </DialogActions>
            </Dialog>
        </>
    );
}

export default Crop;