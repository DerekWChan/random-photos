// Access key for Unsplash API
const apiKey = (() => {
  let apiKeyValue = '5ef766a4a50313a27c2d596e64ef4087ad39e9ddcc9ae9c8cd6fe96e33840921';
  return {
    get val() {
      return apiKeyValue;
    }
  }
})();

// GET data from Unsplash API given an endpoint
const getData = async (endpoint) => {
  const unsplashApi = 'https://api.unsplash.com';

  try {
    const response = await fetch(`${unsplashApi}${endpoint}`, {
      headers: {
        'Content-type': 'application/json',
        'Accept-Version': 'v1',
        'Authorization': `Client-ID ${apiKey.val}`
      }
    });

    if(response.ok) {
      let data = await response.json();
      return data;
    }
  }
  catch(error) {
    alert(error);
    console.log(error);
  }
};

// Initializes page by populating with photos
const initPhotos = (() => {
  const photos = document.getElementById('photos');

  getData('/photos/random?count=25').then(photoArray => {
    photoArray.forEach(photo => {
      getData(`/users/${photo.user.username}`).then(user => {
        photos.insertAdjacentHTML(
          'beforeend',
          `<div class="photos_card">
            <img src="${photo.urls.small}" />
            <div class="photos_card-info">
              "${photo.description}"
              <br>
              by <a href="${user.links.html}">${user.username}</a>
            </div>
          </div>`
        );
      });
    });
  });
})();

// Test photo initialization if Unsplash API reaches rate limit
// const initPhotos = (() => {
//   const photos = document.getElementById('photos');
//   const photoArray = [
//     'https://i.redd.it/57u0ev5grcs11.jpg',
//     'https://i.redd.it/0rklmwkorcs11.png',
//     'https://i.redd.it/ymdtk2jp1fs11.jpg',
//     'https://i.redd.it/y3s2lfxwi8s11.jpg',
//     'https://i.redd.it/s1n35a58ipl01.jpg',
//     'https://i.redd.it/ea3s2oi6ccs11.jpg',
//     'https://i.redd.it/bmrydxcny8s11.jpg',
//     'https://i.imgur.com/ar3ZSph.jpg',
//     'https://i.redd.it/690jdg7oofs11.jpg',
//     'https://i.redd.it/s1fhstp9qcs11.jpg',
//     'https://i.redd.it/t7e1ytak8fs11.jpg',
//     'https://i.redd.it/048t40u9lbs11.jpg',
//     'https://i.imgur.com/HiqrxYM.jpg',
//     'https://i.redd.it/ptgjxq5sofs11.jpg',
//     'https://i.redd.it/ft4z4agxnes11.jpg',
//     'https://cdna.artstation.com/p/assets/images/images/013/401/682/large/tatiana-hordiienko-1small.jpg',
//     'https://i.redd.it/c4aq9zfffes11.jpg',
//     'https://i.redd.it/sbmpf59xmfs11.jpg',
//     'https://i.redd.it/bipv4oxwyfs11.jpg',
//     'https://i.imgur.com/ycIKRAw.jpg'
//   ];
//
//   photoArray.forEach(photo => {
//     photos.insertAdjacentHTML(
//       'beforeend',
//       `<div class="photos_card">
//       <img src="${photo}" />
//         <div class="photos_card-info">
//           "photo.description"
//           <br>
//           by <a href="user.links.html">user.username</a>
//         </div>
//       </div>`
//     );
//   });
// })();
