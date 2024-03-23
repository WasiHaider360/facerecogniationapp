import './App.css';
// import Clarifai from 'clarifai';
import Navigation from './components/navigation/navigation';
import Logo from './components/Logo/logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import ParticlesBg from 'particles-bg'
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import { Component } from 'react';
import { response } from 'express';

// const app = new Clarifai.App({
//   apikey: 'Your_API_Key'
// });

const returnClarifaiJSONRequest =(imageUrl)=>{
  // Your PAT (Personal Access Token) can be found in the Account's Security section
  const PAT = '4963a588bfe7440d8abd1d8bcf7e3d47';
  // Specify the correct user_id/app_id pairings
  // Since you're making inferences outside your app's scope
  const USER_ID = 'y0xbnpmsrn8t9';       
  const APP_ID = 'imagereco';
  // Change these to whatever model and image URL you want to use
  const MODEL_ID = 'face-detection';
  // const MODEL_VERSION_ID = 'aa7f35c01e0642fda5cf400f543e7c40';    
  const IMAGE_URL = imageUrl;

  const raw = JSON.stringify({
    "user_app_id": {
        "user_id": USER_ID,
        "app_id": APP_ID
    },
    "inputs": [
        {
            "data": {
                "image": {
                    "url": IMAGE_URL
                }
            }
        }
    ]
    });
    const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Authorization': 'Key ' + PAT
      },
      body: raw
    };
    return requestOptions

}

class App extends Component { 
  constructor(){
    super();
    this.state = {
      input:'',
      imageUrl:'',
    }
  }

  calculateFaceLocation = (data)=>{
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage')
    const width = Number(image.width);
    const height = Number(image.height);
    console.log(width,height)
  }
  onInputChange =(event)=>{
    this.setState({input: event.target.value})
  }
  onButtonSubmit = ()=>{
    this.setState({imageUrl: this.state.input})
    // app.models.predict('face-detection',this.state.input)
    fetch("https://api.clarifai.com/v2/models/" + 'face-detection' +"/outputs", returnClarifaiJSONRequest(this.state.input))
      .then(response => response.json())
      .then(response =>{
        console.log('hi',response)
        if(response){
          fetch('http://localhost:3000/image',{
            method:'put',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
              id:'y0xbnpmsrn8t9'
            })
          })
        }
      },
      
    )
    .then(response=>this.calculateFaceLocation(response))
    .cath(err =>console.log(err))
  }

  render(){
  return (
    <div className="App">
      <ParticlesBg type="circle" bg={true}/>
      <Navigation/>
      <Logo/>
      <Rank/>
      <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
      <FaceRecognition imageUrl= {this.state.imageUrl}/>
    </div>
  );
  }
}

export default App;
