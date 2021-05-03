import axios from "axios";

const URL = 'https://test.ground.yourssu.com/timetable/v1/ssurank';

export function getCookie(cookieName){ //userID
  cookieName = cookieName + '=';
  let cookieData = document.cookie;
  let start = cookieData.indexOf(cookieName);
  let cookieValue = '';
  if(start != -1){
    start += cookieName.length;
    let end = cookieData.indexOf(';', start);
  if(end == -1)end = cookieData.length;
    cookieValue = cookieData.substring(start, end);
  }
  console.log(`We get Cookie ${cookieName}'s value,`);
  console.log(cookieValue);
  return unescape(cookieValue);
  }

export async function postCommentData (value){
    await axios.post(`${URL}/${value.path}`,value.data,{headers:value.headers})
    .then(response=>{
      alert(value.message)
      window.location.reload(false);
    })
    .catch(err=>{
          alert('에러 : ',err.response.data.message)
      }
    );
};

export async function getDetailData(value){
  return await axios.get(`${URL}/${value.path}/${value.data}`,{headers:value.headers})
  .then(response=>{
    console.log(response)
    if(response.status==200)
      return response.data
    else{
      alert('잘못된 접근');
    }
  })
  .catch(err=>{
        alert(err.response.data.message)
    }
  );

        //console.log(response.status)
}

export async function getCommentData(value){
  return await axios.get(`${URL}/${value.path}/${value.data}`,{headers:value.headers})
  .then(response=>{
    console.log(response)
    if(response.status==200)
      return response.data
    else{
      alert('잘못된 접근');
    }
  })
  .catch(err=>{
        alert(err.response.data.message)
    }
  );

        //console.log(response.status)
}
