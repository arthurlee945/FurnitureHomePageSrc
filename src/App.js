import React, {useState, useEffect} from 'react';
import './App.scss';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      slide: 0,
      header:"",
      text:""
    }
    this.handleSlides = this.handleSlides.bind(this);
    this.changeText = this.changeText.bind(this);
  }
  componentDidMount(){
    this.setState({
      header:"Discover innovative ways to decorate",
      text:"We provide unmatched quality, comfort, and style for property owners across the country. Our experts combine form and function in bringing your vision to life. Create a room in your own style with our collection and make your property a reflection of you and what you love."
    })
  }
  componentDidUpdate(prevProps, prevState){
    if(prevState.slide != this.state.slide){
      this.changeText();
    }
  }
  handleSlides(e){
    let iconVal = e.target.getAttribute("iconVal")
    if(iconVal === "right"){
      if(this.state.slide === 2){
        this.setState({
          slide: 0
        })
      }
      else{
        this.setState({
          slide: this.state.slide+1
        })
      }
    }
    else{
      if(this.state.slide === 0){
        this.setState({
          slide: 2
        })
      }
      else{
        this.setState({
          slide: this.state.slide-1
        })
      }
    }
  }
  changeText(){
    if(this.state.slide===0){
      this.setState({
        header:"Discover innovative ways to decorate",
        text:"We provide unmatched quality, comfort, and style for property owners across the country. Our experts combine form and function in bringing your vision to life. Create a room in your own style with our collection and make your property a reflection of you and what you love."
      })
    }
    else if(this.state.slide ===1){
      this.setState({
        header: "We are available all across the globe",
        text: "With stores all over the world, it's easy for you to find furniture for your home or place of business. Locally, we’re in most major cities throughout the country. Find the branch nearest you using our store locator. Any questions? Don't hesitate to contact us today."
      })
    }
    else{
      this.setState({
        header: "Manufactured with the best materials",
        text: "Our modern furniture store provide a high level of quality. Our company has invested in advanced technology to ensure that every product is made as perfect and as consistent as possible. With three decades of experience in this industry, we understand what customers want for their home and office."
      })
    }
  }

  render(){
    console.log(window.innerWidth)
    return (
      <div>
        <NavBar/>
        <div className ="top">
          <SlideShow slideCheck = {this.handleSlides}/>
          <div className ="textSection">
            <div className ="center">
              <h1 className ="intro">{this.state.header}</h1>
              <p className ="introPara">{this.state.text}</p>
              <a className = "shopLink" href="#">Shop now<i className="fas fa-arrow-right arrow"></i></a>
            </div>
          </div>
        </div>
        <div className = "bottom">
            <img className="leftPic" alt ="bottomLeftPicture" src = {require(`${"./images/image-about-dark.jpg"}`)}/>
            <div className ="aboutBox">
              <div className = "container">
                <h3 className ="aboutTitle">About our furniture</h3>
                <p className ="aboutText">Our multifunctional collection blends design and function to suit your individual taste. Make each room unique, or pick a cohesive theme that best express your interests and what inspires you. Find the furniture pieces you need, from traditional to contemporary styles or anything in between. Product specialists are available to help you create your dream space.</p>
                <p className = "signature">created by <a className="myLink" href="https://github.com/arthurlee945" target="_blank">Arthur Lee</a></p>
              </div>
            </div>
            <img className="rightPic" alt ="bottomLeftPicture" src = {require(`${"./images/image-about-light.jpg"}`)}/>
        </div>
      </div>
    );
  }
}

const NavBar =()=>{
  const [menu, setMenu] = useState(true);
  const [icon, setIcon] = useState("fas fa-bars");
  const [box, setBox] = useState("");
  const [linkBox, setLinkBox] = useState("linkBox");
  const [shadow, setShadow] = useState("")
  const handleMenu = () =>{
    setMenu(!menu);
    
    if(menu){
      setIcon("fas fa-times iconColor")
      setBox("activeBox")
      setLinkBox("")
      setShadow("background")
    }
    else{
      setIcon("fas fa-bars")
      setBox("")
      setLinkBox("linkBox")
      setShadow("")
    }
  }

  if(window.innerWidth>600){
    return(
      <div className ="navBarDt">
        <h3 className = "navheader">ROOM</h3>
        <a href="#" className="links">home</a>
        <a href="#" className="links">shop</a>
        <a href="#" className="links">about</a>
        <a href="#" className="links">contact</a>
      </div>
    )
  }
  else{
    return(
      <div className = {`navBarMobile ${box}`}>
        <i className={`menubar ${icon}`} onClick = {handleMenu}></i>
        <a href="#" className={`linksM ${linkBox}`}>home</a>
        <a href="#" className={`linksM ${linkBox}`}>shop</a>
        <a href="#" className={`linksM ${linkBox}`}>about</a>
        <a href="#" className={`linksM ${linkBox}`}>contact</a>
        <div className = {shadow}></div>
      </div>
    )
  }
}

