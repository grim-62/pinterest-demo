function createrdd(){
    var postbtn = document.querySelector("#post-btn");
    var create_post = document.querySelector("#post-upload");
    var flag = 0;
    
    postbtn.addEventListener("click",function(){
        if(flag === 0){
            create_post.style.display = "initial"
            flag = 1
        }else{
            create_post.style.display = "none"
            flag = 0
        }
    })
    
}
function proffff(){
    var editbtn = document.querySelector("#edit-btn");
    var profilr_form = document.querySelector("#profile-upload");
    var flag1 = 0;
    
    editbtn.addEventListener("click",function(){
        if(flag1 === 0){
            profilr_form.style.display = "initial"
            flag1 = 1
        }else{
            profilr_form.style.display = "none"
            flag1 = 0
        }
    })
}

createrdd();
proffff();

function previewBeforeUpload(id){
    document.querySelector("#"+id).addEventListener("change",function(e){
      if(e.target.files.length == 0){
        return;
      }
      let file = e.target.files[0];
      let url = URL.createObjectURL(file);
    //   document.querySelector("#"+id+"-preview div").innerText = file.name;
      document.querySelector("#"+id+"-preview img").src = url;
    });
  }
  
  previewBeforeUpload("file-1");
