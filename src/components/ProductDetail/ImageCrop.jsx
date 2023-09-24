import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import test from '../../images/other/test.png'
import {useState} from 'react'; 
import Button from "@mui/material/Button";
import axios from 'axios';

function CropperImg({itemID,uploadedImgId,img,updatePersonalizeImgs,aspectRatio}) {
    const BASE_URL = 'http://127.0.0.1:8000/api';
    const [crop, setCrop] = useState({height:0,width:0});
    const [loading, setLoading] = useState();

async function saveCropdata(){
    setLoading(true);
    console.log(crop);
    const formData = new FormData();
    formData.append('itemID',JSON.stringify(itemID));
    formData.append('uploadedImgId',JSON.stringify(uploadedImgId));
    formData.append('cropData',JSON.stringify(crop));
    await axios.post(BASE_URL+'/apply-image-personalization/',formData)
    .then(response=>{
      console.log(response);
      const personalizedImg = response.data.personalizeImg;
      setLoading(false);
      updatePersonalizeImgs(itemID,personalizedImg);
    })
    .catch(error=>{
      setLoading(false);
      console.log(error);
    })
   }
  return (
      <div className="px-5" >
      {!loading?
        <div >
          <ReactCrop
            crop={crop}
             aspect={aspectRatio}
              onChange={(px,percent) => {console.log(crop);setCrop(percent)}}
              >
            <img src={img}/>
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
      </div>
  )
}
export default CropperImg;