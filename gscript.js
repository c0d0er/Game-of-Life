/*
Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.
Any live cell with two or three live neighbours lives on to the next generation.
Any live cell with more than three live neighbours dies, as if by overpopulation.
Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
*/
var arr = [], x=[];
var setInter;
var row = 25;
var column = 40;
var gen=0;
var idName;
var addArr=[];

const set1=()=>{//pause game;
  gen=0
  clearInterval(setInter)
    setInter=false;
};

let boardArr = (row, column, initial, random=false) => {
  arr=JSON.parse(JSON.stringify([]));
  for(let i=0; i<row; i++){
  arr[i]=[];
  for(let j=0; j<column; j++){
    if(!random){arr[i][j]=[initial, random]}
    else{arr[i][j]=[Math.round(Math.random()), random];}
  }
}
x=JSON.parse(JSON.stringify(arr));
return arr;
}

boardArr(row, column, 3, true)

let change = () => {//core function apply 4 game rules;
      arr.forEach((row, i)=>{
  row.forEach((col, j)=>{
    let lastRow=arr.length-1,
    lastCol=arr[0].length-1,
    prevRow=i-1<0?lastRow:i-1,
    prevCol=j-1<0?lastCol:j-1,
    nextRow=i+1>lastRow?0:i+1,
    nextCol=j+1>lastCol?0:j+1,
    sum=arr[prevRow][prevCol][0]+arr[prevRow][j][0]+arr[prevRow][nextCol][0]+arr[i][prevCol][0]+arr[i][nextCol][0]+arr[nextRow][prevCol][0]+arr[nextRow][j][0]+arr[nextRow][nextCol][0];
    if(col[0]===0){
      if(sum===3){x[i][j][0]=1;x[i][j][1]='new';}
      else {x[i][j][0]=0;x[i][j][1]='zero'};
    }

    else if(col[0]===1){
      if(sum<2){x[i][j][0]=0;x[i][j][1]='killed';}
      else if(sum>3){x[i][j][0]=0;x[i][j][1]='killed';}
        else if(sum===3||sum===2){x[i][j][0]=1;x[i][j][1]='live';}
        }
      })
    })   
      if(arr.toString()!==x.toString()){gen++}//compare 2 arrays, when they are same, generation counting stops;
    arr=$.extend(true, [], x);//arr=JSON.parse(JSON.stringify(x));
    return arr;
    }

/*
let boardArr = (row, column, initial, random=false) => {
  arr=JSON.parse(JSON.stringify([]));
  for(let i=0; i<row; i++){
  arr[i]=[];
  for(let j=0; j<column; j++){
    if(!random){arr[i][j]=initial;}
    else{arr[i][j]=Math.round(Math.random());}
  }
}
x=JSON.parse(JSON.stringify(arr));
return arr;
}

boardArr(row, column, 3, true)

let change = () => {//core function apply 4 game rules;
      arr.forEach((row, i)=>{
  row.forEach((col, j)=>{
    let lastRow=arr.length-1,
    lastCol=arr[0].length-1,
    prevRow=i-1<0?lastRow:i-1,
    prevCol=j-1<0?lastCol:j-1,
    nextRow=i+1>lastRow?0:i+1,
    nextCol=j+1>lastCol?0:j+1,
    sum=arr[prevRow][prevCol]+arr[prevRow][j]+arr[prevRow][nextCol]+arr[i][prevCol]+arr[i][nextCol]+arr[nextRow][prevCol]+arr[nextRow][j]+arr[nextRow][nextCol];
    if(col===0){
      if(sum===3){x[i][j]=1;}
      else x[i][j]=0;
    }
    else if(col===1){
      if(sum<2){x[i][j]=0}
      else if(sum>3){x[i][j]=0}
        else if(sum>3){x[i][j]=0}
        else if(sum===3||sum===2){x[i][j]=1}
        }
      })
    })   
      if(arr.toString()!==x.toString()){gen++}//compare 2 arrays, when they are same, generation counting stops;
    arr=$.extend(true, [], x);//arr=JSON.parse(JSON.stringify(x));
    return arr;
    }*/

const change1 = () => {
  return {
    type: 'CHANGE'
  }
};

const clear1 = () => {
  return {
    type: 'CLEAR'
  }
};

const add1 = () => {
  return {
    type: 'ADD'
  }
};

const random1 = () => {
  return {
    type: 'RANDOM'
  }
};

const big1 = () => {
  return {
    type: 'BIG'
  }
};

const back1 = () => {
  return {
    type: 'BACK'
  }
};

