//pegando o id do html 
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const gitBtn = document.getElementById('gitHub')


const loader = document.getElementById('loader');


let apiQuotes = []; //vetor que pega o json

//Loader
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}
function complete() {
    quoteContainer.hidden = false;
    loader.hidden = true
}
//Hide Loading

//mostrar nova frase
export function newQuote() {
    loading();
    //pegar uma frase aleatoria do array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)]; //gera o index da apiQuotes, que é o vetor com os dados. 
    //text content pega a string 
    // trata a string vazia de author colocando unknown 
    if (!quote.author) { //se quote author nao existir 
        authorText.textContents = "Unknown";
    } else {
        authorText.textContent = quote.author;
    }
    //checar o tamanho, para determinar o estilo
    if (quote.text.length > 50) {
        quoteText.classList.add('long-quote'); //adicionando a classe no css
    }
    else {
        quoteText.classList.remove('long-quote');
    }
    //set quote, hide loader

    quoteText.textContent = quote.text;
    complete();

}





//Pegando os dados da API
async function getQuotes() {
    loading();
    const apiUrl = 'https://type.fit/api/quotes'; //link da api 
    try {
        const response = await fetch(apiUrl);
        //pegando o json da api
        apiQuotes = await response.json();
        //apiQuotes, variavel global
        //tornando o json em objeto, pq no webserver é tratado com string
        newQuote();
        //console.log(apiQuotes);
    }

    catch (error) {

        //Pega o erro aqui 

    }
}
//Intengrar com o twitter 
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent}-${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}
function callGit() {
    window.location.href = "https://github.com/iaracampos";
}
//event lister
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);
gitBtn.addEventListener('click', callGit);

//chamando a função 
getQuotes(); 
