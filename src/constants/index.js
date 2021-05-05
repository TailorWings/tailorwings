import passiveBagIcon from '../assets/icons/black-bag.svg';
import activeBagIcon from '../assets/icons/orange-bag.svg';

import chiffon from '../assets/images/fabric-chiffon.jpg';
import cotton from '../assets/images/fabric-cotton.jpg';
import linen from '../assets/images/fabric-linen.jpg';
import rayon from '../assets/images/fabric-rayon.jpg';
import satin from '../assets/images/fabric-satin.jpg';
import silk from '../assets/images/fabric-silk.jpg';

import topDressLength from '../assets/images/top-dress-length.jpg';
import neck from '../assets/images/neck.jpg';
import shoulder from '../assets/images/shoulder.jpg';
import bust from '../assets/images/bust.jpg';
import waist from '../assets/images/waist.jpg';
import hip from '../assets/images/hip.jpg';
import fullArmHole from '../assets/images/full-arm-hole.jpg';
import shoulderToWaistFront from '../assets/images/shoulder-to-waist-front.jpg';
import shoulderToWaistBack from '../assets/images/shoulder-to-waist-back.jpg';
import abdomen from '../assets/images/abdomen.jpg';
import bicep from '../assets/images/bicep.jpg';
import crothDepth from '../assets/images/croth-depth.jpg';
import crothLength from '../assets/images/croth-length.jpg';
import sleeve from '../assets/images/sleeve.jpg';
import highHip from '../assets/images/high-hip.jpg';
import pantLength from '../assets/images/pant-length.jpg';
import thigh from '../assets/images/thigh.jpg';

// Homepage
export const HOW_IT_WORK_TITLE = 'Personalizing all your fashion has never been easier';
export const HOW_IT_WORK_SUBTITLE =
	'Our mission is to make you look and feel your best. We’ve brought old fashioned tailoring into the 21st century, making it easy and affordable for you. Experience your own well fitting custom-made clothing online from the comfort of your own home or anywhere you want.';

// Requirement page
export const RQPAGE_TITLE = 'What do you want to be tailored?';
export const RQPAGE_SUBTITLE =
	'Please send us at least 03 pictures of the design you want to make. More detail picture more better results of clothes be made.';
export const STYLES_OF_CLOTHE = ['dress', 'shirts', 'pants', 'skirts', 'ao dai'];
export const STYLE_ESTIMATE_PRICE = [
	{
		id: 'dress',
		estPrice: 300000,
		fabricLength: 2
	},
	{
		id: 'shirts',
		estPrice: 200000,
		fabricLength: 1.5

	},
	{
		id: 'pants',
		estPrice: 250000,
		fabricLength: 1.5
	},
	{
		id: 'skirts',
		estPrice: 200000,
		fabricLength: 1.5
	},
	{
		id: 'ao dai',
		estPrice: 700000,
		fabricLength: 3.5
	},
];

// Fabric page
export const FABRIC_TYPE_TITLE = 'Choose the fabric type for your design';
export const FABRIC_TYPE_SUBTITLE =
	'Here you can find all of our available fabrics (more will be added by time). Just click on the fabric for more detail and selection to continue.';
export const FABRIC_TYPES = [
	{
		id: 'COT',
		name: 'cotton',
		image: cotton,
		price: 100000,
		info: [
			{
				label: 'FABRIC TYPE',
				value: 'Cotton',
			},
			{
				label: 'SUITABLE COSTUME',
				value: 'T-shirts, dresses, skirts and pants and childrenswear',
			},
			{
				label: 'DETAIL',
				value: `100% Cotton`,
			},
		],
	},
	{
		id: 'LIN',
		name: 'Linen',
		image: linen,
		price: 150000,
		info: [
			{
				label: 'FABRIC TYPE',
				value: 'Linen',
			},
			{
				label: 'SUITABLE COSTUME',
				value: 'T-shirts, dresses, skirts and pants and childrenswear',
			},
			{
				label: 'DETAIL',
				value: `100% Linen made from fibers derived from the stems of the flax plan`,
			},
		],
	},
	{
		id: 'SIL',
		name: 'silk',
		image: silk,
		price: 240000,
		info: [
			{
				label: 'FABRIC TYPE',
				value: 'Silk',
			},
			{
				label: 'SUITABLE COSTUME',
				value: 'T-shirts, dresses, skirts and pants',
			},
			{
				label: 'DETAIL',
				value: `100% Nature Silk made from fibers created by the silkworm insect.`,
			},
		],
	},
	{
		id: 'RAY',
		name: 'rayon',
		image: rayon,
		price: 100000,
		info: [
			{
				label: 'FABRIC TYPE',
				value: 'Rayon',
			},
			{
				label: 'SUITABLE COSTUME',
				value: 'T-shirts, dresses, skirts and pants and childrenswear',
			},
			{
				label: 'DETAIL',
				value: `100% Rayon made from purified cellulose fibers, which are typically created from wood pulp`,
			},
		],
	},
	{
		id: 'CIF',
		name: 'chiffon',
		image: chiffon,
		price: 80000,
		info: [
			{
				label: 'FABRIC TYPE',
				value: 'Chiffon',
			},
			{
				label: 'SUITABLE COSTUME',
				value: 'T-shirts, dresses, skirts and pants',
			},
			{
				label: 'DETAIL',
				value: `100% Polyester`,
			},
		],
	},
	{
		id: 'SAT',
		name: 'satin',
		image: satin,
		price: 90000,
		info: [
			{
				label: 'FABRIC TYPE',
				value: 'Satin',
			},
			{
				label: 'SUITABLE COSTUME',
				value: 'T-shirts, dresses, skirts and pants',
			},
			{
				label: 'DETAIL',
				value: `100% Polyester`,
			},
		],
	},
];
export const FABRIC_TOOLTIP_TITLE = 'Information';
export const FABRIC_PATTERN_TITLE = 'What colour or pattern do you like?';
export const FABRIC_PATTERN_SUBTITLE =
	'Use the filter to choose the available selection and continue with the one that suits you best.';
