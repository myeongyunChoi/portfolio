const s_title = document.getElementsByClassName("site_title");
const s_title_arr = [];
let current = 0;

s_title[current].style.opacity = 1;
for (let j = 0; j < s_title.length; j++) {
    splitLetters(s_title[j]);
}

function splitLetters(s_title) {
    let content = s_title.innerHTML;
    s_title.innerHTML = '';
    let letters = [];
    //s_site를 비워내고 빈 배열 준비
    for (let j = 0; j < content.length; j++) {
        let letter = document.createElement('span');
        letter.className = 'letter';
        letter.innerHTML = content.charAt(j);
        s_title.appendChild(letter);
        letters.push(letter);
    }
    //s_site의 문장을 글자로 나눈 후 class를 할당, 비어있던 배열에 담음
    s_title_arr.push(letters);
    //글자를 모아서 상위 배열에 담음
}

function changeTitle() {

    let cw = s_title_arr[current];
    let nw = current == s_title.length - 1 ? s_title_arr[0] : s_title_arr[current + 1];
    let bw = current == s_title.length - 2 ? s_title_arr[0] : s_title_arr[current + 2];
    // current 가 s_title.length와 같으면 a 아니면 b

    for (let j = 0; j < cw.length; j++) {
        animateLetterOut(cw, j);
    }

    for (let j = 0; j < bw.length; j++) {
        animateLetterUpOut(bw, j);
    }

    for (let j = 0; j < nw.length; j++) {
        nw[j].className = `letter behind`;
        nw[0].parentElement.style.opacity = 1;
        animateLetterIn(nw, j);
    }

    current = (current == s_title_arr.length - 1) ? 0 : current + 1;
}

function animateLetterOut(cw, j) {
    setTimeout(function () {
        cw[j].className = 'letter out';
    }, j * 50);
}


function animateLetterIn(nw, j) {
    setTimeout(function () {
        nw[j].className = 'letter in';
    }, 340 + (j * 50));
}

function animateLetterUpOut(bw, j) {
    setTimeout(function () {
        bw[j].className = 'letter out';
    }, j * 50);
}


window.addEventListener("scroll", (e) => {

    const win_hi = window.innerHeight;

    const img_over = document.querySelector(".img_overlay");
    const img_box = document.querySelector(".imgbox");
    const middle_li = document.querySelector(".middle_line");
    const pj = document.getElementById("project");
    const pj_top = pj.offsetTop;

    let win_top = window.scrollY;
    let zoom_val = win_top - (win_hi + 200);
    let amount = 0;

    if (win_top >= win_hi) {
        img_over.style.background = "white";
        if (win_top >= win_hi + 200) {
            zoom();
        }
    } else {
        img_over.style = "";
    }

    function zoom() {
        amount = 1 + zoom_val * 0.003;
        opa = 1 - zoom_val * 0.001;
        line = zoom_val * 0.037;

        img_box.style.transform = `scale(${amount},${amount})`;
        img_box.style.opacity = `${opa}`;

        if (opa <= 0) {
            img_box.style = ``;
            img_box.style.display = `none`;
            middle_li.style.opacity = `1`;
            if (line >= 95) {
                line = 95;
            } else if (line <= 5) {
                line = 5;
            }
            middle_li.style.width = `${line}%`;
        } else {
            img_box.style.display = `block`;
            middle_li.style.opacity = `0`;
        }

    }

    //프로젝트

    if (win_top >= pj_top) {
        pj.style.opacity = `1`;
    } else {
        pj.style = ``;
    }

    const site_li = document.querySelectorAll(".site_view li");
    const ss = site_li[0].clientHeight;
    const site_img_li = document.querySelectorAll(".site_img_box");
    const site_img = document.querySelectorAll(".site_img_box img");
    const site_txt = document.querySelectorAll(".site_txt");
    const site_na = document.querySelectorAll(".site_name");
    const site_ex = document.querySelectorAll(".site_explanation");
    const site_more = document.querySelector(".site_more");

    const site_link = [
        "https://myeongyunchoi.github.io/hotel/",
        "https://myeongyunchoi.github.io/flower/",
        "https://myeongyunchoi.github.io/book/",
        "https://myeongyunchoi.github.io/project2/",
        "https://myeongyunchoi.github.io/project1/"
    ]

    let img_zoom = 0;
    let num = 0;


    const siteNameOut = i => {
        for (let j = 0; j < site_na.length; j++) {
            site_na[j].classList.add("fade_out");
            site_ex[j].classList.add("fade_out");
        }
        site_na[i].classList.remove("fade_out");
        site_ex[i].classList.remove("fade_out");
    }


    //siteli_img가 site_li보다 하나 더 적음 1부터 for문을 시작함
    for (let i = 1; i < site_li.length; i++) {

        let li_first_top = site_li[1].offsetTop + pj_top - (win_hi * 0.38);
        let li_top = site_li[i].offsetTop + pj_top - (win_hi * 0.38);
        //부모 요소 탑 값에 자식 요소 탑값을 더한 값

        //s_title 변경 함수 호출

        if (window.scrollY > li_top && window.scrollY < li_top + 50) {
            current = i - 1;
            changeTitle();
            siteNameOut(i);
        }

        if (win_top < li_first_top) {
            site_na[0].classList.remove("fade_out");
            site_na[1].classList.add("fade_out");
            site_ex[1].classList.add("fade_out");
        }

        if (win_top >= li_top - win_hi) {
            img_zoom = li_top / (win_top - 500);
            site_img[i - 1].style.transform = `rotate3d(1, 0, -1, 33deg) scale(${img_zoom})`;
        }

        if (win_top >= li_top) {
            site_img_li[i - 1].style.transform = `skew(0deg, 0deg)`;
            site_img_li[i - 1].style.marginTop = `0`;
            middle_li.style.width = `42%`;

            site_txt[i - 1].style.transform = `skew(0deg, 0deg)`;
            site_txt[i - 1].style.marginTop = `0`;

            site_more.setAttribute("href", site_link[i - 1]);

        } else {
            site_img_li[i - 1].style = ``;
            site_txt[i - 1].style = ``;
        }
    }

    const site_over = document.querySelectorAll(".site_overlay");
    const site_vi = document.querySelectorAll(".site_visit");

    for (let i = 0; i < site_img_li.length; i++) {
        site_img_li[i].addEventListener("mouseover", () => {
            site_over[i].style.opacity = `0.5`;
            site_vi[i].classList.add("fade_in");
        });
        site_img_li[i].addEventListener("mouseout", () => {
            site_over[i].style = ``;
            site_vi[i].classList.remove("fade_in");
        });
    }


    const contec = document.querySelector("#contec");
    const contec_top = contec.offsetTop;

    if (win_top > contec_top - win_hi) {
        middle_li.style.width = `1%`;
    }

    const contec_ul = document.querySelectorAll("#contec ul");
    // console.log(contec_ul);

    for(let i = 0; i < contec_ul.length; i++){

        const con_ul_top = contec_ul[i].offsetTop - (win_hi*0.9);

        if (win_top >= con_ul_top){
            contec_ul[i].classList.remove(`slide_down`);
            middle_li.style.width = `${i*40}%`;
        }else{
            contec_ul[i].classList.add(`slide_down`);
        }
    }
})
