import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';



//upload photos


function ImgUpload() {
  
  const { data } = useQuery(QUERY_USER);
  let user;

  if (data) {
    user = data.user;
    console.log (user);
  }
  


  const [message, setMessage] = useState('');

  const [uploadFormShow, setUploadFormShow] = useState(true);
  const [uploadingDivShow, setUploadingDivShow] = useState(false);
  const [uploadStatusShow, setUploadStatusShow] = useState(false);
  const [photoUploadedStatus, setPhotoUploadedStatus] = useState(false);
  
  const [userPhotoInputValue, setUserPhotoInputValue] = useState('');
  
  /* const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  }; */


  useEffect(() => {
/*     fetch('api/iupload')
      .then(response => response.json())
      .then(data => {
        console.log (data);
        setMessage(data)

      }       
        )
      .catch(error => console.error(error)); */
  }, []);



  async function userPhotoGet () {
    try {
       /* const fetchPhotoRes = await fetch('/api/users/photos');
  
      if (fetchPhotoRes.ok) {
        const photoData = await fetchPhotoRes.json();
        const photos = photoData.photos;
  
  
        //construct photo gallery
       let photoCards = '';
  
        for (photo of photos) {
          photoCards += `<div id="up${photo.id}" class="user-photo cards"><img src="/assets/img/photos/${photo.userid}/${photo.img_filename}"/></div>`;
        }
  
        if ($('#user-photo-con')) {
          $('#user-photo-con').html (`<div id="photo-gallery" class="container">${photoCards}<div>`);
        } 
  
      }*/
    } catch (err) {
      return false;
    }
  }

  const handleFormSubmit = async (event) => {
    event.preventDefault();


    console.log ('upload: ' + userPhotoInputValue)
    // eslint-disable-next-line eqeqeq
    if (userPhotoInputValue == '') {
      return;
    }
  
  
    try {
  

      setUploadFormShow (false);
      setUploadingDivShow (true);
  
      const photoForm = document.querySelector('#photo-form');
      const formData = new FormData(photoForm);
      const response = await fetch('/api/upload/photos', {
        // path to be changed
        method: 'POST',
        body: formData,
      });
  
  
      setUploadingDivShow (false);
 
      setUploadStatusShow (true);

      setPhotoUploadedStatus ('Photo Uploaded');
  
  
      setTimeout(() => {
        setUserPhotoInputValue ('');

        setUploadFormShow (true);
        setUploadStatusShow (false)

      }, 2000);
  
      userPhotoGet ();
  
  
      //console.log(response);
    } catch (err) {
      console.error(err);
    }
  };


  const editImageSubmit = async (event) => {
    event.preventDefault();

  
    try {
  
      const response = await fetch('/api/img/edit', {
        // path to be changed
        method: 'POST',
      });
  

      console.log(response);
    } catch (err) {
      console.error(err);
    }
  };


  const session = (Math.random() + 1).toString(36).substring(5);



  return (
    <div>
      <h1>Image Upload</h1>

      <div id="user-photo-upload" class="cards option">
        <form style={{ display: uploadFormShow ? 'block' : 'none' }} enctype="multipart/form-data" id="photo-form" onSubmit={handleFormSubmit}>
            <input name="session" type="hidden" value={session}/>
            <input id="user-photo-input" class="upload-input" type="file" accept=".jpg" name="photos" onChange={setUserPhotoInputValue} />
            <button class="button" type="submit">Upload Photo</button>
        </form>
        <div id="photo-uploaded-status" style={{ display: uploadStatusShow ? 'block' : 'none' }}>{photoUploadedStatus}</div>
        <div id="photo-uploading" style={{ display: uploadingDivShow ? 'block' : 'none' }}><img src="/src/img/site/loading.gif" alt="" style={{width: '50px'}}/> Uploading</div>
    </div>


    <br/><br/><button class="button" type="button" onClick={editImageSubmit}>Edit Image</button>

      <h1>{message}</h1>
    </div>
  );
}



export default ImgUpload;