export const PATTERN_COLLECTIONS = [
	{ name: 'all', id: 'all' },
	{ name: 'flower', id: 'FLO' },
	{ name: 'animal', id: 'ANI' },
	{ name: 'plain', id: 'PLA' },
	{ name: 'stripped', id: 'STR' },
	{ name: 'spotted', id: 'SPO' },
];
// Measurement page
export const MSMT_OPTION_TITLE = 'Your measurement';
export const MSMT_OPTION_SUBTITLE = `Build a personalized measurement profile in minutes. Whether you are dressing for work or that style blog side hustle, get ready to be spoiled by the best fit of your life.`;
export const MSMT_METHODS = [
	// {
	// 	name: 'offline',
	// 	desc:
	// 		'If you are unable to measure yourself, you can schedule an appointment with our nearest tailor. This option will incur additional charges.',
	// 	buttonText: 'Make An Appointment',
	// 	link: '/offline',
	// },
	{
		name: 'online',
		desc: 'Taking your measurements is quick and easy with our instruction.',
		buttonText: 'View Guidance Images',
		link: '/online',
	},
	{
		name: 'standard size',
		desc:
			'You can also use standard sizes if you like. Use the table below for finding the right one.',
		buttonText: 'Pick Sizes',
		link: '/standard-size',
	},
];
export const ONLINE_MEASUREMENTS = [
	{
		style: 'dress',
		msmts: [
			{
				id: 'shoulder',
				label: 'Shoulder',
				guide: shoulder,
			},
			{
				id: 'sleeve',
				label: 'sleeve',
				guide: sleeve,
			},
			{
				id: 'fullarmhole',
				label: 'full armhole',
				guide: fullArmHole,
			},
			{
				id: 'bicep',
				label: 'Bicep',
				guide: bicep,
			},
			{
				id: 'bust',
				label: 'bust',
				guide: bust,
			},
			{
				id: 'waist',
				label: 'Waist',
				guide: waist,
			},
			{
				id: 'shouldertowaistfront',
				label: 'shoulder to waist front',
				guide: shoulderToWaistFront,
			},
			{
				id: 'shouldertowaistback',
				label: 'shoulder to waist back',
				guide: shoulderToWaistBack,
			},
			{
				id: 'hip',
				label: 'Hip',
				guide: hip,
			},
			{
				id: 'crothdepth',
				label: 'croth depth',
				guide: crothDepth,
			},
			{
				id: 'dresslength',
				label: 'dress length',
				guide: topDressLength,
			},
			{
				id: 'thigh',
				label: 'thigh',
				guide: thigh,
			},
			{
				id: 'highhip',
				label: 'high hip',
				guide: highHip,
			},
		],
	},
	{
		style: 'shirts',
		msmts: [
			{
				id: 'shoulder',
				label: 'Shoulder',
				guide: shoulder,
			},
			{
				id: 'sleeve',
				label: 'sleeve',
				guide: sleeve,
			},
			{
				id: 'fullarmhole',
				label: 'full armhole',
				guide: fullArmHole,
			},
			{
				id: 'bicep',
				label: 'Bicep',
				guide: bicep,
			},
			{
				id: 'bust',
				label: 'bust',
				guide: bust,
			},
			{
				id: 'waist',
				label: 'Waist',
				guide: waist,
			},
			{
				id: 'shouldertowaistfront',
				label: 'shoulder to waist front',
				guide: shoulderToWaistFront,
			},
			{
				id: 'shouldertowaistback',
				label: 'shoulder to waist back',
				guide: shoulderToWaistBack,
			},
			{
				id: 'hip',
				label: 'Hip',
				guide: hip,
			},
			{
				id: 'dresslength',
				label: 'dress length',
				guide: topDressLength,
			},
			{
				id: 'highhip',
				label: 'high hip',
				guide: highHip,
			},
		],
	},
	{
		style: 'pants',
		msmts: [
			{
				id: 'abdomen',
				label: 'abdomen',
				guide: abdomen,
			},
			{
				id: 'hip',
				label: 'Hip',
				guide: hip,
			},
			{
				id: 'crothdepth',
				label: 'croth depth',
				guide: crothDepth,
			},
			{
				id: 'pantlength',
				label: 'pant length',
				guide: pantLength,
			},
			{
				id: 'thigh',
				label: 'thigh',
				guide: thigh,
			},
			{
				id: 'highhip',
				label: 'high hip',
				guide: highHip,
			},
		],
	},
	{
		style: 'skirts',
		msmts: [
			{
				id: 'abdomen',
				label: 'abdomen',
				guide: abdomen,
			},
			{
				id: 'hip',
				label: 'Hip',
				guide: hip,
			},
			{
				id: 'crothdepth',
				label: 'croth depth',
				guide: crothDepth,
			},
			{
				id: 'pantlength',
				label: 'pant length',
				guide: topDressLength,
			},
			{
				id: 'thigh',
				label: 'thigh',
				guide: thigh,
			},
			{
				id: 'highhip',
				label: 'high hip',
				guide: highHip,
			},
		],
	},
	{
		style: 'ao dai',
		msmts: [
			{
				id: 'shoulder',
				label: 'Shoulder',
				guide: shoulder,
			},
			{
				id: 'sleeve',
				label: 'sleeve',
				guide: sleeve,
			},
			{
				id: 'fullarmhole',
				label: 'full armhole',
				guide: fullArmHole,
			},
			{
				id: 'bicep',
				label: 'Bicep',
				guide: bicep,
			},
			{
				id: 'bust',
				label: 'bust',
				guide: bust,
			},
			{
				id: 'waist',
				label: 'Waist',
				guide: waist,
			},
			{
				id: 'shouldertowaistfront',
				label: 'shoulder to waist front',
				guide: shoulderToWaistFront,
			},
			{
				id: 'shouldertowaistback',
				label: 'shoulder to waist back',
				guide: shoulderToWaistBack,
			},
			{
				id: 'hip',
				label: 'Hip',
				guide: hip,
			},
			{
				id: 'dresslength',
				label: 'dress length',
				guide: topDressLength,
			},
		],
	},
];
export const STANDARD_SIZES = ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL'];