const SlideShow =(props) =>{
  const [index, setIndex] = useState(0)
  const [prevIndex, setPrevIndex] = useState(2)
  const handleSlides = (e) =>{
    props.slideCheck(e);
    let iconVal = e.target.getAttribute("iconVal")
    if(iconVal === "right"){
      if(index === 2){
        setIndex(0)
        setPrevIndex(index)
      }
      else{
        setIndex(index+1)
        setPrevIndex(index)
      }
    }
    else{
      if(index === 0){
        setIndex(2)
        setPrevIndex(index)
      }
      else{
        setIndex(index-1)
        setPrevIndex(index)
      }
    }
  }
  let closed = [0,1,2].filter(dis => dis!==index && dis!==prevIndex).pop()
  
  let display = ["", "", ""];
  display[index] ="slideOpen";
  display[prevIndex] = "slideClose";
  display[closed] = "closed";


  if(window.innerWidth>600){
    return(
      <div className = "imgSlideBoxDT">
        <div className = "imgSlide">
          <img className = {`img ${display[0]}`} alt = "furnitureImg" src = {require(`${"./images/desktop-image-hero-1.jpg"}`)} />
          <img className = {`img ${display[1]}`} alt = "furnitureImg2" src = {require(`${"./images/desktop-image-hero-2.jpg"}`)} />
          <img className = {`img ${display[2]}`} alt = "furnitureImg3" src = {require(`${"./images/desktop-image-hero-3.jpg"}`)} />
        </div>
        <div className ="arrowBox">
          <i className="fas fa-chevron-left direction" iconVal = "left" onClick = {handleSlides}></i>
          <i className="fas fa-chevron-right direction" iconVal = "right" onClick = {handleSlides}></i>
        </div>
      </div>
    )
  }
  else{
    return(
      <div className = "boxMobile">
        <div className = "imgSlideMobile">
          <img className = {`imgMobile ${display[0]}`} alt = "furnitureImg" src = {require(`${"./images/mobile-image-hero-1.jpg"}`)} />
          <img className = {`imgMobile ${display[1]}`} alt = "furnitureImg2" src = {require(`${"./images/mobile-image-hero-2.jpg"}`)} />
          <img className = {`imgMobile ${display[2]}`} alt = "furnitureImg3" src = {require(`${"./images/mobile-image-hero-3.jpg"}`)} />
        </div>
        <div className = "mobileBtn">
          <i className="fas fa-chevron-left directionMobile" iconVal = "left" onClick = {handleSlides}></i>
          <i className="fas fa-chevron-right directionMobile" iconVal = "right" onClick = {handleSlides}></i>
        </div>
      </div>
    )
  }
}

export default App;


//<img id = "userimg" src = {require(`${this.props.userComment.user.image.webp}`)} alt="userImg"/>  window.innerWidth>480
//Home Shop About Contact Discover innovative ways to decorate We provide unmatched quality, comfort, and style for property owners across the country. Our experts combine form and function in bringing your vision to life. Create a room in your own style with our collection and make your property a reflection of you and what you love. Shop now We are available all across the globe With stores all over the world, it's easy for you to find furniture for your home or place of business. Locally, we’re in most major cities throughout the country. Find the branch nearest you using our store locator. Any questions? Don't hesitate to contact us today. Shop now Manufactured with the best materials Our modern furniture store provide a high level of quality. Our company has invested in advanced technology to ensure that every product is made as perfect and as consistent as possible. With three decades of experience in this industry, we understand what customers want for their home and office. Shop now About our furniture Our multifunctional collection blends design and function to suit your individual taste. Make each room unique, or pick a cohesive theme that best express your interests and what inspires you. Find the furniture pieces you need, from traditional to contemporary styles or anything in between. Product specialists are available to help you create your dream space.
