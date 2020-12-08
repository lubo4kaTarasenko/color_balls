import React from 'react'

export default class Main extends React.Component {    
  constructor(props) {
    super(props);
    this.state = {
      key: 0,
      balls: []
    }
  }

  componentDidMount() {
  }

  render() {
    const balls = this.state.balls
    return (
      <div id='game_field' onClick={(e)=>{this.renderColorBall(e)}}>
        <h1>Press you`r mouse here</h1>
        { balls.map(ball => (               
              <div key={ball.index} className='balls' style={ {top: ball.y, left: ball.x, background: ball.color } }></div>
        ))}
      </div>
    )
  }


  renderColorBall(e){
    const x = e.pageX  
    const y = e.pageY
    const randomColor = this.gRandomColor()
    let ballsArr = this.state.balls    
    const index = this.state.key
    const newKey = index + 1
    ballsArr.push({x: x, y: y, color: randomColor, index: index })   
    this.setState({balls: ballsArr, key: newKey }) 
  }

  gRandomColor(){
    const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
    return randomColor
  }
}