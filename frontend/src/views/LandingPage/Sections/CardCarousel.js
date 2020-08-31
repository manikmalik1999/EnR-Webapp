import React, { Component, useState, useEffect } from 'react';
import ReactCardCarousel from 'react-card-carousel';
//second carousel
import ItemsCarousel from 'react-items-carousel';

//third
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Chip from '@material-ui/core/Chip';
import StarRateIcon from '@material-ui/icons/StarRate';
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

import img1 from 'assets/img/img1.jpg';

import img3 from 'assets/img/img3.jpg';
import img4 from 'assets/img/img4.jpg';
import img5 from 'assets/img/img5.jpg';

import img7 from 'assets/img/img7.jpg';
import img8 from 'assets/img/img8.jpg';
import img11 from 'assets/img/img11.png';
import img9 from 'assets/img/sofa.jpg';
import img10 from 'assets/img/sport.jpg';

import card1 from 'assets/img/card1.jpg';
import card2 from 'assets/img/card2.jpg';

import card4 from 'assets/img/card4.png';
import card5 from 'assets/img/card5.jpg';

import { makeStyles } from "@material-ui/core/styles";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";

import imagesStyles from "assets/jss/material-kit-react/imagesStyles.js";

import { cardTitle, cardLink, cardSubtitle } from "assets/jss/material-kit-react.js";

class MyCarousel extends Component {
  static get CARD_STYLE() {
    return {
      height: '17vw',
      width: '25vw',
      paddingTop: 'auto',
      textAlign: 'center',
      background: '#52C0F5',
      color: '#FFF',
      fontSize: '12px',
      textTransform: 'uppercase',
      borderRadius: '10px',
    };
  }

  render() {
    return (
      <ReactCardCarousel autoplay={true} autoplay_speed={2500} alignment="vertical">
        <div style={MyCarousel.CARD_STYLE}>
          <img src={card1} style={{ height: "17vw", width: "25vw" }} />
        </div>
        <div style={MyCarousel.CARD_STYLE}>
          <img src={card2} style={{ height: "17vw", width: "25vw" }} />
        </div>
        <div style={MyCarousel.CARD_STYLE}>
          <h2 style={{color:"black",height:"100%",margin:"auto",padding:"12px"}}>Use FIRST15 on your first Purchase <br/> <br/> Use JULY10 to avail july discount</h2>
        </div>
        <div style={MyCarousel.CARD_STYLE}>
          <img src={card4} style={{ height: "17vw", width: "25vw" }} />
        </div>  
        <div style={MyCarousel.CARD_STYLE}>
          <img src={card5} style={{ height: "17vw", width: "25vw" }} />
        </div>
      </ReactCardCarousel>
    );
  }
}

const noOfItems = 12;
const noOfCards = 3;
const autoPlayDelay = 4000;
const chevronWidth = 40;
class Caro extends React.Component {

  state = {
    activeItemIndex: 0,
  };

