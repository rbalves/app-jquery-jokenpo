var rounds = 5, round = 1;

var player1 = {
    name: "Você",
    choice: "?",
    points: 0
}

var player2 = {
    name: "Máquina",
    choice: "?",
    points: 0
}

var message, dataDivs;

function setDivs() {
    setValuesDiv();
    $.each(dataDivs, (key, value) => {
        clearDiv(value);
        mountDiv(value);
    });
}

function setValuesDiv() {
    dataDivs = [
        {
            element: "<h2></h2>",
            text: "Rodada " + round + " / " + rounds,
            id: "rounds",
        },
        {
            element: "<h4></h4>",
            text: message,
            id: "message",
        },
        {
            element: "<h3></h3>",
            text: player1.name,
            id: "player1-name",
        },
        {
            element: "<h3></h3>",
            text: player2.name,
            id: "player2-name",
        },
        {
            element: "<h3></h3>",
            text: player1.choice,
            id: "choices-player1",
        },
        {
            element: "<h3></h3>",
            text: player2.choice,
            id: "choices-player2",
        },
        {
            element: "<h3></h3>",
            text: player1.points,
            id: "points-player1",
        },
        {
            element: "<h3></h3>",
            text: player2.points,
            id: "points-player2",
        }
    ]
}

const clearDiv = ({id}) => $(`#${id}`).html('');

const mountDiv = ({element, text, id}) => {
    const div = $('<div></div>').addClass('col-sm-12 text-center');
    div.append($(element).html(text));
    $(`#${id}`).append(div);
}

var idsAllButtons = ['button-stone', 'button-paper', 'button-scissors', 'button-new-play'];

function clickButtonChoice(choice){
    player1.choice = choice;
    player2.choice = randomChoice();
    disableButtons(true);
    checkWinnerRound();
    setDivs();
    setTimeout(nextRound, 2000);
}

function disableButtons(status) {
    $.each(idsAllButtons, (key, value) => {
        $(`#${value}`).prop("disabled", status);
    });
}

function randomChoice() {
    let choices = ['Pedra', 'Papel', 'Tesoura'];
    let min = Math.ceil(0);
    let max = Math.floor(2);
    let numberRandom = Math.floor(Math.random() * (max - min + 1)) + min;
    return choices[numberRandom];
}

var won = "Você ganhou a rodada!";
var defeat = "Você perdeu a rodada!";

const player1Win = () => {
    player1.points++;
    message = won;
};

const player2Win = () => {
    player2.points++;
    message = defeat;
};

function checkWinnerRound() {
    if(player1.choice.includes(player2.choice)){
        player1.points++;
        player2.points++;
        message = "Rodada empatada!";
    }else{
        switch (player1.choice) {
            case "Pedra":
                player2.choice.includes("Tesoura") ? player1Win() : player2Win();
                break;
            case "Papel":
                player2.choice.includes("Pedra") ? player1Win() : player2Win();
                break;
            default:
                player2.choice.includes("Papel") ? player1Win() : player2Win();
                break;
        }
    }
}

function nextRound() {
    round++;
    if (round <= rounds) {
        player1.choice = "?";
        player2.choice = "?";
        message = "Aguardando sua escolha...";
        setDivs();
        disableButtons(false);
    }else{
        if(player1.points > player2.points){
            alert("Você ganhou a partida!");
        }else if(player1.points < player2.points){
            alert("Você perdeu a partida!");
        }else{
            alert("Partida empatada!");
        }
        $('#button-new-play').prop("disabled", false);
    }
    
}

function newPlay() {
    round = 1;
    player1.choice = "?";
    player1.points = 0;
    player2.choice = "?";
    player2.points = 0;
    message = "Aguardando sua escolha...";
    disableButtons(false);
    setDivs();
}

newPlay();
