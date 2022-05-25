import { Box, Grid } from "@material-ui/core";
import { FunctionComponent, useRef, useState } from "react";
import Swiper from 'react-id-swiper';
import Slider from "../../../components/Slider";
import { CustomerFeedback } from "../../../models/customer-feedback";
import StarRateIcon from '@material-ui/icons/StarRate';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
const DATA: CustomerFeedback[] = [
    {
        name: 'Lyle Kauffman',
        address: 'District 7',
        job: 'Data Engineer',
        profileImageUrl: 'assets/images/feedback/Avatar.png',
        productImageUrl: 'assets/images/feedback/Image.png',
        feedback: {
            rating: 6,
            comment: "I just wanted to say that you so much for all the items! They are great. My baby girl clothes these are adorable! I'll let you know if there's more baby clothes ideas I can come up with!"
        }
    },
    {
        name: 'Lyle Kauffman',
        address: 'District 7',
        job: 'Data Engineer',
        profileImageUrl: 'assets/images/feedback/Avatar.png',
        productImageUrl: 'assets/images/feedback/Image.png',
        feedback: {
            rating: 2,
            comment: "I just wanted to say that you so much for all the items! They are great. My baby girl clothes these are adorable! I'll let you know if there's more baby clothes ideas I can come up with!"
        }
    }
]
type CustomerFeedbackProps = {
};

export const CustomerFeedbackComponent: FunctionComponent<CustomerFeedbackProps> = (props: CustomerFeedbackProps) => {
    const swiperRef:any = useRef(null);
    const [startIndex, setStartIndex] = useState(0);
    const screenWidth = window.innerWidth;
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
                    {DATA.map(cfb =>
                        <div className="customer-fb-content">
                            <Grid container spacing={8}>
                                <Grid item sm={6}>
                                    <Box className="avt-rating" display="flex" flexDirection="column" >
                                        <Box display="flex" flexDirection="row" alignItems="center">
                                            <img className="avt" src={cfb.profileImageUrl} />
                                            <div className="job-address">{cfb.job}, {cfb.address}</div>
                                        </Box>

                                        <div className="rating">
                                            {Array.from(Array(6).keys()).map(i =>
                                                i < cfb.feedback.rating ?
                                                    <StarIcon style={{ 'color': '#FEC84B' }} /> :
                                                    <StarBorderIcon />
                                            )}
                                        </div>
                                    </Box>
                                    <div className="comment">
                                        {cfb.feedback.comment}
                                    </div>
                                </Grid>
                                <Grid item sm={6}>
                                    <img src={cfb.productImageUrl} />
                                </Grid>
                            </Grid>
                        </div>
                    )}
                </Swiper>
            </Slider>

        </div>
    </div>
} 