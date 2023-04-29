import UploadIcon from '@mui/icons-material/Upload';
import { motion } from "framer-motion";
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import './App.css';
import Crop from './components/layouts/Crop/Crop';



function App() {

  const [img, setImg] = useState(null)
  const [imageString, setImageString] = useState("");

  const [history, setHistory] = useState([])

  const HelperInputOnChange = (e) => {
    const img = e.target.files && e.target.files[0];
    if (img) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageString(reader.result);
      };
      reader.readAsDataURL(img);
      toast.success("Image has been Uploaded!")
    } else {
      toast.error("Image Upload Failed!")
      setImageString("")
    }
    setImg(img);
  }



  return (
    <>
      <Toaster />
      <div className={`w-full h-full flex flex-col gap-6 items-center justify-center p-3 ${(history.length === 0) ? !img ? "pt-[40vh]" : "pt-20" : "pt-20"} `}>

        <motion.div layout className='flex gap-5  ' >
          <input
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            id="input"
            name='input'
            hidden
            onChange={(e) => HelperInputOnChange(e)}
          />
          <label htmlFor="input" className='h-12 flex items-center gap-1text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-offset-2 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5' >
            <UploadIcon />
            Upload
          </label>


          <Crop imageString={imageString} img={img} setHistory={setHistory} history={history} />
        </motion.div>

        {imageString && <>
          <p>Your Image</p>
          <motion.img
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            // transition={{ delay: 0.3 }}
            layout
            className=' w-52 h-52 object-contain'
            src={imageString}
            alt="Selected Image" />
        </>}


        {
          history?.length > 0 && (<motion.h2 layout>History</motion.h2>)
        }
        <motion.div layout className='w-full flex flex-wrap gap-6 ' >
          {
            history.map((image, index) => (
              <div
                key={index}
                className='rounded-lg border-2 overflow-hidden relative border-white shadow-lg hover:shadow-2xl transition-all duration-300' >
                <img
                  className=' w-44 h-44 object-contain'
                  src={image}
                  alt="Selected Image" />
                <a className=' absolute w-max h-max px-3 py-2 z-10 bottom-0 text-black bg-white rounded-tr-lg hover:bg-slate-900 hover:text-white transition-all duration-300 ' href={image} download onClick={() => { toast.success("Image Downloaded!") }} > downlaod </a>
              </div>
            ))
          }
        </motion.div>

      </div>
    </>
  )
}

export default App
