import './App.css';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Rank from './Components/Rank/Rank';
// import Particles from "react-tsparticles";
import Particles from 'react-particles-js';
import { Component } from 'react';
// import Clarifai from 'clarifai';
// import Clarifai from 'clarifai';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import Tachyons from 'tachyons';
import SignIn from './Components/SignIn/SignIn';
import Register from './Components/Register/Register';


// const app = new Clarifai.App({
//   apiKey: '30eb3908ce47415db467b68bba1c726a'
// });

const particlesOptions = {
  line_linked: {
    shadow: {
      enable: true,
      color: "#3CA9D1",
      blur: 5
    }
  }
}

const initialState = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
}

class App extends Component {

  constructor() {
    super();
    this.state = initialState;
  }

  // componentDidMount() {
  //   fetch('http://localhost:5500').
  //   then(response => response.json())
  //   .then(console.log);
  // };
  

  loadUser = (data) => {
    // console.log(data);
    // console.log('this function is running')
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
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
    fetch('http://localhost:5500/imageurl', {
          method: 'post',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            input: this.state.input
          })
    })
    .then(response => response.json())
    .then(response => {
      if(response) {
        fetch('http://localhost:5500/image', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id: this.state.user.id
          })
        })
        .then(response => response.json())
        .then(count => {
          this.setState(Object.assign(this.state.user, {
            entries: count,
          }))
        })
      }
      this.displayFaceBox(this.calculateFaceLocation(response))
    })
    .catch(err => console.log(err));
  };

  onRouteChange = (route) => {
    if(route === 'signin')
      this.setState(initialState);
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
          <Rank name={this.state.user.name} entries={this.state.user.entries}/>
          <ImageLinkForm 
            onInputChange={this.onInputChange} 
            onButtonSubmit={this.onSubmit}
          />
          <FaceRecognition box={this.state.box} imgUrl={this.state.imageUrl}/>
        </>
        : 
        (
          this.state.route==='signin' ?
          <SignIn onRouteChange={ this.onRouteChange } loadUser={this.loadUser}/>
          :
          <Register onRouteChange={ this.onRouteChange } loadUser={this.loadUser}/>
        )
        
      }
      </div>
    );
  }
}

export default App;
