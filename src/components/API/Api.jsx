import axios from "axios";

export async function postCommentData (value){
    await axios.post(`https://test.ground.yourssu.com/timetable/v1/ssurank/${value.path}`,value.data,{headers:value.headers})
    .then(response=>{
      alert(value.message)
      window.location.reload(false);
    })
    .catch(err=>{
          alert(err.response.data.message)
      }
    );
};