  componentDidMount() {
    this.interval = setInterval(this.tick, autoPlayDelay);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  tick = () => this.setState(prevState => ({
    activeItemIndex: (prevState.activeItemIndex + 1) % (noOfItems - noOfCards + 1),
  }));

  onChange = value => this.setState({ activeItemIndex: value });

  render() {
    return (
      <ItemsCarousel
        infiniteLoop={true}
        gutter={12}
        activePosition={'center'}
        chevronWidth={60}
        disableSwipe={false}
        alwaysShowChevrons={false}
        numberOfCards={1}
        slidesToScroll={1}
        outsideChevron={false}
        showSlither={false}
        firstAndLastGutter={false}
        activeItemIndex={this.state.activeItemIndex}
        requestToChangeActive={this.onChange}
        rightChevron={'>'}
        leftChevron={'<'}
      >

        <div className="xs-col-12" style={{ textAlign: "center" }} >
          <img
            style={{ height: "400px", width: "100%", display: "block", marginLeft: "0" }}
            src={img9}
            alt="Card-img-cap"
          />
        </div>
        <div className="xs-col-12" style={{ textAlign: "center" }} >
          <img
            style={{ height: "400px", width: "100%", display: "block", marginLeft: "0" }}
            src={img10}
            alt="Card-img-cap"
          />
        </div>
        <div className="xs-col-12" style={{ textAlign: "center" }} >
          <img
            style={{ height: "400px", width: "100%", display: "block", marginLeft: "0" }}
            src={img11}
            alt="Card-img-cap"
          />
        </div>
        {/* <div className="xs-col-12" style={{ textAlign: "center" }} >
          <img
            style={{ height: "400px", width: "100%", display: "block", marginLeft: "0" }}
            src={img6}
            alt="Card-img-cap"
          />
        </div> */}
        {/* <div className="xs-col-12" style={{ textAlign: "center" }}>
          <img
            style={{ height: "400px", width: "100%", display: "block", marginLeft: "0" }}
            src={img5}
            alt="Card-img-cap"
          />
        </div> */}
        <div className="xs-col-12" style={{ textAlign: "center" }}>
          <img
            style={{ height: "400px", width: "100%", display: "block", marginLeft: "0" }}
            src={img4}
            alt="Card-img-cap"
          />
        </div>
        <div className="xs-col-12" style={{ textAlign: "center" }}>
          <img
            style={{ height: "400px", width: "100%", display: "block", marginLeft: "0" }}
            src={img9}
            alt="Card-img-cap"
          />
        </div>
        <div className="xs-col-12" style={{ textAlign: "center" }}>
          <img
            style={{ height: "400px", width: "100%", display: "block", marginLeft: "0" }}
            src={img7}
            alt="Card-img-cap"
          />
        </div>
        
        {/* <div className="xs-col-12" style={{ textAlign: "center" }}>
          <img
            style={{ height: "400px", width: "100%", display: "block", marginLeft: "0" }}
            src={img6}
            alt="Card-img-cap"
          />
        </div> */}
        <div className="xs-col-12" style={{ textAlign: "center" }}>
          <img
            style={{ height: "400px", width: "100%", display: "block", marginLeft: "0" }}
            src={img8}
            alt="Card-img-cap"
          />
        </div>
        <div className="xs-col-12" style={{ textAlign: "center" }}>
          <img
            style={{ height: "400px", width: "100%", display: "block", marginLeft: "0" }}
            src={img1}
            alt="Card-img-cap"
          />
        </div>
        {/* <div className="xs-col-12" style={{ textAlign: "center" }}>
          <img
            style={{ height: "400px", width: "100%", display: "block", marginLeft: "0" }}
            src={img2}
            alt="Card-img-cap"
          />
        </div> */}
        <div className="xs-col-12" style={{ textAlign: "center" }}>
          <img
            style={{ height: "400px", width: "100%", display: "block", marginLeft: "0" }}
            src={img3}
            alt="Card-img-cap"
          />
        </div>
        {/* <div className="xs-col-12" style={{ textAlign: "center" }}>
          <img
            style={{ height: "400px", width: "100%", display: "block", marginLeft: "0" }}
            src={img6}
            alt="Card-img-cap"
          />
        </div> */}
        <div className="xs-col-12" style={{ textAlign: "center" }}>
          <img
            style={{ height: "400px", width: "100%", display: "block", marginLeft: "0" }}
            src={img7}
            alt="Card-img-cap"
          />
        </div>
      </ItemsCarousel>
    );
  }
}

const styles = {
  ...imagesStyles,
  cardTitle,
  cardLink,
  cardSubtitle
};

const useStyles = makeStyles(styles);
function Mul() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios.get('https://limitless-lowlands-36879.herokuapp.com/products')
      .then(res => {
        console.log(res);
        setProducts(res.data.products);
      })
  }, [])

  let filterpro = products;
  return (
    <Carousel
      additionalTransfrom={0}
      showDots={true}
      arrows
      autoPlay
      autoPlaySpeed={3800}
      centerMode={false}
      className=""
      containerClass="container-with-dots"
      dotListClass=""
      draggable
      focusOnSelect={false}
      infinite
      itemClass=""
      keyBoardControl
      minimumTouchDrag={80}
      renderButtonGroupOutside={false}
      renderDotsOutside={false}
      responsive={{
        desktop: {
          breakpoint: {
            max: 3000,
            min: 1024
          },
          items: 4,
          partialVisibilityGutter: 40,
        },
        mobile: {
          breakpoint: {
            max: 464,
            min: 0
          },
          items: 2,
          partialVisibilityGutter: 30
        },
        tablet: {
          breakpoint: {
            max: 1024,
            min: 464
          },
          items: 2,
          partialVisibilityGutter: 30
        }
      }}
      showDots={false}
      sliderClass=""
      slidesToSlide={1}
      swipeable
    >
      {filterpro.map(pro => (
        <GridItem md={12}>
          <CardActionArea>
            <CardMedia title={pro.name} >
              <img style={{ height: "37vh", maxWidth: "100%", marginLeft: "auto", marginRight: "auto", display: "block" }} src={"https://limitless-lowlands-36879.herokuapp.com/" + pro.image} />
            </CardMedia>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2" align="center">
                <Link to={"/Display/" + pro._id} target="_blank">
                  {pro.name}
                  {/*<Chip color="secondary" label={AvgRev} size="small" icon={<StarRateIcon />} />*/}
                </Link>
              </Typography>
              <Typography variant="h6" style={{color:"green"}} component="p" align="center">
                <b>£: {pro.price}</b>
                {pro.review ?
                      <Chip color="secondary" style={{ marginLeft: "46px" }} label={pro.review} clickable size="small" icon={<StarRateIcon />} />
                      : null}
              </Typography>
            </CardContent>
          </CardActionArea>
          <Typography variant="body2" color="textSecondary" component="h5" style={{ marginLeft: "10px", fontSize:"1.1rem" }} align="center">
            {pro.description}
          </Typography>
        </GridItem>
      ))}
    </Carousel>);
}

function Spec() {
  const classes = useStyles();
  const [product, setProduct] = useState([]);
  useEffect(() => {
    axios.get('https://limitless-lowlands-36879.herokuapp.com/products/5efcd5f083ae113688f92ea5')
      .then(res => {
        console.log('this', res);
        setProduct(res.data.product);
      })
  }, [])
  return (
    <Card>
      <Link to={"/Display/" + product._id} target="_blank">
        
      <GridContainer justify="center" alignItems="center" style={{height:"55vh"}}>
                      <GridItem xs={12}>
        <img className={classes.imgCard} style={{ maxHeight: "55vh", width: "a60vw", marginLeft: "auto", marginRight: "auto", display: "block" }} src={img5}/*src={"https://limitless-lowlands-36879.herokuapp.com/" + product.image}*/ alt="Card-img" />
        </GridItem>
        </GridContainer>
      </Link>
    </Card>
  );

}
export { MyCarousel, Caro, Mul, Spec };