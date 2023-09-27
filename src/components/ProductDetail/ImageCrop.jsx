import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import test from '../../images/other/test.png'
import {useState} from 'react'; 
import Button from "@mui/material/Button";
import axios from 'axios';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Personalizing from '../Loading/Personalizing';


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
          <p className="text-small text-secondary">Drag your finger across your photo to crop </p>
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
              <Button variant="outlined" className="text-small" onClick={()=>{saveCropdata(itemID,uploadedImgId,crop)}}>Save</Button>
                :""
            }
          </div>
        </div>
        :
        <div className="text-center ">
                <div className="spinner-border text-danger"></div>
                <div className="text-small">Personalizing...</div>
              </div>
      }
      {
        loadingImg&&<div className="text-center ">
                <div className="spinner-border text-danger"></div>
                <div className="text-small">loading image...</div>
              </div>
      }
      </div>
  )
}
export default CropperImg;