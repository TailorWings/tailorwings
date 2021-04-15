import passiveStarIcon from '../assets/icons/black-star.svg';
import activeStarIcon from '../assets/icons/orange-star.svg';
import passiveBagIcon from '../assets/icons/black-bag.svg';
import activeBagIcon from '../assets/icons/orange-bag.svg';
import passiveProfileIcon from '../assets/icons/black-profile.svg';
import activeProfileIcon from '../assets/icons/orange-profile.svg';

// Homepage
export const HOW_IT_WORK_TITLE = 'Personalizing all your fashion has never been easier';
export const HOW_IT_WORK_SUBTITLE =
	'Our mission is to make you look and feel your best. We’ve brought old fashioned tailoring into the 21st century, making it easy and affordable for you. Experience your own perfectly fitting custom-made clothing online from the comfort of your own home or anywhere you want.';

// Requirement page
export const RQPAGE_TITLE = 'What do you want to be tailored?';
export const RQPAGE_SUBTITLE =
	'Choose your design and send us ideally 3 or more pictures from multiple angles for better results.';
export const STYLES_OF_CLOTHE = ['dress', 'shirts', 'pants', 'skirts', 'ao dai'];

// Fabric page
export const FABRIC_TYPE_TITLE = 'Choose the fabric type for your design';
export const FABRIC_TYPE_SUBTITLE =
	'Here you can find all of our available fabrics (more will be added by time). Just click on the fabric for more detail and selection to continue.';
export const FABRIC_TYPES = [
	{
		id: 'chiffon',
		name: 'chiffon',
		image: null,
		price: 0,
		info: [
			{
				label: 'FABRIC TYPE',
				value: 'COTTON - Premium quality cotton fabrics',
			},
			{
				label: 'SUITABLE COSTUME',
				value: 'Dress, Shirt',
			},
			{
				label: 'DETAIL',
				value: `Thickness : 01- Weight : 230 gr / m
				Price:  US $ 10 per metter
				Composition : 100% Cotton`,
			},
		],
	},
	{
		id: 'satin',
		name: 'satin',
		image: null,
		price: 1,
		info: [
			{
				label: 'FABRIC TYPE',
				value: 'COTTON - Premium quality cotton fabrics',
			},
			{
				label: 'SUITABLE COSTUME',
				value: 'Dress, Shirt',
			},
			{
				label: 'DETAIL',
				value: `Thickness : 01- Weight : 230 gr / m
				Price:  US $ 10 per metter
				Composition : 100% Cotton`,
			},
		],
	},
	{
		id: 'silk',
		name: 'silk',
		image: null,
		price: 2,
		info: [
			{
				label: 'FABRIC TYPE',
				value: 'COTTON - Premium quality cotton fabrics',
			},
			{
				label: 'SUITABLE COSTUME',
				value: 'Dress, Shirt',
			},
			{
				label: 'DETAIL',
				value: `Thickness : 01- Weight : 230 gr / m
				Price:  US $ 10 per metter
				Composition : 100% Cotton`,
			},
		],
	},
	{
		id: 'linen',
		name: 'Linen',
		image: null,
		price: 3,
		info: [
			{
				label: 'FABRIC TYPE',
				value: 'COTTON - Premium quality cotton fabrics',
			},
			{
				label: 'SUITABLE COSTUME',
				value: 'Dress, Shirt',
			},
			{
				label: 'DETAIL',
				value: `Thickness : 01- Weight : 230 gr / m
				Price:  US $ 10 per metter
				Composition : 100% Cotton`,
			},
		],
	},
	{
		id: 'stretch',
		name: 'stretch',
		image: null,
		price: 4,
		info: [
			{
				label: 'FABRIC TYPE',
				value: 'COTTON - Premium quality cotton fabrics',
			},
			{
				label: 'SUITABLE COSTUME',
				value: 'Dress, Shirt',
			},
			{
				label: 'DETAIL',
				value: `Thickness : 01- Weight : 230 gr / m
				Price:  US $ 10 per metter
				Composition : 100% Cotton`,
			},
		],
	},
	{
		id: 'cashmere',
		name: 'cashmere',
		image: null,
		price: 5,
		info: [
			{
				label: 'FABRIC TYPE',
				value: 'COTTON - Premium quality cotton fabrics',
			},
			{
				label: 'SUITABLE COSTUME',
				value: 'Dress, Shirt',
			},
			{
				label: 'DETAIL',
				value: `Thickness : 01- Weight : 230 gr / m
				Price:  US $ 10 per metter
				Composition : 100% Cotton`,
			},
		],
	},
];
export const FABRIC_TOOLTIP_TITLE = 'Information';
export const FABRIC_PATTERN_TITLE = 'What colour or pattern do you want?';
export const FABRIC_PATTERN_SUBTITLE =
	'Use the filter to choose the available selection and continue with the one that suits you best.';
