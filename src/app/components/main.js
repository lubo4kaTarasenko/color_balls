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
      <div className='cont'>
        <div id='game_field' onClick={(e)=>{this.gameClick(e)}}>
          <h1 id='h'>Click you`r mouse here</h1>
          { balls.map(ball => (               
              <div key={ball.index} className={ `ball ${ball.checked ? 'checked' : ''}` }
                style={ {top: ball.y, left: ball.x, background: ball.color } }
                onClick={()=>{this.checkBall(ball.index)}}>              
              </div>
          ))}
        </div>
        <div className='buttons'>
            <button className="ringB" onClick={()=>{this.makeRing(this.state.balls, false)}}>Ring</button>
            <button className="squareB" onClick={()=>{this.makeSquare(this.state.balls)}}>Square</button>
            <button className="donutB" onClick={()=>{this.makeRing(this.state.balls, true)}}>Donut</button>
            <button className="add" onClick={()=>{this.addManyBalls()}}>Add 500</button>
        </div>
      </div>
    )
  }

  randomCircleCoord(donut){
    const x = Math.random() * 300 + 550
    const y = Math.random() * 300 + 100    
    const dx = 700 - x
    const dy = 250 - y
    const D = Math.sqrt(dx*dx + dy*dy)
    if (D > 150) return this.randomCircleCoord(donut)
    if (donut && D < 70) return this.randomCircleCoord(donut)
    return [x, y]
  }

  makeRing(ballsArr, donut){ 
    ballsArr.forEach(ball => {
      const randomCoord = this.randomCircleCoord(donut)
      ball.x = randomCoord[0]; ball.y = randomCoord[1]; ball.checked = false})
    this.setState({balls: ballsArr }) 
  }

  makeSquare(ballsArr){
    ballsArr.forEach(ball => {
      ball.x = (Math.random() * 300 + 550); ball.y = (Math.random() * 300 + 100); ball.checked = false})
    this.setState({balls: ballsArr }) 
  }

  renderColorBall(x, y, id){   
    const randomColor = this.gRandomColor()
    let ballsArr = this.state.balls    
    const newKey = id + 1
    ballsArr.push({x: x, y: y, color: randomColor, index: id, checked: false })   
    this.setState({balls: ballsArr, key: newKey }) 
  }

  addManyBalls(){
    let id = this.state.key
    for(let i = 0; i < 500; i++){
      this.renderColorBall(180, 200, id)
      id += 1     
     }
     this.setState({key: id})
  }

  gRandomColor(){
    return  '#' + Math.floor(Math.random()*16777215).toString(16);  
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
      this.renderColorBall(x, y, this.state.key)
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