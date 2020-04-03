import React,{useState} from 'react';
import {Switch,Route,useLocation} from 'react-router-dom';
import {Link} from 'react-router-dom'
import Layout from './front/layout'
import frontLappyImage from '../components/images/notebook.jpg'
import {Button} from 'reactstrap';
import Public from './front/public'
export default function Main(){

   function Middleportion(){
    const submitMale=(event)=>{
    const buttonValue=document.getElementById('maleButton').value;
    console.log(buttonValue);
    setGender(buttonValue);
      }
    const submitFemale=(event)=>{
      const buttonValue=document.getElementById('femaleButton').value;
      setGender(buttonValue);
    }

    const submitPublic=(event)=>{
      const buttonValue=document.getElementById('publicButton').value;
      setGender(buttonValue);
    }

    return(
    <div className='frontContainer' >
      <div className='frontPageHeader'>
      
      </div>
    <div className=' backgroundMainDiv row'>
    {/*  for mobile phone */}
    <div className='col-xs-12 offset-1 leftMainDivMobile d-block d-sm-none' 
    style={{
      height:'70vh',
      width:'100vw',
    }}
    >
    <div className='col-xs-12 headYourGenderMobile mt-5'>
      <p className='paraYourGenderMobile  ml-3'>Whats Your Gender?</p>
    </div>
    <div className="row genderDiv offset-3 ">
      <div className='col-xs-5'>
          <Link to='/layout'><button type='button' className=" butn-actionMobile fa fa-mars fa-2x   " id="maleButton" value="male" onClick={submitMale}></button></Link>
        </div>
      <div className='col-xs-5'>
      <Link to='/layout'><button type='button' className=" butn-actionMobile fa fa-venus fa-2x ml-5"  id="femaleButton" value="female" onClick={submitFemale}></button></Link>
      </div>
      <div className='col-xs-5  textGenderDiv' id='maleText'>
          <p className='pl-2 paraGender '> Male</p>
        </div>
      <div className='col-xs-5 textGenderDiv offset-1'>
        <p className='pl-5 paraGender '>Female</p>
      </div>
    </div>

    <div className='col-12 YourGenderLeftBottomMobile mt-5'>
        <p className='paraYourGenderLeftBottomMobile ' >Find people nearby you by entering into the Public chat</p>
    </div> 
    <div className='divPublicButtonMobile'>   
      <Link to='/public'><Button  id="publicButton" color='danger' size='lg' value="public" onClick={submitPublic}>Public Chat</Button></Link>
    </div>
    </div>
   
    {/*  for mobile phone */}
    <div className='col-xs-12 ml-5 col-md-3 leftMainDiv d-none d-sm-block'>
      <div className='col-12 headYourGender'>
        <p className='paraYourGenderLeft' >Public Chat!</p>
    </div> 
    
    <div className='divPublicButton'>   
      <Link to='/public'><Button  id="publicButton" color='danger' size='lg' value="public" onClick={submitPublic}>Public Chat</Button></Link>
    </div>
    <div className='col-12 '>
        <p className='paraYourGenderLeftBottom mt-5' >Click on the button to enter into public chat</p>
    </div> 
    </div>
            
    <div className='col-xs-12 ml-5 mt-1 col-md-7 mainGenDiv d-none d-sm-block'
      style={{
        background: `url('${frontLappyImage}') no-repeat`,
        backgroundSize:'cover',
        boxShadow:'0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
      }}
    >
  <div className='row'>
      <div className='col-md-12 headYourGender mt-5'>
        <p className='paraYourGender' >Private Chat!</p>
      </div>
      <div className='col-md-12 headYourGender'>
        <p className='paraYourGender' >Whats Your Gender?</p>
      </div>
      <div className="row genderDiv offset-1 ">
        <div className='col-md-5'>
          <Link to='/layout'><button type='button' className=" butn-action fa fa-mars fa-4x  mt-1 " id="maleButton" value="male" onClick={submitMale}></button></Link>
        </div>
        <div className='col-md-5'>
          <Link to='/layout'><button type='button' className=" butn-action fa fa-venus fa-4x ml-5 mt-1"  id="femaleButton" value="female" onClick={submitFemale}></button></Link>
        </div>
        <div className='col-md-5  textGenderDiv' id='maleText'>
          <p className='pr-4 paraGender '> Male</p>
        </div>
      <div className='col-md-5 textGenderDiv offset-1'>
        <p className='pl-3 paraGender '>Female</p>
      </div>
    </div>
  </div> 
  </div>
  </div>
  <div className='lowerDivMobile d-block d-sm-none'>
     <p className='footParaMobile'>XYZ is a fun random match making website where  you will pair up with completely random person from anywhere. Its one of the cool way to met new strangers around you. To keep your privacy protective xyz never share any of your details to anyone. You can make a private chat with stranger after you connected to the stranger you can text or even video call with the stranger and you can stop a chat at any time just by clicking on the cancel button you can again search for the stranger just by clicking on the next button. In private chat you can videocall by sending videocall request and can even accept or reject stranger videocall request. In private chat a random male is connected with a random female.The Public feature of XYZ randomly matches you with any gender from anywhere around you.The people matches with you is completely random so be nice with people. XYZ donot encourage nudity, sexually harass anyone, publicize other peoples, sharing private information, doing illegal activities. Be carefull from scammers, exploiters.  </p>
  </div>  
 <div className='row lowerDiv d-none d-sm-block'>
 <div className='col-md-12'>
   <p className='footPara'>XYZ is a fun random match making website where  you will pair up with completely random person from anywhere. Its one of the cool way to met new strangers around you. To keep your privacy protective xyz never share any of your details to anyone. You can make a private chat with stranger after you connected to the stranger you can text or even video call with the stranger and you can stop a chat at any time just by clicking on the cancel button you can again search for the stranger just by clicking on the next button. In private chat you can videocall by sending videocall request and can even accept or reject stranger videocall request. In private chat a random male is connected with a random female. </p>
   <p className='footPara'>The Public feature of XYZ randomly matches you with any gender from anywhere around you.The people matches with you is completely random so be nice with people. XYZ donot encourage nudity, sexually harass anyone, publicize other peoples, sharing private information, doing illegal activities. Be carefull from scammers, exploiters. </p>
 </div>
 </div>
 </div>
  );
  }

const [gender,setGender]=useState('');
let location = useLocation();
let background=location.state && location.state.background;
return (  
<div>
  <Switch location={background || location}>
  <Route exact path='/' children={<Middleportion/>}/>
  <Route path='/layout' children={<Layout gender={gender}/>}/>
  
  <Route path='/public' children={<Public gender={gender}/>}/>
  </Switch>
</div>
  );
} 