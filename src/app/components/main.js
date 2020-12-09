import React from 'react'

export default class Main extends React.Component {    
  constructor(props) {
    super(props);
    this.state = {
      key: 0,
      balls: []
    }
  }

  render() {
    const balls = this.state.balls
    console.log(balls)
    return (
      <div id='game_field' onClick={(e)=>{this.gameClick(e)}}>
        <h1 id='h'>Press you`r mouse here</h1>
        { balls.map(ball => (               
            <div key={ball.index} className={ `ball ${ball.checked ? 'checked' : ''}` }
              style={ {top: ball.y, left: ball.x, background: ball.color } }
              onClick={()=>{this.checkBall(ball.index)}}>              
            </div>
        ))}
      </div>
    )
  }


  renderColorBall(x, y){   
    const randomColor = this.gRandomColor()
    let ballsArr = this.state.balls    
    const index = this.state.key
    const newKey = index + 1
    ballsArr.push({x: x, y: y, color: randomColor, index: index, checked: false })   
    this.setState({balls: ballsArr, key: newKey }) 
  }

  gRandomColor(){
    const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
    return randomColor
  }

  
  checkBall(ballId){
    let ballsArr = this.state.balls       
    ballsArr[ballId].checked = true  
    console.log(ballsArr, ballsArr[ballId])
    this.setState({balls: ballsArr}) 
  }

  gameClick(e){
    const x = e.pageX  
    const y = e.pageY
    if(e.target.classList.contains('ball')) return
    if (!this.anyChecked()){
      this.renderColorBall(x, y)
    }
    else{
      this.moveBall(x, y)
    }
  }

  anyChecked(){
   return (this.state.balls.filter(b => b.checked).length > 0)
  }

  moveBall(x, y){    
    let ballsArr = this.state.balls 
    ballsArr.forEach(ball => { if(ball.checked) {ball.x = x; ball.y = y; ball.checked = false} })
    this.setState({balls: ballsArr }) 
  }

}