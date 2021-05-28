var readlineSync = require('readline-sync')
var question = require('./question')
var leaderBoard = require('./leaderBoard')
var chalk = require('chalk')
const emoji = require('node-emoji');
const star = emoji.get('star');
const smiley = emoji.get('smiley')
const confused = emoji.get('confused')
const angry = emoji.get('angry')
const kissing = emoji.get('kissing_heart')


console.log(chalk.whiteBright.bold("welcome to the game"))
console.log(chalk.yellowBright("let's see how well you know me "+smiley))
console.log(chalk.yellowBright("There are 15 questions"))
console.log(chalk.yellowBright("Every time you answer 5 correct questions your rank will increase"))
console.log(chalk.redBright('RANK 1  : good friend  '+star))
console.log(chalk.redBright('RANK 2  : close friend '+star,star))
console.log(chalk.redBright('RANK 3  : best friend  '+star,star,star))

var willPlayGame = readlineSync.question(chalk.blueBright('Press '+chalk.greenBright('y ')+'to start the game ...\n'))

if(willPlayGame.toLowerCase() != 'y'){
  console.log(chalk.blueBright("Play when you are free .. bye bye"))
  process.exit(1)
}

var rankScore=0,totalScore=0,wrongValue=0;

const printRankAndScore = (rankValue,scoreValue) => {
    if(rankValue <=4) {
      console.log(chalk.redBright('Rank ')+ star +chalk.yellowBright('  score : ') +chalk.whiteBright(scoreValue))
      return 1
    }
    if(rankValue >= 5 && rankValue <=14){
      console.log(chalk.redBright('Rank ')+ star,star+chalk.yellowBright('  score : ') +chalk.whiteBright(scoreValue))
      return 2
    }
    if(rankValue > 14){
      console.log(chalk.redBright('Rank ')+ star,star,star+chalk.yellowBright('  score : ') +chalk.whiteBright(scoreValue))
      return 3
    }
}

const specialWrongAnswer = (wrongValue) =>{  
  if(wrongValue <=4) {
    return console.log(chalk.red('wrong answer '+confused))
  }
  if(wrongValue >= 5 && wrongValue <=14){
    return console.log(chalk.red('bro r u sure u know me '+confused,confused))
  }
  if(wrongValue > 14){
    return console.log(chalk.red('why are you taking this quiz , why why '+angry))
  }
}

const specialRightAnswer = (rightValue) =>{ 
  if(rightValue <=4) {
    return console.log(chalk.greenBright('nice nice nice nice '+smiley))
  }
  if(rightValue >= 5 && rightValue <=14){
    return console.log(chalk.greenBright('wow you really do know me '+kissing))
  }
  if(rightValue > 14){
    return console.log(chalk.greenBright(('your are a really close friend for sure '+kissing,kissing)))
  }
}


const didMakeItToleaderBoard = () =>{
      var temp =0;
      console.log(chalk.redBright('\n leaderboard\n'))
      leaderBoard.map((player)=>{
        console.log(chalk.whiteBright(player[0]+' : '+player[1]+' points'))
       })
      leaderBoard.map((player)=>{
       if(player[1]>temp){
         temp = player[1];
       }
      })

      if(totalScore > temp){
        console.log(chalk.greenBright("\n\nsuper you made it to the leaderboard"))
        console.log(chalk.greenBright(('send me screenshot .I will add you to leader board')))
        return
      }
      console.log(chalk.red("better luck next time"))

}

const findRankLevel = () =>{
  var level = printRankAndScore(rankScore,totalScore)
  if(level == 1){
    return console.log(chalk.yellowBright('you are a good friend '+smiley))
  }
  if(level == 2){
    return console.log(chalk.yellowBright('you are a close friend of mine '+smiley,smiley))
  }
  if(level == 3){
    return console.log(chalk.yellowBright('you are my best friend '+smiley,smiley,smiley))
  }
}
const mainLoop = () =>{
  for(var i = 0 ; i < question.length ;i++){
    printRankAndScore(rankScore,totalScore)
    var ans = readlineSync.question(chalk.blueBright(question[i][0]))
    if(ans.toLocaleLowerCase() == question[i][1]){
      rankScore++;totalScore++;
      specialRightAnswer(totalScore)
      console.log(chalk.whiteBright('\n---------------------------------'))
      console.log(chalk.whiteBright('---------------------------------\n'))
      continue
    }
    wrongValue++
    specialWrongAnswer(wrongValue)
    console.log(chalk.whiteBright('\n---------------------------------'))
    console.log(chalk.whiteBright('---------------------------------\n'))
    
  }
}

mainLoop()
findRankLevel()
didMakeItToleaderBoard()





