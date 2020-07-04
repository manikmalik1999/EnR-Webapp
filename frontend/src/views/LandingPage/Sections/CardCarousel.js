import React, { Component, useState, useEffect} from 'react';
import ReactCardCarousel from 'react-card-carousel';
//second carousel
import ItemsCarousel from 'react-items-carousel';

//third
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import axios from 'axios'; 
import {Link} from 'react-router-dom';

import img1 from 'assets/img/faces/avatar.jpg';
import img2 from 'assets/img/faces/camp.jpg';
import img3 from 'assets/img/faces/kendall.jpg';
import img4 from 'assets/img/faces/marc.jpg';

import { makeStyles } from "@material-ui/core/styles";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";

import imagesStyles from "assets/jss/material-kit-react/imagesStyles.js";

import { cardTitle, cardLink, cardSubtitle } from "assets/jss/material-kit-react.js";

class MyCarousel extends Component {

  static get CARD_STYLE() {
    return {
      height: '17vw',
      width: '20vw',
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
      <ReactCardCarousel autoplay={ true } autoplay_speed={ 2500 } alignment="vertical">
        <div style={ MyCarousel.CARD_STYLE }>
          <h5>First Card</h5>
          <img src={img1} style={{height:"10vw", width:"12vw"}}/>
          <h6>Dope ass shit</h6>
        </div>
        <div style={ MyCarousel.CARD_STYLE }>
        <h5>Second Card</h5>
        </div>
        <div style={ MyCarousel.CARD_STYLE }>
        <h5>Third Card</h5>
        </div>
        <div style={ MyCarousel.CARD_STYLE }>
        <h5>Fourth Card</h5>
        </div>
        <div style={ MyCarousel.CARD_STYLE }>
        <h5>Fifth Card</h5>
        </div>
      </ReactCardCarousel>
    );
  }
}


const Caro = () => {
    const [activeItemIndex, setActiveItemIndex] = useState(0);
    const [products, setProducts] = useState([]);
    useEffect(() => {
      axios.get('https://limitless-lowlands-36879.herokuapp.com/products')
    .then(res =>{
      console.log(res);
      setProducts(res.data.products);
    })
    }, [])
  
  let filterpro = products
    return(
        <div style={{"padding":0,"maxWidth":"100%","margin":"0"}}>
  <ItemsCarousel
    infiniteLoop={false}
    gutter={12}
    activePosition={'center'}
    chevronWidth={60}
    disableSwipe={false}
    alwaysShowChevrons={false}
    numberOfCards={3}
    slidesToScroll={3}
    outsideChevron={false}
    showSlither={false}
    firstAndLastGutter={false}
    activeItemIndex={activeItemIndex}
    requestToChangeActive={setActiveItemIndex}
    rightChevron={'>'}
    leftChevron={'<'}
  >
    {filterpro.map(pro =>(
                                        <Card style={{maxWidth:"25vw", minWidth:"180px", maxHeight:"45vh", minHeight:"45vh"}}> 
                                            <CardActionArea>
                                              <CardMedia
                                                title={pro.name}
                                                
                                              >
                                                  <img style={{height: "20vh", width: "auto", marginLeft:"auto", marginRight:"auto", display:"block"}} src= {"https://limitless-lowlands-36879.herokuapp.com/" + pro.image} />
                                              </CardMedia>
                                              <CardContent>
                                                <Typography gutterBottom variant="h5" component="h2">
                                                    
                                                    <Link to={"/Display/" + pro._id} target="_blank">
                                                        {pro.name}
                                                    </Link>
                                                
                                                </Typography>
                                                <Typography variant="body2" color="textSecondary" component="p">
                                                      {pro.description}
                                                </Typography>
                                                <Typography variant="body2" color="textSecondary" component="p">
                                                  
                                                      <b>INR: {pro.price}</b>
                                                </Typography>
                                              </CardContent>
                                            </CardActionArea>
              
                                          </Card>
                                     
                                  
                ))}
  </ItemsCarousel>
</div>
    );
}

const styles = {
  ...imagesStyles,
  cardTitle,
  cardLink,
  cardSubtitle
};