export const PATTERN_COLLECTIONS = [
	{ name: 'all', id: 'all' },
	{ name: 'floral', id: 'hoala' },
	{ name: 'animal', id: 'dongvat' },
	{ name: 'people', id: 'connguoi' },
	{ name: 'things', id: 'dovat' },
	{ name: 'plain', id: 'tron' },
	{ name: 'stripe', id: 'kesoc' },
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
		buttonText: 'View Guidance Videos',
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
				id: 'height',
				label: 'Height',
			},
			{
				id: 'neck',
				label: 'Neck',
			},
			{
				id: 'shoulder',
				label: 'Shoulder',
			},
			{
				id: 'bust',
				label: 'Bust',
			},
			{
				id: 'waist',
				label: 'Waist',
			},
			{
				id: 'hip',
				label: 'Hip',
			},
			{
				id: 'upperbust',
				label: 'Upper Bust',
			},
			{
				id: 'upperhip',
				label: 'Upper Hip',
			},
			{
				id: 'frontbodice',
				label: 'Front bodice',
			},
			{
				id: 'backbodice',
				label: 'Back bodice',
			},
			{
				id: 'waisttoknee',
				label: 'Waist to knee',
			},
			{
				id: 'waisttoankle',
				label: 'Waist to ankle',
			},
			{
				id: 'longdress',
				label: 'Long Dress',
			},
			{
				id: 'longsleeve',
				label: 'Long Sleeve',
			},
		],
	},
	{
		style: 'shirts',
		msmts: [
			{
				id: 'height',
				label: 'Height',
			},
			{
				id: 'neck',
				label: 'Neck',
			},
			{
				id: 'shoulder',
				label: 'Shoulder',
			},
			{
				id: 'bust',
				label: 'Bust',
			},
			{
				id: 'waist',
				label: 'Waist',
			},
			{
				id: 'hip',
				label: 'Hip',
			},
			{
				id: 'upperbust',
				label: 'Upper Bust',
			},
			{
				id: 'upperhip',
				label: 'Upper Hip',
			},
			{
				id: 'frontbodice',
				label: 'Front bodice',
			},
			{
				id: 'backbodice',
				label: 'Back bodice',
			},
			{
				id: 'waisttoknee',
				label: 'Waist to knee',
			},
			{
				id: 'waisttoankle',
				label: 'Waist to ankle',
			},
			{
				id: 'longdress',
				label: 'Long Dress',
			},
			{
				id: 'longsleeve',
				label: 'Long Sleeve',
			},
		],
	},
	{
		style: 'pants',
		msmts: [
			{
				id: 'height',
				label: 'Height',
			},
			{
				id: 'neck',
				label: 'Neck',
			},
			{
				id: 'shoulder',
				label: 'Shoulder',
			},
			{
				id: 'bust',
				label: 'Bust',
			},
			{
				id: 'waist',
				label: 'Waist',
			},
			{
				id: 'hip',
				label: 'Hip',
			},
			{
				id: 'upperbust',
				label: 'Upper Bust',
			},
			{
				id: 'upperhip',
				label: 'Upper Hip',
			},
			{
				id: 'frontbodice',
				label: 'Front bodice',
			},
			{
				id: 'backbodice',
				label: 'Back bodice',
			},
			{
				id: 'waisttoknee',
				label: 'Waist to knee',
			},
			{
				id: 'waisttoankle',
				label: 'Waist to ankle',
			},
			{
				id: 'longdress',
				label: 'Long Dress',
			},
			{
				id: 'longsleeve',
				label: 'Long Sleeve',
			},
		],
	},
	{
		style: 'skirts',
		msmts: [
			{
				id: 'height',
				label: 'Height',
			},
			{
				id: 'neck',
				label: 'Neck',
			},
			{
				id: 'shoulder',
				label: 'Shoulder',
			},
			{
				id: 'bust',
				label: 'Bust',
			},
			{
				id: 'waist',
				label: 'Waist',
			},
			{
				id: 'hip',
				label: 'Hip',
			},
			{
				id: 'upperbust',
				label: 'Upper Bust',
			},
			{
				id: 'upperhip',
				label: 'Upper Hip',
			},
			{
				id: 'frontbodice',
				label: 'Front bodice',
			},
			{
				id: 'backbodice',
				label: 'Back bodice',
			},
			{
				id: 'waisttoknee',
				label: 'Waist to knee',
			},
			{
				id: 'waisttoankle',
				label: 'Waist to ankle',
			},
			{
				id: 'longdress',
				label: 'Long Dress',
			},
			{
				id: 'longsleeve',
				label: 'Long Sleeve',
			},
		],
	},
	{
		style: 'ao dai',
		msmts: [
			{
				id: 'height',
				label: 'Height',
			},
			{
				id: 'neck',
				label: 'Neck',
			},
			{
				id: 'shoulder',
				label: 'Shoulder',
			},
			{
				id: 'bust',
				label: 'Bust',
			},
			{
				id: 'waist',
				label: 'Waist',
			},
			{
				id: 'hip',
				label: 'Hip',
			},
			{
				id: 'upperbust',
				label: 'Upper Bust',
			},
			{
				id: 'upperhip',
				label: 'Upper Hip',
			},
			{
				id: 'frontbodice',
				label: 'Front bodice',
			},
			{
				id: 'backbodice',
				label: 'Back bodice',
			},
			{
				id: 'waisttoknee',
				label: 'Waist to knee',
			},
			{
				id: 'waisttoankle',
				label: 'Waist to ankle',
			},
			{
				id: 'longdress',
				label: 'Long Dress',
			},
			{
				id: 'longsleeve',
				label: 'Long Sleeve',
			},
		],
	},
	{
		style: 'dress',
		msmts: [
			{
				id: 'height',
				label: 'Height',
			},
			{
				id: 'neck',
				label: 'Neck',
			},
			{
				id: 'shoulder',
				label: 'Shoulder',
			},
			{
				id: 'bust',
				label: 'Bust',
			},
			{
				id: 'waist',
				label: 'Waist',
			},
			{
				id: 'hip',
				label: 'Hip',
			},
			{
				id: 'upperbust',
				label: 'Upper Bust',
			},
			{
				id: 'upperhip',
				label: 'Upper Hip',
			},
			{
				id: 'frontbodice',
				label: 'Front bodice',
			},
			{
				id: 'backbodice',
				label: 'Back bodice',
			},
			{
				id: 'waisttoknee',
				label: 'Waist to knee',
			},
			{
				id: 'waisttoankle',
				label: 'Waist to ankle',
			},
			{
				id: 'longdress',
				label: 'Long Dress',
			},
			{
				id: 'longsleeve',
				label: 'Long Sleeve',
			},
		],
	},
];
export const STANDARD_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

