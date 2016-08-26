import React from 'react';
import ReactDOM from 'react-dom';
import Popout from 'react-popout';
/* global localStorage*/
/* global location*/
class Button extends React.Component{
    constructor(){
        super();
        this.state={clicked: false};
        this.remove= this.remove.bind(this);
        this.edit= this.edit.bind(this);
    }
    
    remove(){
        localStorage.removeItem(this.props.t);
        location.reload(true);
    }
    
    edit(){
        this.setState({clicked: !this.state.clicked})
    }
    
    render (){
        if (this.props.x == "remove"){
             return <button  onClick={this.remove} className="remove">X</button>;
        } else if (this.props.x =="edit"){
            return <Pophost m="Edit" t={this.props.t}/>;
        } 
    }
}

class Ingred extends React.Component{
    constructor(props){
        super(props);
        this.state={val: props.p}
    }
    render(){
        return (<div id="ing">{this.state.val} <Button x="edit" t={this.props.t}/></div>)
    }
}

class List extends React.Component{
    constructor(){
        super();
        this.state={isClicked: false};
        this.clicker = this.clicker.bind(this);
        this.remove= this.remove.bind(this);
    }
    clicker(){
        this.setState({isClicked: !this.state.isClicked})
    }
    
    remove(x){
        localStorage.removeItem(x)
    }
    
    componentWillUpdate(p, s){
        this.props.title;
    }
    render(){
        return (
            <div>
               <li className="list-group-item" onClick={this.clicker}>{this.props.title} <Button t={this.props.title} x="remove" /></li>
               { this.state.isClicked ? <Ingred p={this.props.ing} t={this.props.title}/> : null}
            </div>
            
            )
    }
}

class Recipes extends React.Component{
    constructor(){
        super();
        this.state={local: localStorage};
        
        
    }
    
    render(){
       var  keys =[],
             th = this;
       var strings =[];
        for(var i=0;i < this.state.local.length; i++ ){
          keys.push(this.state.local.key(i));  
        }
        
        return (
        <div>
     
        <ul className="list-group">
        {keys.map(function(data, index){
           var that =this;
           return ( 
           
            <List key={index} title={JSON.parse(localStorage.getItem(data)).title.toString()} ing={JSON.parse(localStorage.getItem(data)).ing.toString()} />
           
           )
        })
          
        }
        </ul>
        </div>
        )
    }
}

class Pophost extends React.Component{
    constructor(props){
        super(props);
        this.popout= this.popout.bind(this);
        this.popoutClosed = this.popoutClosed.bind(this);
        this.updateTitle =this.updateTitle.bind(this);
        this.updateDes = this.updateDes.bind(this);
        this.state={isPoppedOut: false };
        this.state={
                title:'',
                ing: ''
        }
    }
    
    updateTitle(e){
        let code = e.target.value;
        
        this.setState({title: code});
    }
    
    updateDes(e){
        let code = e.target.value;
        this.setState({ing: code});
    }
    
    popout(){
        this.setState({isPoppedOut: true});
        localStorage.removeItem(this.state.title)
    }
    popoutClosed (){
        
        localStorage.setItem(this.state.title, JSON.stringify(this.state));
        this.setState({isPoppedOut: false});
        location.reload(true)
   }
   
   componentWillMount(){
       if(this.props.t){
           this.setState({
               title: JSON.parse(localStorage.getItem(this.props.t)).title.toString(),
               ing: JSON.parse(localStorage.getItem(this.props.t)).ing.toString()
           })
       }
   }
   
    render(){
        
        if (this.state.isPoppedOut){
            return (
            <Popout title= {this.props.m} containerId="form"> 
            
              <div>
                 <form id="form">
                  <h3>Title: </h3><input className="form-control" type='text' placeholder='Recipe Title' onChange={this.updateTitle} value={this.state.title} />
                  <h3>Ingredients</h3><textarea className="form-control"placeholder= 'ingredients/proportions' onChange={this.updateDes} value={this.state.ing}/>
                  <input type='submit' className="form-control"onClick={this.popoutClosed}/>
                </form>
                <h2>{this.title}</h2>
                <h2>{this.ing}</h2>
              </div>
            </Popout>
            )
        } else {
            var popper = <button onClick={this.popout} > {this.props.m} </button>
            return(
            <div>
               <strong>{popper}</strong>
            </div>
            )
            
        }
    }
}

class App extends React.Component{
    constructor(){
        super();
    }
    render(){
        return (<div><div className="head"><h1>Recipe Book!</h1></div><br /><Recipes /> <br /> <Pophost m= "New Recipe"/><br /></div>);
    }
}

export default App;