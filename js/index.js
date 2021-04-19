document.addEventListener("DOMContentLoaded", function () {
    fetchBooks()
    clickBooks()
    //likebooks()

});

function fetchBooks(page) {
    let bseURL = 'http://localhost:3000/books'
    return fetch(`${bseURL}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    })
        .then(res => res.json())
        .then(json => {
            json.forEach(e => {
                showBooks(e)

            })
        })
}
const uL = document.getElementById('list')
const show = document.getElementById('show-panel')
const book = document.getElementById('bookImg')
const liked = document.getElementById('likes')
const likeButton = document.getElementById('likebtn')

function showBooks(a) {
    let newli = document.createElement('li')
    uL.appendChild(newli)
    newli.innerHTML = a.title
    newli.value = a.id
}

function clickBooks() {
    uL.addEventListener('click', function (e) {
        showpanelfetch(e.target.value)
    })
}

function showpanelfetch(a) {
    let bseURL = 'http://localhost:3000/books/'
    return fetch(`${bseURL}${a}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    })
        .then(res => res.json())
        .then(json => {
            document.querySelector('#show-panel').innerHTML = '',
                showpanel(json)
        })
}

function showpanel(a) {
    const arry = a.users
    let likedArray=[]
    book.src = a.img_url
    let imag = document.createElement('image')
    let title = document.createElement('h2')
    let subTitle = document.createElement('h3')
    let author = document.createElement('h3')
    let details = document.createElement('p')
    show.appendChild(imag)
    show.appendChild(title)
    show.appendChild(subTitle)
    show.appendChild(author)
    show.appendChild(details)
    imag.src = a.img_url
    title.innerHTML = a.title
    subTitle.innerHTML = a.subtitle
    author.innerHTML = a.author
    details.innerHTML = a.description
    likeButton.value = a.id
    arry.forEach(i => {
        let lii = document.createElement('li')
        liked.appendChild(lii)
        lii.innerHTML = i.username
        likedArray.push(i)
    })

    likeButton.addEventListener('click',function(e){
        likedArray.push({"id":1, "username":"pouros"})
        pATCHLike(e.target.value,likedArray);
    })


}

function  pATCHLike(id,userArray){
    data={
        "users": userArray
      }
    fetch(`http://localhost:3000/books/${id}`, {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(data),
      })
        .then(response => response.json())
        .then(json => console.log(json))
}