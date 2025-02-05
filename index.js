let currentIndex = 0
let pageList = ['home', 'project', 'website', 'about', 'other']
let pageContent = []

let main = document.querySelector('main')
let loading = document.querySelector('.template').innerHTML

main.innerHTML = loading

fetch('./profile-3d-contrib/profile-green-animate.svg').then(res => {
    res.text().then(svg => {
        svg = svg.replace('<svg', '<svg style="width: 100%;height: auto;"')
        svg = svg.replace('<style>* { font-family: "Ubuntu", "Helvetica", "Arial", sans-serif; }</style>', '')
        svg = svg.replace('<rect x="0" y="0" width="1280" height="850" fill="#ffffff"></rect>', '')
        svg = svg.replace('<text style="font-size: 16px;" x="1260"', '<text style="font-size: 24px;" x="1260"')
        main.innerHTML = svg

        pageContent[0] = svg
    })
})


document.querySelectorAll('header nav .item').forEach((item, index) => {
    item.addEventListener('click', () => {
        document.querySelectorAll('header nav .item')[currentIndex].classList.remove('active')
        item.classList.add('active')
        currentIndex = index
        if (pageContent[index]) return main.innerHTML = pageContent[index]

        main.innerHTML = loading
        fetch(`./${pageList[index]}.html`).then(res => {
            res.text().then(html => {
                main.innerHTML = html
                pageContent[index] = html
            })
        })
    })
})