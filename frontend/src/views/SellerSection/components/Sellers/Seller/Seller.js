import React from 'react'
import { Card, Icon, Image } from 'semantic-ui-react';
import { Link, withRouter } from "react-router-dom";
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import DraftsRoundedIcon from '@material-ui/icons/DraftsRounded';
import LabelImportantRoundedIcon from '@material-ui/icons/LabelImportantRounded';
import elliot from "../../../assets/img/elliot.jpg";

const Seller = (props) => {
    // const im1 = "https://react.semantic-ui.com/images/avatar/large/elliot.jpg";
    // const im2 = "https://react.semantic-ui.com/images/avatar/large/matthew.png";
    // let img = (Math.random() >= 0.5) ? im1 : im2;
    // console.log(img);
    return (
        <Card style={{ width: "100%", boxShadow: "1px 2px 15px lightgrey" }}>
            <Image src={elliot} style={{ maxHeight: "240px" }} ui={false} />
            <Card.Content style={{ padding: "10px", paddingLeft: "18px", paddingBottom: "0px" }}>
                <h4 style={{ color: "#222021", fontSize: "18px", margin: "0px" }}>{props.seller.name}</h4>
                <Card.Meta style={{ color: "#808588", fontSize: "13px", marginBottom: "14px" }}>Joined in 2016</Card.Meta>
                <Card.Description style={{ color: "#48494B" }}>
                    This is some description about Seller.
                </Card.Description>
                <hr style={{ margin: "2px auto" }} />
            </Card.Content>
            <Card.Content style={{ padding: "8px", margin: "auto", width: "100%" }}>
                <DraftsRoundedIcon style={{ marginRight: "12px", marginLeft: "18px" }} />
                {props.seller.email}
                <Link to={{
                    pathname: "/dashboard/sellers/" + props.seller._id + "/" + props.seller.name + "/" + props.seller.email,
                    // myData: {
                    //     name: props.seller.name,
                    //     email : props.seller.email
                    // }
                }}>
                    <LabelImportantRoundedIcon style={{ float: "right", marginRight: "12px" }} />
                </Link>
            </Card.Content>
        </Card>
    )
}

export default Seller;