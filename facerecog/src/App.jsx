import './App.css';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Rank from './Components/Rank/Rank';
// import Particles from "react-tsparticles";
import Particles from 'react-particles-js';
import { Component } from 'react';
// import Clarifai from 'clarifai';
import Clarifai from 'clarifai';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import Tachyons from 'tachyons';
import SignIn from './Components/SignIn/SignIn';
import Register from './Components/Register/Register';


const app = new Clarifai.App({
  apiKey: '30eb3908ce47415db467b68bba1c726a'
});

const particlesOptions = {
  line_linked: {
    shadow: {
      enable: true,
      color: "#3CA9D1",
      blur: 5
    }
  }
}


class App extends Component {

  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
    }
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage')
    const width = Number(image.width);
    const height = Number(image.height);
    // console.log(width, height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  };


  displayFaceBox = (box) => {
    console.log(box);
    this.setState({box: box});
  }

  // setState for our input with onInputChange function
  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

// Perform a function when submitting with onSubmit
  onSubmit = () => {
        // set imageUrl state
    this.setState({ imageUrl: this.state.input });
    app.models
    .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
    .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
    .catch(err => console.log(err));
  };

  onRouteChange = (route) => {
    this.setState({route: route});
  };

  render () {
    return (
      <div className="app">
        {/* <h1>Hello world</h1> */}
        <Particles className='particles'
                  params={particlesOptions} 
        />
        {this.state.route==='home'
        ?
        <>
          <Navigation onRouteChange={ this.onRouteChange }/>
          <Logo />
          <Rank />
          <ImageLinkForm 
            onInputChange={this.onInputChange} 
            onButtonSubmit={this.onSubmit}
          />
          <FaceRecognition box={this.state.box} imgUrl={this.state.imageUrl}/>
        </>
        : 
        (
          this.state.route==='signin' ?
          <SignIn onRouteChange={ this.onRouteChange }/>
          :
          <Register onRouteChange={ this.onRouteChange }/>
        )
        
      }
      </div>
    );
  }
}

export default App;