// Summary page
export const RQMT_SUM_TITLE = 'Summary';
export const RQMT_SUM_SUBTITLE =
	'Almost done!!! Your idea is awesome and I cannot wait to tailor it right away for you';
export const NOTE_SUM_TITLE = 'Personalizing Your Clothes';
export const NOTE_SUM_SUBTITLE =
	'This is an important step. The product will be tailored to fit  and how you want IF you describe us your needs with as much detail as possible. Including the parts of your body that you consider your weaknesseses. Our tailors will help you deduct them.';

// Account page
export const ACCOUNT_SIDEBAR_ITEMS = [
	// {
	// 	text: 'Profile information',
	// 	path: '/account/profile',
	// 	activeIcon: activeProfileIcon,
	// 	passiveIcon: passiveProfileIcon,
	// },
	{
		text: 'Order management',
		path: '/account/order',
		activeIcon: activeBagIcon,
		passiveIcon: passiveBagIcon,
	},
	// {
	// 	text: 'Body measurment',
	// 	path: '/account/measurement',
	// 	activeIcon: activeStarIcon,
	// 	passiveIcon: passiveStarIcon,
	// },
];

export const SHIPPING_INFO = [
	{
		id: 'name',
		label: 'Name',
		value: '',
	},
	{
		id: 'phone',
		label: 'Phone number',
		value: '',
	},
	// {
	// 	label: 'City',
	// 	value: '',
	// },
	// {
	// 	label: 'District',
	// 	value: '',
	// },
	// {
	// 	label: 'Ward',
	// 	value: '',
	// },
	{
		id: 'address',
		label: 'Address',
		value: '',
	},
	{
		id: 'notes',
		label: 'notes',
		value: '',
	},
];