const useStyles = makeStyles(styles);
  function Mul(props){
    const classes = useStyles();
      return (
        <Carousel
        additionalTransfrom={0}
        arrows
        autoPlay
        autoPlaySpeed={1800}
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
            items: 3,
            partialVisibilityGutter: 40
          },
          mobile: {
            breakpoint: {
              max: 464,
              min: 0
            },
            items: 1,
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
        <div className="md-col-4 xs-col-6">
        <Card style={{width: "98%"}}>
      <img
        style={{height: "200px", width: "100%", display: "block"}}
        className={classes.imgCardTop}
        src={img1}
        alt="Card-img-cap"
      />
      <CardBody>
        <h4 className={classes.cardTitle}>Card title</h4>
        <h6 className={classes.cardSubtitle}>Card Subtitle</h6>
        <p>Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        <Button color="primary">Do something</Button>&ensp;
        <a
          href="#pablo"
          className={classes.cardLink}
          onClick={(e) => e.preventDefault()}>
          Card link
        </a>
      </CardBody>
    </Card>
    </div>
    <div className="md-col-4 xs-col-6">
        <Card style={{width: "98%"}}>
      <img
        style={{height: "200px", width: "100%", display: "block"}}
        className={classes.imgCardTop}
        src={img2}
        alt="Card-img-cap"
      />
      <CardBody>
        <h4 className={classes.cardTitle}>Card title</h4>
        <h6 className={classes.cardSubtitle}>Card Subtitle</h6>
        <p>Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        <Button color="primary">Do something</Button>&ensp;
        <a
          href="#pablo"
          className={classes.cardLink}
          onClick={(e) => e.preventDefault()}>
          Card link
        </a>
      </CardBody>
    </Card>
    </div>
    <div className="md-col-4 xs-col-6">
        <Card style={{width: "98%"}}>
      <img
        style={{height: "200px", width: "100%", display: "block"}}
        className={classes.imgCardTop}
        src={img3}
        alt="Card-img-cap"
      />
      <CardBody>
        <h4 className={classes.cardTitle}>Card title</h4>
        <h6 className={classes.cardSubtitle}>Card Subtitle</h6>
        <p>Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        <Button color="primary">Do something</Button>&ensp;
        <a
          href="#pablo"
          className={classes.cardLink}
          onClick={(e) => e.preventDefault()}>
          Card link
        </a>
      </CardBody>
    </Card>
    </div>
    <div className="md-col-4 xs-col-6">
        <Card style={{width: "98%"}}>
      <img
        style={{height: "200px", width: "100%", display: "block"}}
        className={classes.imgCardTop}
        src={img4}
        alt="Card-img-cap"
      />
      <CardBody>
        <h4 className={classes.cardTitle}>Card title</h4>
        <h6 className={classes.cardSubtitle}>Card Subtitle</h6>
        <p>Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        <Button color="primary">Do something</Button>&ensp;
        <a
          href="#pablo"
          className={classes.cardLink}
          onClick={(e) => e.preventDefault()}>
          Card link
        </a>
      </CardBody>
    </Card>
    </div>
    <div className="md-col-4 xs-col-6">
        <Card style={{width: "98%"}}>
      <img
        style={{height: "200px", width: "100%", display: "block"}}
        className={classes.imgCardTop}
        src={img1}
        alt="Card-img-cap"
      />
      <CardBody>
        <h4 className={classes.cardTitle}>Card title</h4>
        <h6 className={classes.cardSubtitle}>Card Subtitle</h6>
        <p>Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        <Button color="primary">Do something</Button>&ensp;
        <a
          href="#pablo"
          className={classes.cardLink}
          onClick={(e) => e.preventDefault()}>
          Card link
        </a>
      </CardBody>
    </Card>
    </div>
    <div className="md-col-4 xs-col-6">
        <Card style={{width: "96%"}}>
      <img
        style={{height: "200px", width: "100%", display: "block"}}
        className={classes.imgCardTop}
        src={img2}
        alt="Card-img-cap"
      />
      <CardBody>
        <h4 className={classes.cardTitle}>Card title</h4>
        <h6 className={classes.cardSubtitle}>Card Subtitle</h6>
        <p>Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        <Button color="primary">Do something</Button>&ensp;
        <a
          href="#pablo"
          className={classes.cardLink}
          onClick={(e) => e.preventDefault()}>
          Card link
        </a>
      </CardBody>
    </Card>
    </div>
      </Carousel>);
  }

function Spec ()
{
  const classes = useStyles();
  const [product, setProduct] = useState([]);
    useEffect(() => {
      axios.get('https://limitless-lowlands-36879.herokuapp.com/products/5efcd5f083ae113688f92ea5')
    .then(res =>{
      console.log('this', res);
      setProduct(res.data.product);
    })
    }, [])
    return (
      <Card>
        <Link to={"/Display/" + product._id} target="_blank">
      <img className={classes.imgCard} style={{height: "60vh", width: "a60vw", marginLeft:"auto", marginRight:"auto", display:"block"}} src={"https://limitless-lowlands-36879.herokuapp.com/" + product.image} alt="Card-img" />
      <div className={classes.imgCardOverlay}>
        <h4 className={classes.cardTitle}>Witcher 3</h4>
        <p>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
        <p>Last updated 3 mins ago</p>
      </div>
      </Link>
    </Card>
    );

}
export  {MyCarousel, Caro,Mul,Spec};