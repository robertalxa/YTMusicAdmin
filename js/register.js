const divRegisterTitleArtist = document.getElementById('titleCadArtist');
const divRegisterTitleMusic = document.getElementById('titleCadMusic');
const divRegisterFormArtist = document.getElementById('formCadArtist');
const divRegisterFormMusic = document.getElementById('formCadMusic');
const divRegisterArtistIcon = document.getElementById('iconRegisterArtist');
const divRegisterMusicIcon = document.getElementById('iconRegisterMusic');
const btnSaveArtist = document.getElementById('btnSaveArtist');
const btnSaveMusic = document.getElementById('btnSaveMusic');

const previousPic = document.getElementById('previousPic');
const profilePicture = document.getElementById('profilePicture');
const coverPic = document.getElementById('coverPic');
const coverPicture = document.getElementById('coverPicture');
const musicArchive = document.getElementById('musicArchive');

let picSelected64 = null;
let coverPicSelected64 = null;
let musicFileSelected = null;
let profPicFile = null;
let coverPicFile = null;
let musicFile = null;

profilePicture.addEventListener('change', (e)=> listenerInputPicture(e, 'profile'));
coverPicture.addEventListener('change', (e)=> listenerInputPicture(e, 'music'));
musicArchive.addEventListener('change', (e)=> musicFileSelected = e.target.files[0]);

function listenerInputPicture(e, picWhat = undefined){
    const file = e.target.files[0];
    if(file === undefined)return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
        // Aqui temos a sua imagem convertida em string em base64.
        console.log(reader.result);
        const imgBase64 = reader.result;

        if(picWhat === 'profile'){
            previousPic.src = imgBase64;
            picSelected64 = imgBase64;
        }else if(picWhat === 'music'){
            coverPic.src = imgBase64;
            coverPicSelected64 = imgBase64;
        }
    };
}

function fillOutArtistList(){
    document.getElementById('artistsList').innerHTML = `
    <option value="Ariana Grande">
    <option value="Eminem">
    <option value="Boogie">
    <option value="50 Cent">
    <option value="Tupac">
    `;
}

fillOutArtistList();

let controlDivRegisterArtist = false;
let controlDivRegisterMusic = false;
let booleanControls = {
    'true' : {display:'none', icon:'../assets/img/white-plus.png'},
    'false': {display:'flex', icon:'../assets/img/white-minus.png'}
}

function changeDisplayDivRegister(changingWhat = undefined){
    if(changingWhat === 'artist'){
        const actualBool = booleanControls[controlDivRegisterArtist.toString()];
        divRegisterFormArtist.style.display = actualBool.display;
        divRegisterArtistIcon.src = actualBool.icon;
        controlDivRegisterArtist = !controlDivRegisterArtist;
    }else if(changingWhat === 'music'){
        const actualBool = booleanControls[controlDivRegisterMusic.toString()];
        divRegisterFormMusic.style.display = actualBool.display;
        divRegisterMusicIcon.src = actualBool.icon;
        controlDivRegisterMusic = !controlDivRegisterMusic;
    }
}

function inputsValidate(savingWhat = undefined){
    let inputsToValidate = [];
    if(savingWhat === 'artist'){
        const artistName= document.getElementById('artistName');
        const summary   = document.getElementById('summary');
        const genre     = document.getElementById('genre');

        inputsToValidate = [artistName, summary, genre];
        
        for(input of inputsToValidate) input.style.border = '0px';
        const validationReturn = validation(inputsToValidate);
        if(typeof validationReturn === 'object') {
            showMessageInputs(validationReturn);
            return;
        }

        if(!picSelected64){
            alert('Please, upload a photo of the artist!');
            return
        }
            

        console.log('You can save the Artist');

        //setar os campos de arquivo como vazios
        picSelected64           = null;
        previousPic.src         = '../assets/img/cinza.jpg';
        profilePicture.value    = '';
        artistName .value = '';
        summary    .value = '';
        genre      .value = '';
    }else if(savingWhat === 'music'){
        const musicName        = document.getElementById('musicName');
        const artistSelected   = document.getElementById('artistSelected');

        inputsToValidate = [musicName, artistSelected];

        for(input of inputsToValidate) input.style.border = '0px';
        const validationReturn = validation(inputsToValidate);
        if(typeof validationReturn === 'object') {
            showMessageInputs(validationReturn);
            return;
        }

        if(!musicFileSelected){
            alert('Please, select the music file!');
            return;
        }

        console.log('You can save the Music');

        //setar os campos de arquivo como vazios
        coverPicSelected64  = null;
        musicFileSelected   = null;
        coverPic.src        = '../assets/img/cinza.jpg';
        coverPicture.value  = '';
        musicName      . value = '';
        artistSelected . value = '';
        musicArchive   . value = '';
    }

}

function showMessageInputs(inputs){
    let msg = 'Please! Fill out the inputs: ';
    for(input of inputs) msg += input.name + ' | ';
    alert(msg);
}

function validation(inputs){
    let passedTest = true;
    let emptyInputs = []

    for(i of inputs){
        if(i.value === '') {
            passedTest = false;
            emptyInputs.push(i);
        }
    }

    if(!passedTest) return emptyInputs;

    return passedTest;
}

divRegisterTitleArtist.addEventListener('click', ()=> changeDisplayDivRegister('artist'));
divRegisterTitleMusic.addEventListener('click', ()=> changeDisplayDivRegister('music'));
btnSaveArtist.addEventListener('click', ()=> inputsValidate('artist'));
btnSaveMusic.addEventListener('click', ()=> inputsValidate('music'));