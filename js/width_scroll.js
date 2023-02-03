window.onload = () => {

    const open_page = document.getElementById("open_page");
    const page_piece = document.querySelectorAll("#open_page div");
    const left_piece = document.querySelector(".left_page");
    const hook = document.querySelector(".hook");
    const right_piece = document.querySelector(".right_page");

    const about_t = document.querySelector(".about_title");
    const about_c = document.querySelector(".about_contents");
    const arrow = document.querySelector(".arrow");

    open_page.addEventListener("wheel", function openPage(e) {

        if (win_top == 0) {
            e.preventDefault();
        }

        if (e.deltaY > 0) {
            hook.style.transform = `translateY(-100%)`;

            setTimeout(function () {
                left_piece.style.transform = `translatex(-100%)`;
                right_piece.style.transform = `translatex(100%)`;

                setTimeout(function () {
                    open_page.style.display = `none`;
                    show_name();
                }, 1000)
            }, 1000)
        }

        //about_title 효과
        function show_name() {
            about_t.classList.add("fade_in");
            setTimeout(function () {
                about_t.classList.remove("about_title");
                about_t.classList.add("about_slide");
                about_c.classList.add("fade_in");
                arrow.classList.add("fade_in");
            }, 1200);
        }
    });


    const skill_wrap = document.getElementById("skill_wrap");
    const skill_wrap_wid = skill_wrap.clientWidth;
    const skill = document.querySelector(".skill");
    const skill_wid = skill.clientWidth;
    const max_mov = (skill_wid - skill_wrap_wid) * -1;
    const win_wi = window.innerWidth;
    const detail = document.querySelector(".detail");
    const detail_overlay = document.querySelector(".detail_overlay");
    const active = document.querySelectorAll(".active");
    const active_txt = document.querySelectorAll(".active_txt h4");
    const a_title = document.querySelector(".active_title");
    //가로스크롤 최대값

    let win_top = window.scrollY;
    let move = 0;
    let mi_mo = 0;
    let li_pos = 0;


    skill_wrap.addEventListener("wheel", (e) => {

        if (move > max_mov) {
            e.preventDefault();
        }//가로 스크롤이 끝날 때까지 스크롤 기본 이벤트를 제한

        if (window.scrollY <= 0) {
            move -= e.deltaY;
            if (move <= max_mov) {
                move = max_mov;
            } else if (move >= 0) {
                move = 0
            }
            skill.style.transform = `translateX(${move}px)`;
            li_upDown(move);
        }//휠값마다 skill의 가로 값을 변화

        if (move < (win_wi / 2) * -1) {
            detail.classList.add("fade_in");
            detail_overlay.style.width = `100%`;
            skill_wrap.style.background = `#000`;
            a_title.style.color = `#ffffff`;
            setTimeout(function () {
                detail_overlay.style.left = `100%`;
            }, 500);
        } else {
            detail.classList.remove("fade_in");
            detail_overlay.style.width = `0`;
            detail_overlay.style.left = `0`;
            skill_wrap.style.background = `#ffffff`;
            a_title.style.color = `#000`;
        }

        function li_upDown(move) {
            li_pos = move;
            for (let i = 0; i < active.length; i++) {
                if (i % 2 != 0) {
                    active[i].style.transform = `translateY(${li_pos / (i * 7)}px)`;
                } else {
                    active[i].style.transform = `translateY(${-li_pos / (i * 7)}px)`;
                }
            }
        }//홀수와 짝수를 구분 후 휠마다 각각 위치 값을 변환 active의 높이를 변경

        for (let i = 0; i < active_txt.length; i++) {
            let active_txt_left = active_txt[i].offsetLeft / 2 + win_wi;
            if (move < active_txt_left * -1) {
                active_txt[i].style.opacity = `1`;
                active_txt[i].style.transform = `translateX(-15rem)`;
            } else {
                active_txt[i].style = ``;
            }

            const chart_in = document.querySelectorAll(".chart_inner");
            for (let j = 0; j < chart_in.length; j++) {
                if (move < win_wi * 2 * -1) {
                    skill_wrap.style.background = `#ffffff`;
                    a_title.style.color = `#000`;
                    active_txt[i].style.color = `#000`;
                    chart_in[j].style.background = `#ffffff`;
                } else {
                    active_txt[i].style.color = `#ffffff`;
                    chart_in[j].style.background = `#000`;
                }
            }
        }

    });


    const chart = document.querySelectorAll(".chart");
    const act_img = document.querySelectorAll(".active img");

    for (let c = 0; c < chart.length; c++) {
        chart[c].addEventListener("mouseenter", (e) => {

            act_img[c].style.filter = `grayscale(0%)`;
            let percent = 0;

            if (c == 0) {
                percent = 95;
            }

            if (c == 1) {
                percent = 95;
            }

            if (c == 2) {
                percent = 90;
            }

            if (c == 3) {
                percent = 80;
            }

            if (c == 4) {
                percent = 80;
            }

            if (c == 5) {
                percent = 70;
            }

            if (c == 6) {
                percent = 70;
            }

            if (c == 7) {
                percent = 70;
            }

            let i = 0;
            // setInterval(function () {
            //     if (i <= percent) {
            //         perc(i);
            //         i++;
            //     }
            // }, 10);
        })

        // function perc(i) {
        //     if (c === 0) {
        //         chart[c].style.background = `conic-gradient(#ee5050 0% ${i}%, #dedede ${i}% 100%)`;
        //     }
        //     if (c === 1) {
        //         chart[c].style.background = `conic-gradient(rgb(19, 38, 186) 0% ${i}%, #dedede ${i}% 100%)`;
        //     }
        //     if (c === 2) {
        //         chart[c].style.background = `conic-gradient(rgb(186, 19, 153) 0% ${i}%, #dedede ${i}% 100%)`;
        //     }
        //     if (c === 3) {
        //         chart[c].style.background = `conic-gradient(rgb(255, 243, 80) 0% ${i}%, #dedede ${i}% 100%)`;
        //     }
        //     if (c === 4) {
        //         chart[c].style.background = `conic-gradient(rgb(6, 2, 84) 0% ${i}%, #dedede ${i}% 100%)`;
        //     }
        //     if (c === 5) {
        //         chart[c].style.background = `conic-gradient(rgb(90, 253, 90) 0% ${i}%, #dedede ${i}% 100%)`;
        //     }
        //     if (c === 6) {
        //         chart[c].style.background = `conic-gradient(rgb(56, 148, 247) 0% ${i}%, #dedede ${i}% 100%)`;
        //     }
        //     if (c === 7) {
        //         chart[c].style.background = `conic-gradient(rgb(65, 4, 4) 0% ${i}%, #dedede ${i}% 100%)`;
        //     }
        // }
    }
}