const ques = [
    {
        Q: 'My Name is _____________?',
        options: ['Om Ji Trivedi', 'Harshit Rathi', 'Ashish Chhokar', 'Yash Kaushik']
    },
    {
        Q: 'Which is the front-end framework?',
        options: ['Radius', 'Python', 'Node.js', 'HTML']
    },
    {
        Q: 'Which is a JavaScript framework?',
        options: ['HTML', 'React.js', 'SASS','CSS']
    },
    {
        Q: 'what is the name of your youtube channel',
        options: ['Freecode', 'Pandit ji', 'Coder','HTML Pointer']
    },
    {
        Q: 'You have completed Successfully!',
        options: []
    }
]

const ans = ['Yash Kaushik','HTML','React.js', 'Pandit Ji'];

const question = document.querySelector('#ques');
const next = document.querySelector('#nxt');
const opt = document.querySelectorAll('.box2');
const tryagn = document.querySelector('.btn');


let m=0;

next.addEventListener('click', ()=>{
    m+=1;
    quiz();
    if(m== ques.length-1){
        document.querySelector('.ans').style.display = 'none';
        next.style.display = 'none';
        document.querySelector('.hding').style.display = 'none';
    }
})

function quiz(){
    question.innerHTML = ques[m].Q;

    for(let i=0; i<opt.length; i++)
        opt[i].innerHTML = ques[m].options[i];
        opt[i].parentElement.style.backgroundColor = 'gray';
        next.style.display = 'none';    
}
    for(item of opt){
        item.addEventListener('Click', (e)=> {
            let value = e.target.innerText;

            if(value == ans[m]){
                e.target.parentElement.style.backgroundColor ='green';
                next.style.display = 'flex';
            }
            else{
                document.querySelector('.box').style.display = 'none';
                e.target.parentElement.style.backgroundColor = 'red';
                document.querySelector('.win').style.display = 'block';
                document.querySelector('.btn').style.display = 'flex';
            }
        })
    }

tryagn.addEventListener('click', ()=>{
location.reload(true);
})

quiz();