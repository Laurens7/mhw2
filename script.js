/* TODO: inserite il codice JavaScript necessario a completare il MHW! */


function cliccato(event){
  const contenitore=event.currentTarget
  let i=9;
  let j=9;
  const index=listaRisposte.indexOf(contenitore);
  listaRisposte.splice(index,0,contenitore);
  listaRisposte.splice(index+1,1);
  i=i*(parseInt(contenitore.dataset.questionId)-1);
  
  while(i<j*parseInt(contenitore.dataset.questionId)){  
    if(listaRisposte[i].childNodes[5]){
      listaRisposte[i].childNodes[3].classList.remove('hidden');
      listaRisposte[i].childNodes[5].remove();
      listaRisposte[i].classList.remove('scelta');
    }
    i++;
  };
 
  contenitore.childNodes[3].classList.add('hidden');
  contenitore.classList.add('scelta');
  contenitore.parentNode.classList.add('opacità');
  const image=document.createElement('img');
  image.src = 'images/checked.png';
  image.classList.add('checkbox');
  contenitore.appendChild(image);
  const risposte=document.querySelectorAll('.scelta');

  if(risposte.length===3){
    for(const box of boxes){
      box.removeEventListener('click', cliccato)
    }
    eventoRisposte(risposte);
  }
}


function Ricomincia(event){
  for(const box of boxes){
    
    if(box.childNodes[5]){
      box.childNodes[5].remove();
      box.childNodes[3].classList.remove('hidden');
    }
    box.classList.remove('scelta');
    box.parentNode.classList.remove('opacità');
    box.addEventListener('click',cliccato);
  }
  event.currentTarget.parentNode.classList.add('hidden');
  event.currentTarget.parentNode.innerHTML='';

}

function eventoRisposte(scelte){

  if(scelte[0].dataset.choiceId!==scelte[1].dataset.choiceId &&
  scelte[0].dataset.choiceId!==scelte[2].dataset.choiceId   &&
  scelte[1].dataset.choiceId!==scelte[2].dataset.choiceId){
    comparsaPersonalità(scelte[0].dataset.choiceId);
  
  }
  
  for(let key in RESULTS_MAP){
    if((key===scelte[0].dataset.choiceId && key===scelte[1].dataset.choiceId)
    ||(key===scelte[0].dataset.choiceId && key===scelte[2].dataset.choiceId)
    ||(key===scelte[1].dataset.choiceId && key===scelte[2].dataset.choiceId)){  
      comparsaPersonalità(key)   
    }
  }
}


function comparsaPersonalità(key){
  const sezioneRisposta=document.querySelector('#risultato');
  sezioneRisposta.classList.remove('hidden');

  for(let personalità in RESULTS_MAP[key]){  
    if(personalità==='title'){
      const titolo=document.createElement('h2');
      titolo.textContent=RESULTS_MAP[key][personalità];
      sezioneRisposta.appendChild(titolo);
    }
    if(personalità==='contents'){
      const paragrafo=document.createElement('p');
      paragrafo.textContent=RESULTS_MAP[key][personalità];
      sezioneRisposta.appendChild(paragrafo);
      const bottone=document.createElement('button');
      bottone.textContent='Ricomincia il quiz';
      sezioneRisposta.appendChild(bottone);
      bottone.addEventListener('click',Ricomincia);
    }
  }

}



const listaRisposte=[];
const risposte=document.querySelectorAll('.scelta');
const boxes=document.querySelectorAll('.choice-grid div');


for(const box of boxes){
  box.addEventListener('click',cliccato);
  listaRisposte.push(box);
}
