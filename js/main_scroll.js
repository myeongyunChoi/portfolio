const sl_wra = document.getElementById("wrapper")
const cont_1 = document.getElementById('cont_1');
const cont_2 = document.getElementById('cont_2');
const slider = document.getElementById('slider');
const gui = document.querySelector('#guide')
const s_wid = slider.offsetWidth;
const s_li = slider.children;

let win_wid = window.innerWidth;
let s_move_max = (s_wid - (win_wid*0.9)) * -1;
let s_pos = 0;
let li_pos = 0;



// gui.addEventListener('wheel',function(e){
//     e.preventDefault;
//     if(e.deltaY > 0){
//         sl_wra.style.top = `-100%`;
//     }
// });

cont_1.addEventListener('wheel',function(e){
    e.preventDefault;
    if(e.deltaY > 0){
        cont_2.style.top = `0%`;
    }
});

//휠이 굴러가면 탑0 wrapper이 position 가지고 있음




function move_slider(amount){
    s_pos -= amount;
    if(s_pos < s_move_max){
        s_pos = s_move_max;
        return;
    }else if(s_pos >= 0){
        s_pos = 0;
        return;
    }
    slider.style.transform = `translateX(${s_pos}px)`;
    li_upDown(amount);
    
}

cont_2.addEventListener('wheel',function(e){
    e.preventDefault;
    if(e.deltaY < 0 && s_pos == 0){
            cont_2.style.top = `100%`;
            cont_1.style.top = `0`;
        return;
    }
    move_slider(e.deltaY);
});

function li_upDown(amount){
    li_pos += amount;
    for(let i=0; i<s_li.length; i++){
        if(i%2 != 0){
            s_li[i].style.transform = `translateY(${li_pos / (i*7)}px)`;
        }else{
            s_li[i].style.transform = `translateY(${-li_pos / (i*7)}px)`;
        }
    }
}
