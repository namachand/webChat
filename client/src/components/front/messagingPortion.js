import React from 'react';
import {Row, Col,Button, Form, FormGroup, Input, CardFooter} from 'reactstrap';
import '../../css/style.css';
import image from '../images/support.png';
class Messaging extends React.Component {
  constructor(props){
    super(props);
    this.SendMessage = this.SendMessage.bind(this);   
    this.handlePress = this.handlePress.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
  }
SendMessage(event){
    const {socket}=this.props;
    const opponent=this.props.opponent;
    event.preventDefault();
    var sender=document.getElementById('comment');
    var message=sender.value;
    console.log(message);
    socket.emit('messages',{message,opponent});
    sender.value='';
}

handlePress(event){
  const {socket}=this.props;
  event.preventDefault();
  var mess="stranger is typing...";
  socket.emit('typing',mess);
}

handleEnter(event){
  if(event.which===13)
  {   
    const {socket}=this.props;
     const opponent=this.props.opponent;
      event.preventDefault();
      var sender=document.getElementById('comment');
      var message=sender.value;
      console.log(message);
      if(!(sender.value=='')){
        socket.emit('messages',{message,opponent});
      }
      sender.value='';
      return false;
  }           
}
render(){
  return (
    <div>
   <div id='containMessageBox' className='row '> 
    <div className='col-md-12 mainMessage' id='mainMess'>
      <div id="scrollable" className='ml-3'>
        <div id='forImage'>
          <img src={image} id='image'/>
        </div>
      </div>  
      
      <div id='strangerDisconnect'>
      </div>  
      
      <div  id='connecting'>
      <p id='connectText'>Connecting to the stranger...</p>
      </div>
      <div id="feedback"></div>
    </div>
    <CardFooter className='col-md-12 ' id='cardFoot' style={{
        height:'11vh',
        backgroundColor:'rgb(240,240,240)',
        boxShadow:'0px 1px 1px grey',
    }}>
      <div className='col-md-12'>
    <Form onSubmit={this.SendMessage}>
        <Row>
            <Col xs='9' md="11">
            <FormGroup>
            <Input type="textarea" name="textarea" id="comment" onInput={this.handlePress} onKeyDown={this.handleEnter} />
            </FormGroup>
            </Col>
            <Col xs='3' md="1">
            <Button type="submit" id="btn1" >Send</Button>
            </Col>
        </Row>
    </Form>
    </div>
    </CardFooter>  
    </div>  
    </div>       
      );
    }
  }
  
export default Messaging; 