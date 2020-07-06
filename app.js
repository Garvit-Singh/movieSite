// DEFAULT LOAD MOVIES

const random = 'https://imdb-internet-movie-database-unofficial.p.rapidapi.com/search/'+'expendables'

const home = () => {
  axios({
    "method":"GET",
    "url": random,
    "headers":{
    "content-type":"application/octet-stream",
    "x-rapidapi-host":"imdb-internet-movie-database-unofficial.p.rapidapi.com",
    "x-rapidapi-key":"3cc8df150emshe7561d87a4b48ffp13dc9fjsncec9dcd3320b",
    "useQueryString":true
    }
    })
    .then((response)=>{
      // console.log(response)
      response.data.titles.map( movie => {
        newCard(movie.image, movie.title ,movie.id ,'default-section')
      })
    })
    .catch((error)=>{
      console.log(error)
    })
  
}

const newCard = (image,title,imdbID,destination) => {

    const parent = document.getElementById(destination).childNodes[3].childNodes[1]
    // console.log(parent)
// container col 
    const col = document.createElement('div')
    col.setAttribute('class','col-4 col-sm-3 px-1')
// card 
    const card = document.createElement('div')
    card.setAttribute('id',imdbID)
    card.setAttribute('class','card mt-2')
// card image
    const cardImage = document.createElement('img')
    cardImage.setAttribute('class','card-img-top')
    cardImage.src = image
    cardImage.alt = 'No Image'
// card body
    const cardBody = document.createElement('div')
    cardBody.setAttribute('class','card-body m-0 p-0')
// card title
    const cardTitle = document.createElement('p')
    cardTitle.setAttribute('class','card-title p-0 m-0 d-flex justify-content-center overflow-hidden')
    cardTitle.innerHTML = title

// appending one by one
    cardBody.appendChild(cardTitle)
    card.appendChild(cardImage)
    card.appendChild(cardBody)

    // card.onclick = function() {
    //   newPage(imdbID)
    // }
    card.onclick = function() {
      detailSearch(imdbID)
    }

    col.appendChild(card)
    parent.appendChild(col)

  }

  const search = () => {
    // console.log(document.getElementById("searchMovie").value)
    const search= document.getElementById("searchMovie").value
    const searchMovie = 'https://imdb-internet-movie-database-unofficial.p.rapidapi.com/search/'+search
    axios({
      "method":"GET",
      "url": searchMovie,
      "headers":{
      "content-type":"application/octet-stream",
      "x-rapidapi-host":"imdb-internet-movie-database-unofficial.p.rapidapi.com",
      "x-rapidapi-key":"3cc8df150emshe7561d87a4b48ffp13dc9fjsncec9dcd3320b",
      "useQueryString":true
      }
      })
      .then((response)=>{
        // console.log(response)
        const clearParent = document.getElementById('search-section').childNodes[3].childNodes[1]
        while ( clearParent.firstChild ) {
          clearParent.removeChild(clearParent.firstChild)
        }
        response.data.titles.map( movie => {
          newCard(movie.image, movie.title ,movie.id ,'search-section')
        })
      })
      .catch((error)=>{
        console.log(error)
      })
  }

  // const newPage = (id) => {
  //   console.log('newPage function added with',id)
  //   // module.exports = id
  //   window.location.href = './detail/details.html'
  // }

  const detailSearch = (imdbId) => {
    axios({
      "method":"GET",
      "url":"https://imdb-internet-movie-database-unofficial.p.rapidapi.com/film/"+imdbId,
      "headers":{
      "content-type":"application/octet-stream",
      "x-rapidapi-host":"imdb-internet-movie-database-unofficial.p.rapidapi.com",
      "x-rapidapi-key":"3cc8df150emshe7561d87a4b48ffp13dc9fjsncec9dcd3320b",
      "useQueryString":true
      }
      })
      .then((response)=>{
        // console.log(response,'/film data')
        // console.log(document.getElementById('movie-section').childNodes[3].childNodes)
        const clearParent = document.getElementById('movie-section').childNodes[3]
        // console.log(clearParent.firstChild,'first child for clearParent')
        while ( clearParent.firstChild ) {
          // console.log(clearParent.firstChild,'first child for clearParent')
          clearParent.removeChild(clearParent.firstChild)
        }
        detail(response.data)
      })
      .catch((error)=>{
        console.log(error)
      })
  }
  const detail = ( data ) => {
    // console.log(document.getElementById('movie-section').childNodes , `id is ${data.id}`)

    // console.log(document.getElementById('movie-section').childNodes[1].childNodes[1] , 'h tag')
    // console.log(document.getElementById('movie-section').childNodes[3].childNodes , 'div tag')
    document.getElementById('movie-section').childNodes[1].childNodes[1].innerHTML = 'Movie Information'
    const parent = document.getElementById('movie-section').childNodes[3]
    // console.log(parent)
// card 
    const card = document.createElement('div')
    card.setAttribute('class','card mt-2')
// card row
    const cardRow = document.createElement('div')
    cardRow.setAttribute('class','row no-gutters')
// card image div
    const cardImageDiv = document.createElement('div')
    cardImageDiv.setAttribute('class','col-5')
// card image
    const cardImage = document.createElement('img')
    cardImage.setAttribute('class','card-img')
    cardImage.src = data.poster
    cardImage.alt = 'No Image'
// card body div
    const cardBodyDiv = document.createElement('div')
    cardBodyDiv.setAttribute('class','col-7')
// card body
    const cardBody = document.createElement('div')
    cardBody.setAttribute('class','card-body m-0 p-0')
// card title
    const cardTitle = document.createElement('p')
    cardTitle.setAttribute('class','card-title text-warning p-0 m-0 overflow-hidden p-2')
    const titleStrong = document.createElement('strong')
    titleStrong.innerHTML = data.title
    cardTitle.appendChild(titleStrong)
// card plot
    const cardPlot = document.createElement('p')
    cardPlot.setAttribute('class','card-text p-2 m-0')
    cardPlot.innerHTML = data.plot
// card rating
    const cardRating = document.createElement('p')
    cardRating.setAttribute('class','card-text p-2 m-0')
    cardRating.innerHTML = 'Rating: '+ data.rating
// card length
    const cardLength = document.createElement('p')
    cardLength.setAttribute('class','card-text p-2 m-0')
    cardLength.innerHTML = data.length
// card sound
    // const cardSound = document.createElement('p')
    // cardSound.setAttribute('class','card-text')
    // cardSound.innerHTML = data.technical_specs[1]
    // console.log(data.technical_specs)
// card trailer
    const cardTrailer = document.createElement('a')
    cardTrailer.setAttribute('class','btn btn-danger p-2 m-0 ml-2')
    cardTrailer.href = data.trailer.link
    cardTrailer.innerHTML = 'Watch Trailer'

// appending one by one
    cardBody.appendChild(cardTitle)
    cardBody.appendChild(cardPlot)
    cardBody.appendChild(cardRating)
    cardBody.appendChild(cardLength)
    cardBody.appendChild(cardTrailer)
    cardBodyDiv.appendChild(cardBody)
    cardImageDiv.appendChild(cardImage)
    cardRow.appendChild(cardImageDiv)
    cardRow.appendChild(cardBodyDiv)
    card.appendChild(cardRow)
    parent.appendChild(card)

  }
