console.log("Javascript file is loaded");

const weatherForm = document.querySelector("form");
const inputValue = document.querySelector("input");
const messageOne=document.querySelector('#message-1');
const messageTwo=document.querySelector('#message-2');


weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = inputValue.value;
  messageOne.textContent="Loading..";
  fetch("http://localhost:3000/weather?address="+encodeURIComponent(location))
    .then((res) => {
      res
        .json()
        .then((data) => {
          if (data.error) {
            messageOne.textContent=data.error;
          } else {
            messageTwo.textContent=data.forecast;
            messageOne.textContent=data.location;
           
          }
        })
        .catch((err) => {
          messageTwo.textContent=err;
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
  console.log(location);
});
