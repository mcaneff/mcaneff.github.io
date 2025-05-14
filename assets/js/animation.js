document.querySelectorAll("details").forEach((detail) => {
     detail.addEventListener("toggle", (event) => {
       if (event.target.open) {
         event.target.querySelector("div").style.maxHeight = event.target.querySelector("div").scrollHeight + "px";
       } else {
         event.target.querySelector("div").style.maxHeight = "0px";
       }
     });
   });