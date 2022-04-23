const selection=document.querySelectorAll("select");
const converter=document.querySelector("#converter");
const textfrom=document.querySelector("#text-from");
const textto=document.querySelector('#text-to');
const copy=document.querySelectorAll("i");
console.log(selection);
selection.forEach((tag, index)=>{
    for( let country_code in countries){
        let choice;
        if(country_code=="en-GB" && index==0){
          choice="selected";
        }
        else if(country_code=="ur-PK" && index==1){
            choice="selected";
          }
       
        let option=`  <option value="${country_code}" ${choice}>${countries[country_code]}</option>`;
        tag.insertAdjacentHTML('beforeend',option);
    }
})
converter.addEventListener('click',()=>{
    let text=textfrom.value;
    translatefrom=selection[0].value;
    translateto=selection[1].value;
    let url=`https://api.mymemory.translated.net/get?q=${text}!&langpair=${translatefrom}|${translateto}`;
    fetch(url).then(res => res.json()).then((data)=>{
        console.log(data);
        console.log(data.responseData.translatedText);
        textto.value=data.responseData.translatedText;
    })

})
console.log(copy[0]);
copy.forEach(elem =>{
    elem.addEventListener('click',({target})=>{
        if(target.classList.contains('fa-copy')){
            if(target.id=="copy0"){
                navigator.clipboard.writeText(textfrom.value);
            }
            else{
                navigator.clipboard.writeText(textto.value);
            }
        }
        else{
            let utterance;
            if(target.id=="from"){
               
                utterance= new SpeechSynthesisUtterance(textfrom.value);
                utterance.lang=selection[0].value;
            }
            else{

                    utterance= new SpeechSynthesisUtterance(textto.value);
                    utterance.lang=selection[1].value;
            }
            speechSynthesis.speak(utterance);
        }
    })
})