// export const TEST_ORDER_INFO = [
// 	{
// 		id: 1000,
// 		orderDate: '14/2/2020',
// 		offer: [
// 			{
// 				tailor: { name: 'Hiền Cát Lái' },
// 				time: 4,
// 				price: 763000,
// 				picked: false,
// 			},
// 			{
// 				tailor: { name: 'Cô Ly' },
// 				time: 4,
// 				price: 830000,
// 				picked: true,
// 			},
// 			{
// 				tailor: { name: 'Cô Loan' },
// 				time: 7,
// 				price: 2300000,
// 				picked: false,
// 			},
// 		],
// 		receiveDate: null,
// 		pickedOfferIndex: null,
// 		finishDate: null,
// 		status: 'finding',
// 	},
// 	{
// 		id: 1001,
// 		orderDate: '2/2/2020',
// 		offer: [
// 			{
// 				tailor: { name: 'Hiền Cát Lái' },
// 				time: 4,
// 				price: 763000,
// 				picked: false,
// 			},
// 			{
// 				tailor: { name: 'Cô Ly' },
// 				time: 4,
// 				price: 830000,
// 				picked: true,
// 			},
// 			{
// 				tailor: { name: 'Cô Loan' },
// 				time: 7,
// 				price: 2300000,
// 				picked: false,
// 			},
// 		],
// 		receiveDate: null,
// 		pickedOfferIndex: null,
// 		finishDate: null,
// 		status: 'finding',
// 	},
// 	{
// 		id: 1002,
// 		orderDate: '2/4/2020',
// 		offer: [
// 			{
// 				tailor: { name: 'Hiền Cát Lái' },
// 				time: 4,
// 				price: 763000,
// 				picked: false,
// 			},
// 			{
// 				tailor: { name: 'Cô Ly' },
// 				time: 4,
// 				price: 830000,
// 				picked: true,
// 			},
// 			{
// 				tailor: { name: 'Cô Loan' },
// 				time: 7,
// 				price: 2300000,
// 				picked: false,
// 			},
// 		],
// 		receiveDate: '7/4/2020',
// 		pickedOfferIndex: 0,
// 		finishDate: null,
// 		status: 'tailoring',
// 	},
// 	{
// 		id: 1003,
// 		orderDate: '2/4/2020',
// 		offer: [
// 			{
// 				tailor: { name: 'Hiền Cát Lái' },
// 				time: 4,
// 				price: 763000,
// 				picked: false,
// 			},
// 			{
// 				tailor: { name: 'Cô Ly' },
// 				time: 4,
// 				price: 830000,
// 				picked: true,
// 			},
// 			{
// 				tailor: { name: 'Cô Loan' },
// 				time: 7,
// 				price: 2300000,
// 				picked: false,
// 			},
// 		],
// 		receiveDate: '7/4/2020',
// 		pickedOfferIndex: 1,
// 		finishDate: null,
// 		status: 'tailoring',
// 	},
// 	{
// 		id: 1004,
// 		orderDate: '2/3/2020',
// 		offer: [
// 			{
// 				tailor: { name: 'Hiền Cát Lái' },
// 				time: 4,
// 				price: 763000,
// 				picked: false,
// 			},
// 			{
// 				tailor: { name: 'Cô Ly' },
// 				time: 4,
// 				price: 830000,
// 				picked: true,
// 			},
// 			{
// 				tailor: { name: 'Cô Loan' },
// 				time: 7,
// 				price: 2300000,
// 				picked: false,
// 			},
// 		],
// 		receiveDate: '7/3/2020',
// 		pickedOfferIndex: 2,
// 		finishDate: '10/3/2020',
// 		status: 'finish',
// 	},
// 	{
// 		id: 1005,
// 		orderDate: '1/2/2020',
// 		offer: [
// 			{
// 				tailor: { name: 'Hiền Cát Lái' },
// 				time: 4,
// 				price: 763000,
// 				picked: false,
// 			},
// 			{
// 				tailor: { name: 'Cô Ly' },
// 				time: 4,
// 				price: 830000,
// 				picked: true,
// 			},
// 			{
// 				tailor: { name: 'Cô Loan' },
// 				time: 7,
// 				price: 2300000,
// 				picked: false,
// 			},
// 		],
// 		receiveDate: '3/2/2020',
// 		pickedOfferIndex: 1,
// 		finishDate: '7/2/2020',
// 		status: 'finish',
// 	},
// 	{
// 		id: 1006,
// 		orderDate: '1/2/2020',
// 		offer: [
// 			{
// 				tailor: { name: 'Hiền Cát Lái' },
// 				time: 4,
// 				price: 763000,
// 				picked: false,
// 			},
// 			{
// 				tailor: { name: 'Cô Ly' },
// 				time: 4,
// 				price: 830000,
// 				picked: true,
// 			},
// 			{
// 				tailor: { name: 'Cô Loan' },
// 				time: 7,
// 				price: 2300000,
// 				picked: false,
// 			},
// 		],
// 		receiveDate: '3/2/2020',
// 		pickedOfferIndex: 1,
// 		finishDate: '7/2/2020',
// 		status: 'finish',
// 	},
// ];
