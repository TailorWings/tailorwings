import { Box, Grid } from "@material-ui/core";
import { Fragment, FunctionComponent, useRef, useState } from "react";
import Swiper from 'react-id-swiper';
import Slider from "../../../components/Slider";
import { CustomerFeedback } from "../../../models/customer-feedback";
import StarRateIcon from '@material-ui/icons/StarRate';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
const DATA: CustomerFeedback[] = [
    {
        name: 'Katie',
        address: 'England',
        // job: 'Data Engineer',
        profileImageUrl: '',
        productImageUrl: 'assets/images/feedback/Katie.png',
        feedback: {
            rating: 6,
            comment: "Hi, thank you for being awesome with the clothes- am I okay to pass your name onto some friends?"
        }
    },
    {
        name: 'Annie',
        address: 'Hartland Devon',
        // job: 'Data Engineer',
        profileImageUrl: '',
        productImageUrl: 'assets/images/feedback/Annie.png',
        feedback: {
            rating: 6,
            comment: "It looks great, thanks so much!"
        }
    },
    {
        name: 'Lydia',
        address: 'Pittsburgh',
        // job: 'Data Engineer',
        // profileImageUrl: 'assets/images/feedback/Avatar.png',
        productImageUrl: 'assets/images/feedback/Lydia.png',
        feedback: {
            rating: 6,
            comment: "The dress was perfect!!!! Thank you so much!! Everyone loved it! I will be back for more & share you with my friends!!"
        }
    },
    {
        name: 'Anne',
        address: 'Viet Nam',
        // job: 'Data Engineer',
        // profileImageUrl: 'assets/images/feedback/Avatar.png',
        productImageUrl: 'assets/images/feedback/Anne.png',
        feedback: {
            rating: 6,
            comment: "Everything look so nice and fits perfectly. So so so pretty!!! And great quality <3"
        }
    },
    {
        name: 'Evan',
        address: 'Viet Nam',
        // job: 'Data Engineer',
        // profileImageUrl: 'assets/images/feedback/Avatar.png',
        productImageUrl: 'assets/images/feedback/Evan.png',
        feedback: {
            rating: 6,
            comment: "I wear this shirt all the time! I was hoping I could have you make me some more in this style with different colors?"
        }
    }
]
type CustomerFeedbackProps = {
};

export const CustomerFeedbackComponent: FunctionComponent<CustomerFeedbackProps> = (props: CustomerFeedbackProps) => {
    const swiperRef: any = useRef(null);
    const [startIndex, setStartIndex] = useState(0);
    const screenWidth = window.innerWidth;
    const isMobile = screenWidth < 769;
    const params: any = {
        slidesPerView: 1,
        slidesPerColumn: 1,
        spaceBetween: screenWidth < 769 ? 5 : 16,
        slidesPerColumnFill: 'row',
        lazy: true,
        rebuildOnUpdate: true,
        // navigation: {
        // 	nextEl: '.swiper-button-next',
        // 	prevEl: '.swiper-button-prev',
        // },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        on: {},
    };

    return <div className="customer-fb-container">
        <div className="title">
            <span>What people are saying about us</span>
        </div>
        <div className="fb-container">
            <Slider swiperRef={swiperRef}>
                <Swiper {...params} ref={swiperRef}>
                    {DATA.map((cfb, idx) =>
                        <div key={idx} className="customer-fb-content">
                            {!isMobile ? desktopUI(cfb) : mobileUI(cfb)}
                        </div>
                    )}
                </Swiper>
            </Slider>

        </div>
    </div>
}

function mobileUI(cfb: CustomerFeedback) {
    return <Grid container direction="column">
        <Grid item container justifyContent="center">
            {!!cfb.profileImageUrl ? <img className="avt" src={cfb.profileImageUrl} /> : <Fragment/>}
        </Grid>
        <Grid item container justifyContent="center">
            {ratingUI(cfb)}
        </Grid>
        <Grid item container justifyContent="center">
            <span className="customer-name">{cfb.name}</span>
        </Grid>
        <Grid item container justifyContent="center">
            <span className="job-address">{cfb.job}, {cfb.address}</span>
        </Grid>
        <Grid item container justifyContent="center">
            <span className="comment">
                {cfb.feedback.comment}
            </span>
        </Grid>
        <Grid item container justifyContent="center">
            <img className="customer-product-image" src={cfb.productImageUrl} />
        </Grid>
    </Grid>;
}

function desktopUI(cfb: CustomerFeedback) {
    return <Grid container spacing={8}>
        <Grid item sm={6}>
            <Box className="avt-rating" display="flex" flexDirection="column">
                <Box display="flex" flexDirection="row" alignItems="center">
                    {!!cfb.profileImageUrl ? <img className="avt" src={cfb.profileImageUrl} /> : <Fragment/>}
                    <div style={{'marginLeft': !!cfb.profileImageUrl ? '16px' : '0px'}}>
                        <div className="customer-name">{cfb.name}</div>
                        <div className="job-address">{!!cfb.job ? cfb.job + ', ' : ''}{cfb.address}</div>
                    </div>
                </Box>
                {ratingUI(cfb)}
            </Box>
            <div className="comment">
                {cfb.feedback.comment}
            </div>
        </Grid>
        <Grid item sm={6}>
            <img src={cfb.productImageUrl} />
        </Grid>
    </Grid>;
}

function ratingUI(cfb: CustomerFeedback) {
    return <div className="rating">
        {Array.from(Array(6).keys()).map(i => i < cfb.feedback.rating ?
            <StarIcon key={i} style={{ 'color': '#FEC84B' }} /> :
            <StarBorderIcon key={i} />
        )}
    </div>;
}