const boardReducer = (state=arr, action)=>{
  switch (action.type) {
    case 'CHANGE':
    return change();
    case 'CLEAR':
    arr=JSON.parse(JSON.stringify(boardArr(row, column, 0, false)));
    return arr;
    case 'RANDOM':
    arr=JSON.parse(JSON.stringify(boardArr(row, column, 0, true)));
    return arr;
    case 'BIG':
    row=40; column=60;
    arr=JSON.parse(JSON.stringify(boardArr(row, column, 0, true)));
    return arr;
    case 'BACK':
    row=25; column=40;
    arr=JSON.parse(JSON.stringify(boardArr(row, column, 0, true)));
    return arr;
    case 'ADD':
    addArr=JSON.parse(JSON.stringify(state));
    if(addArr[idName[0]][idName[1]][0]===0){addArr[idName[0]][idName[1]][0]=1;addArr[idName[0]][idName[1]][1]='new';}
    else if(addArr[idName[0]][idName[1]][0]===1){addArr[idName[0]][idName[1]][0]=0;addArr[idName[0]][idName[1]][1]='killed';}
    //addArr[idName[0]][idName[1]]=1;
    arr=$.extend(true, [], addArr);
    return arr;
    default: 
      return state;
  }
}

const store = Redux.createStore(boardReducer);

const Provider = ReactRedux.Provider;
const connect = ReactRedux.connect;



const Td = (props) => { 
  let td1 = props.data.map((v,j)=>{
    let cName=v[1];
    
/*
if cName='0'&&props.state[props.ind][j]===1 {add class 'new live'}
if cName='live'&&props.state[props.ind][j]===1 {add class 'old live'}
*/
//if(props.state[props.ind][j][0]===1){cName='live'}

    return (<td id={props.ind+'-'+j} className={cName} onClick={props.add}></td>)
  });
  return (<div>{td1}</div>)
}

class Game extends React.Component{
  constructor(props){
    super(props)
  }

  tableMaker = () => {    
    return this.props.data.map((val, i)=>{
        return (       
          <tr id={'i-'+i}>          
            <Td state={this.props.data} data={val} ind={i} add={this.handleAdd}/>            
          </tr>        
      )               
    })
  };

  componentDidMount () {
    if(!setInter){
      setInter=setInterval(this.props.makeNewBoard, 1);
    }       
  }

  handleStop = () => {
    clearInterval(setInter)
    setInter=false;
  };

  handleResume = ()=> {
    if(!setInter){
      setInter=setInterval(this.props.makeNewBoard, 1);
    }   
  };

  handleClear = () => {
    set1()
    this.props.makeClearBoard();
   
  };

  handleRandom = () => {   
  set1();
    this.props.makeRandomBoard();
    if(!setInter){setInter=setInterval(this.props.makeNewBoard, 1);}

  };

  handleBig = () => {
    set1()
    this.props.makeBigBoard();
    if(!setInter){setInter=setInterval(this.props.makeNewBoard, 1);}
  };

  handleBack = () => {
    set1()
    this.props.makeBackBoard();
    if(!setInter){setInter=setInterval(this.props.makeNewBoard, 1);}
  };

  handleNext = () => {
    clearInterval(setInter)
    setInter=false;
    this.props.makeNewBoard()
  };

  handleAdd = (e) => {
    idName=e.target.id.split('-');//return current clicking tag id name's array, idName[0]=row, idName[1]=column;  
    console.log(idName)
    //$(e.target).attr('class', 'live');
    this.props.makeAddBoard();
  };

  render () {
    return (
      <div>
        <div className='maintitle'>Game of Life</div>  
      <div className='but'>
      <button className="btn btn-success" onClick={this.handleResume}>Run</button>
      <button className="btn btn-warning" onClick={this.handleStop}>Pause</button>
      <button className="btn btn-info" onClick={this.handleNext}>Next</button>
      <button className="btn btn-danger" onClick={this.handleClear}>Clear</button>
      <button className="btn btn-primary" onClick={this.handleRandom}>Random</button>
      <button className="btn btn-secondary" onClick={this.handleBack}>Size: 25X40</button>
      <button className="btn btn-secondary" onClick={this.handleBig}>Size: 40X60</button> 
      </div>
      <h3 className='Generation'>Generation:&nbsp;{gen}</h3>        
      <table>
      <tbody>
      {this.tableMaker()}
      </tbody>
      </table>
      </div>     
    )
  }
}

const mapStateToProps = (state) => {
  return {data: state}
}

const mapDispatchToProps = (dispatch) => {
  return {
    makeNewBoard: () => {
    dispatch(change1())
    },
    makeClearBoard: () => {
      dispatch(clear1())
    },
    makeRandomBoard: () => {
      dispatch(random1())
    },
    makeBigBoard: () => {
      dispatch(big1())
    },
    makeBackBoard: () => {
      dispatch(back1())
    },
    makeAddBoard: () => {
      dispatch(add1())
    }
  }  
}

const Container = connect (mapStateToProps, mapDispatchToProps)(Game);

class AppWrapper extends React.Component {
  render () {
    return (
      <Provider store={store}>
      <Container/>
      </Provider>
    )
  }
}

ReactDOM.render(<AppWrapper />,
  document.getElementById('app'));



