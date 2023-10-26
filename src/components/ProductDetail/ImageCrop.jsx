import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import {useState} from 'react'; 
import Button from "@mui/material/Button";
import axios from 'axios';
import Backdrop from '@mui/material/Backdrop';
import Personalizing from '../Loading/Personalizing';
import CropIcon from '@mui/icons-material/Crop';

function CropperImg({itemID,uploadedImgId,img,updatePersonalizeImgs,aspectRatio}) {
    const BASE_URL = 'http://127.0.0.1:8000/api';
    const [crop, setCrop] = useState({height:0,width:0});
    const [loading, setLoading] = useState();
    const [loadingImg, setLoadingImg] = useState(true);

async function saveCropdata(){
    setLoading(true);
    console.log(crop);
    const formData = new FormData();
    formData.append('itemID',JSON.stringify(itemID));
    formData.append('uploadedImgId',JSON.stringify(uploadedImgId));
    formData.append('cropData',JSON.stringify(crop));
    await axios.post(BASE_URL+'/apply-image-personalization/',formData)
    .then(response=>{
      if(response.status===200){
        console.log(response);
        const personalizedImg = response.data.personalizeImg;
        setLoading(false);
        updatePersonalizeImgs(itemID,personalizedImg);
      }
      else if(response.status===400){
        alert(response.msg)
      }
    })
    .catch(error=>{
      setLoading(false);
      console.log(error);
    })
   }
  return (
      <div className="" >
          <Personalizing personalizing={loading}/>
      {!loading?
        <div className="">
          <p className="text-small text-dark">Drag your finger across your photo to crop </p>
            {/*For Deskop view  */}
          <div className="d-none d-lg-block d-md-block">
            <ReactCrop
              crop={crop}
               aspect={aspectRatio}
                onChange={(px,percent) => {console.log(crop);setCrop(percent)}}
                className="w-25"
                >
              <div className="text-center">
                <img src={img} onLoad={()=>setLoadingImg(false)}  className="img-fluid" style={{border:'5px solid #1d1b1b'}}/>
              </div>
            </ReactCrop>
              <div className="">
                <div className=" w-75 text-end">
                  {
                    (crop.height|crop.width)?
                    <Button variant="outlined" color="error" className="rounded-15 fs-12" onClick={()=>{saveCropdata(itemID,uploadedImgId,crop)}}><CropIcon fontSize="small"/> Upload</Button>
                      :""
                  }
                </div>
              </div>
            </div>
            
            {/*For Mobile view  */}
            <div className="d-md-none d-lg-none">
            <ReactCrop
              crop={crop}
               aspect={aspectRatio}
                onChange={(px,percent) => {console.log(crop);setCrop(percent)}}
                className="w-75"
                >
              <div className="text-center">
                 <img src={img} onLoad={()=>setLoadingImg(false)}  className="img-fluid" style={{border:'5px solid #1d1b1b'}}/>
              </div>
            </ReactCrop>
              <div className="text-end">
              {
                (crop.height|crop.width)?
                <Button variant="outlined" color="error" className="rounded-15 fs-12" onClick={()=>{saveCropdata(itemID,uploadedImgId,crop)}}><CropIcon fontSize="small"/> Upload</Button>
                  :""
              }
            </div>
            </div>

        </div>
        :''
      }
      {
        loadingImg&&<div className="text-center ">
                <div className="spinner-border text-pink"></div>
                <div className="fs-12">loading image...</div>
              </div>
      }
      </div>
  )
}
export default CropperImg;