// Summary page
export const RQMT_SUM_TITLE = 'Summary';
export const RQMT_SUM_SUBTITLE =
	'Almost done !!! Your idea is awesome and I can not wait to tailor it right away for you';
export const NOTE_SUM_TITLE = 'Requirement Notes';
export const NOTE_SUM_SUBTITLE =
	'This is importance step. The product will be tailored to fit perfect and exactly what you want IF you describe to us as detailed as possible about your needs. Including the parts of your body that you consider your weaknesses our Tailors will help you deduct them.';

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

export const TEST_ORDER_INFO = [
	{
		id: 1000,
		orderDate: '14/2/2020',
		offer: [
			{
				tailor: { name: 'Hiền Cát Lái' },
				time: 4,
				price: 763000,
				picked: false,
			},
			{
				tailor: { name: 'Cô Ly' },
				time: 4,
				price: 830000,
				picked: true,
			},
			{
				tailor: { name: 'Cô Loan' },
				time: 7,
				price: 2300000,
				picked: false,
			},
		],
		receiveDate: null,
		pickedOfferIndex: null,
		finishDate: null,
		status: 'finding',
	},
	{
		id: 1001,
		orderDate: '2/2/2020',
		offer: [
			{
				tailor: { name: 'Hiền Cát Lái' },
				time: 4,
				price: 763000,
				picked: false,
			},
			{
				tailor: { name: 'Cô Ly' },
				time: 4,
				price: 830000,
				picked: true,
			},
			{
				tailor: { name: 'Cô Loan' },
				time: 7,
				price: 2300000,
				picked: false,
			},
		],
		receiveDate: null,
		pickedOfferIndex: null,
		finishDate: null,
		status: 'finding',
	},
	{
		id: 1002,
		orderDate: '2/4/2020',
		offer: [
			{
				tailor: { name: 'Hiền Cát Lái' },
				time: 4,
				price: 763000,
				picked: false,
			},
			{
				tailor: { name: 'Cô Ly' },
				time: 4,
				price: 830000,
				picked: true,
			},
			{
				tailor: { name: 'Cô Loan' },
				time: 7,
				price: 2300000,
				picked: false,
			},
		],
		receiveDate: '7/4/2020',
		pickedOfferIndex: 0,
		finishDate: null,
		status: 'tailoring',
	},
	{
		id: 1003,
		orderDate: '2/4/2020',
		offer: [
			{
				tailor: { name: 'Hiền Cát Lái' },
				time: 4,
				price: 763000,
				picked: false,
			},
			{
				tailor: { name: 'Cô Ly' },
				time: 4,
				price: 830000,
				picked: true,
			},
			{
				tailor: { name: 'Cô Loan' },
				time: 7,
				price: 2300000,
				picked: false,
			},
		],
		receiveDate: '7/4/2020',
		pickedOfferIndex: 1,
		finishDate: null,
		status: 'tailoring',
	},
	{
		id: 1004,
		orderDate: '2/3/2020',
		offer: [
			{
				tailor: { name: 'Hiền Cát Lái' },
				time: 4,
				price: 763000,
				picked: false,
			},
			{
				tailor: { name: 'Cô Ly' },
				time: 4,
				price: 830000,
				picked: true,
			},
			{
				tailor: { name: 'Cô Loan' },
				time: 7,
				price: 2300000,
				picked: false,
			},
		],
		receiveDate: '7/3/2020',
		pickedOfferIndex: 2,
		finishDate: '10/3/2020',
		status: 'finish',
	},
	{
		id: 1005,
		orderDate: '1/2/2020',
		offer: [
			{
				tailor: { name: 'Hiền Cát Lái' },
				time: 4,
				price: 763000,
				picked: false,
			},
			{
				tailor: { name: 'Cô Ly' },
				time: 4,
				price: 830000,
				picked: true,
			},
			{
				tailor: { name: 'Cô Loan' },
				time: 7,
				price: 2300000,
				picked: false,
			},
		],
		receiveDate: '3/2/2020',
		pickedOfferIndex: 1,
		finishDate: '7/2/2020',
		status: 'finish',
	},
	{
		id: 1006,
		orderDate: '1/2/2020',
		offer: [
			{
				tailor: { name: 'Hiền Cát Lái' },
				time: 4,
				price: 763000,
				picked: false,
			},
			{
				tailor: { name: 'Cô Ly' },
				time: 4,
				price: 830000,
				picked: true,
			},
			{
				tailor: { name: 'Cô Loan' },
				time: 7,
				price: 2300000,
				picked: false,
			},
		],
		receiveDate: '3/2/2020',
		pickedOfferIndex: 1,
		finishDate: '7/2/2020',
		status: 'finish',
	},
];
