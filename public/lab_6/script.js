// You may wish to find an effective randomizer function on MDN.

function range(int) {
  const arr = [];
  for (let i = 0; i < int; i += 1) {
    arr.push(i);
  }
  return arr;
}

function sortFunction(a, b, key) {
  if (a[key] < b[key]) {
    return -1;
  } if (a[key] > b[key]) {
    return 1;
  }
  return 0;
}

document.body.addEventListener('submit', async (e) => {

  e.preventDefault(); // this stops whatever the browser wanted to do itself.
  const form = $(e.target).serializeArray(); // here we're using jQuery to serialize the form
  fetch('/api', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(form)
  })
    .then((fromServer) => fromServer.json())
    .then((fromServer) => {
      // You're going to do your lab work in here. Replace this comment.

      console.log('fromServer', fromServer);
      //clear the form available first.. 
      if(document.querySelector(".flex-inner")){
        document.querySelector(".flex-inner").remove();
      }

      //Get ten random countries and mapping them... 
      const arr = range(10);
      const arrCountries = arr.map(() => {
        const num = Math.floor(Math.random() * 243);
        //getRandomIntInclusive(0, 243);
        return fromServer[num];
      });
        
      const sortRevList = arrCountries.sort((a, b) => sortFunction(b, a, "name"));
      /*sortByKey(org, compare, "name"));*/
      
      const ol = document.createElement("ol");
      ol.className = "flex-inner";
      $("form").prepend(ol);

      // now append the list elements
      sortRevList.forEach((el, i) => {
        const newList = document.createElement("li");
        $(newList).append(`<input type = "checkbox" value = ${el.code} id = ${el.code} />`);
        $(newList).append(`<label for = ${el.code} > ${el.name} </label>`);

        $(ol).append(newList);
      });
   
    })
    .catch((err) => console.log(err));
  });