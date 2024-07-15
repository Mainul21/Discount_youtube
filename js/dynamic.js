function datafetch() {
  fetch("https://openapi.programming-hero.com/api/videos/categories")
    .then((response) => response.json())
    .then((data) => {
      category = data.data;
      displayButton(category);
    });
}

function videofetch(id = "1001") {
  const url = `https://openapi.programming-hero.com/api/videos/category/${id}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      displayVideo(data);
    });
}

function displayVideo(data) {
  const videos = data.data;
  const videofield = document.getElementById("video_container");
  videofield.innerHTML = ''; // Clear previous content (videos or error messages)

  if (data.status === false) {
    const errorfield = document.createElement('div');
    errorfield.classList.add('text-center', 'text-red-500', 'font-bold', 'text-xl');
    errorfield.innerHTML = `<p>NOT FOUND</p>`;
    videofield.appendChild(errorfield);
    return; // Exit the function to avoid appending videos if there's an error
  }

  videos.forEach((video) => {
    const videocard = document.createElement("div");
    videocard.classList.add("card", "bg-base-100", "shadow-xl", "m-4");
    videocard.style.width = '100%'; // Ensure the card takes full width in the grid

    videocard.innerHTML = `
      <figure>
        <img src="${video.thumbnail}" alt="Video Thumbnail" class="w-full h-48 object-cover"/>
      </figure>
      <div class="card-body">
        <h2 class="card-title flex items-center">
          <div class="avatar mr-4">
            <div class="w-10 rounded-full">
              <img src="${video.authors[0].profile_picture}" />
            </div>
          </div> 
          <div class="font-bold text-2xl">${video.title}</div>
        </h2>
        <div class="mt-2 ml-14">
          <p class="text-sm">${video.authors[0].profile_name}</p>
          <p class="text-sm">${video.others.views} Views</p>
        </div>
      </div>
    `;
    videofield.appendChild(videocard);
  });
}

function displayButton(infos) {
  const catField = document.getElementById("category_container");
  catField.innerHTML = ''; // Clear previous buttons

  infos.forEach((info) => {
    const btns_div = document.createElement("div");
    btns_div.innerHTML = `
      <button class="btn btn-outline btn-error ml-2 mr-2" id="${info.category_id}">${info.category}</button>
    `;
    catField.appendChild(btns_div);

    btns_div.querySelector("button").addEventListener("click", () => {
      videofetch(info.category_id);
    });
  });
}

datafetch();
videofetch();
