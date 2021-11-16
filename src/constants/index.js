import passiveBagIcon from '../assets/icons/black-bag.svg';
import activeBagIcon from '../assets/icons/orange-bag.svg';

import chiffon from '../assets/images/fabric-chiffon.jpg';
import cotton from '../assets/images/fabric-cotton.jpg';
import linen from '../assets/images/fabric-linen.jpg';
import rayon from '../assets/images/fabric-rayon.jpg';
import satin from '../assets/images/fabric-satin.jpg';
import silk from '../assets/images/fabric-silk.jpg';
import wool from '../assets/images/fabric-silk.jpg';
import stretch from '../assets/images/fabric-silk.jpg';

import about_team from '../assets/images/about_team.jpg';
import about_polution from '../assets/images/about_polution.jpg';
import about_vision from '../assets/images/about_vision.jpg';

import topDressLength from '../assets/images/en/top-dress-length.jpg';
import neck from '../assets/images/en/neck.jpg';
import shoulder from '../assets/images/en/shoulder.jpg';
import bust from '../assets/images/en/bust.jpg';
import waist from '../assets/images/en/waist.jpg';
import hip from '../assets/images/en/hip.jpg';
import fullArmHole from '../assets/images/en/full-arm-hole.jpg';
import shoulderToWaistFront from '../assets/images/en/shoulder-to-waist-front.jpg';
import shoulderToWaistBack from '../assets/images/en/shoulder-to-waist-back.jpg';
import abdomen from '../assets/images/en/abdomen.jpg';
import bicep from '../assets/images/en/bicep.jpg';
import crothDepth from '../assets/images/en/croth-depth.jpg';
import crothLength from '../assets/images/en/croth-length.jpg';
import sleeve from '../assets/images/en/sleeve.jpg';
import highHip from '../assets/images/en/high-hip.jpg';
import pantLength from '../assets/images/en/pant-length.jpg';
import thigh from '../assets/images/en/thigh.jpg';

import topDressLengthVN from '../assets/images/vn/top-dress-length.jpg';
import neckVN from '../assets/images/vn/neck.jpg';
import shoulderVN from '../assets/images/vn/shoulder.jpg';
import bustVN from '../assets/images/vn/bust.jpg';
import waistVN from '../assets/images/vn/waist.jpg';
import hipVN from '../assets/images/vn/hip.jpg';
import fullArmHoleVN from '../assets/images/vn/full-arm-hole.jpg';
import shoulderToWaistFrontVN from '../assets/images/vn/shoulder-to-waist-front.jpg';
import shoulderToWaistBackVN from '../assets/images/vn/shoulder-to-waist-back.jpg';
import abdomenVN from '../assets/images/vn/abdomen.jpg';
import bicepVN from '../assets/images/vn/bicep.jpg';
import crothDepthVN from '../assets/images/vn/croth-depth.jpg';
import crothLengthVN from '../assets/images/vn/croth-length.jpg';
import sleeveVN from '../assets/images/vn/sleeve.jpg';
import highHipVN from '../assets/images/vn/high-hip.jpg';
import pantLengthVN from '../assets/images/vn/pant-length.jpg';
import thighVN from '../assets/images/vn/thigh.jpg';

// Homepage
export const HOW_IT_WORK_TITLE = 'Personalizing all your fashion has never been easier';
export const HOW_IT_WORK_SUBTITLE =
	'Our mission is to make you look and feel your best. We’ve brought old fashioned tailoring into the 21st century, making it easy and affordable for you. Experience your own well fitting custom-made clothing online from the comfort of your own home or anywhere you want.';

// Requirement page
export const RQPAGE_TITLE = 'What do you want to be tailored?';
export const RQPAGE_SUBTITLE =
	'Please send us at least 03 pictures of the design you want to make. More detail picture more better results of clothes be made.';
export const STYLES_OF_CLOTHE = ['dress', 'shirts', 'pants', 'skirts', 'ao dai', 'others'];
export const STYLE_ESTIMATE_PRICE = [
	{
		id: 'dress',
		estPrice: 300000,
		fabricLength: 2,
	},
	{
		id: 'shirts',
		estPrice: 200000,
		fabricLength: 1.5,
	},
	{
		id: 'pants',
		estPrice: 250000,
		fabricLength: 1.5,
	},
	{
		id: 'skirts',
		estPrice: 200000,
		fabricLength: 1.5,
	},
	{
		id: 'ao dai',
		estPrice: 700000,
		fabricLength: 3.5,
	},
	{
		id: 'others',
		estPrice: 700000,
		fabricLength: 3.5,
	},
];

// Fabric page
export const FABRIC_TYPE_TITLE = 'Tailor Wings available fabrics';
export const FABRIC_TYPE_SUBTITLE =
	'Here you can find all of our available fabrics (more will be added by time).';
export const FABRIC_BUY_TYPES = [
	{
		id: 'TAILOR_WINGS',
		title: "TailorWings's Fabric",
		description: 'Choose from our available fabric',
		titleVN: "Vải của Tailor Wings",
		descriptionVN: 'Chọn từ hàng trăm mẫu vải có sẵn',
	},
	{
		id: 'MY_OWN',
		title: 'My own fabric',
		description: 'We will get in contact to pick up your fabric after you place the order',
		titleVN: "Vải của tôi",
		descriptionVN: 'Tailor Wings sẽ liên hệ để lấy vải từ bạn sau bước đặt hàng',
	},
	{
		id: 'TAILOR_WINGS_PARTNER',
		title: "Other supplier's fabric",
		description: 'We will get in contact to help you buy fabric after you place the order.',
		titleVN: "Vải của nhà cung cấp khác",
		descriptionVN: 'Chúng tôi sẽ liên hệ để giúp bạn mua vải sau bước đặt hàng',
	},
];
export const FABRIC_TYPES = [
	{
		id: 'COT',
		name: 'Cotton',
		image: cotton,
		price: 100000,
		info: [
			{
				label: 'Fabric Types',
				value: 'Cotton',
			},
			{
				label: 'Suitable Costume',
				value: 'T-shirts, dresses, skirts and pants and childrenswear',
			},
			{
				label: 'Details',
				value: `100% Cotton made organic fibers from the seeds of the cotton plant`,
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
				label: 'Fabric Types',
				value: 'Linen',
			},
			{
				label: 'Suitable Costume',
				value: 'T-shirts, dresses, skirts and pants and childrenswear',
			},
			{
				label: 'Details',
				value: `100% Linen made from fibers derived from the stems of the flax plan`,
			},
		],
	},
	{
		id: 'SIL',
		name: 'Silk',
		image: silk,
		price: 240000,
		info: [
			{
				label: 'Fabric Types',
				value: 'Silk',
			},
			{
				label: 'Suitable Costume',
				value: 'T-shirts, dresses, skirts and pants',
			},
			{
				label: 'Details',
				value: `100% Nature Silk made from fibers created by the silkworm insect.`,
			},
		],
	},
	{
		id: 'RAY',
		name: 'Rayon',
		image: rayon,
		price: 100000,
		info: [
			{
				label: 'Fabric Types',
				value: 'Rayon',
			},
			{
				label: 'Suitable Costume',
				value: 'T-shirts, dresses, skirts and pants and childrenswear',
			},
			{
				label: 'Details',
				value: `100% Rayon made from purified cellulose fibers, which are typically created from wood pulp`,
			},
		],
	},
	{
		id: 'CIF',
		name: 'Chiffon',
		image: chiffon,
		price: 80000,
		info: [
			{
				label: 'Fabric Types',
				value: 'Chiffon',
			},
			{
				label: 'Suitable Costume',
				value: 'T-shirts, dresses, skirts and pants',
			},
			{
				label: 'Details',
				value: `100% Polyester`,
			},
		],
	},
	{
		id: 'SAT',
		name: 'Satin',
		image: satin,
		price: 90000,
		info: [
			{
				label: 'Fabric Types',
				value: 'Satin',
			},
			{
				label: 'Suitable Costume',
				value: 'T-shirts, dresses, skirts and pants',
			},
			{
				label: 'Details',
				value: `100% Polyester`,
			},
		],
	},
	{
		id: 'WOO',
		name: 'Wool',
		image: wool,
		price: 90000,
		info: [
			{
				label: 'Fabric Types',
				value: 'Wool',
			},
			{
				label: 'Suitable Costume',
				value: 'T-shirts, dresses, skirts and pants',
			},
			{
				label: 'Details',
				value: `100% Polyester`,
			},
		],
	},
	{
		id: 'STR',
		name: 'Stretch',
		image: stretch,
		price: 90000,
		info: [
			{
				label: 'Fabric Types',
				value: 'Stretch',
			},
			{
				label: 'Suitable Costume',
				value: 'T-shirts, dresses, skirts and pants',
			},
			{
				label: 'Details',
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
		name: 'Measure Online',
		desc: 'Just follow the instructions and you will get a perfect fit.',
		buttonText: 'View Guidance Images',
		nameVN: 'Đo online',
		descVN: 'Đơn giản mà có được sự vừa vặn, vui lòng thực hiện theo hướng dẫn.',
		buttonTextVN: 'Xem hướng dẫn',
		link: '/online',
	},
	{
		name: 'Standard Size',
		desc: 'Choose your right size below.',
		buttonText: 'Pick Sizes',
		nameVN: 'Size chuẩn',
		descVN: 'Hãy tìm đúng size của bạn.',
		buttonTextVN: 'Chọn size',
		link: '/standard-size',
	},
];

export const MEASUREMENTS_STYLES = {
	'abdomen': {
		id: 'abdomen',
		label: 'abdomen',
		guide: abdomen,
		labelVN: 'Lưng quần/ Chân váy',
		guideVN: abdomenVN,
	},
	'bicep': {
		id: 'bicep',
		label: 'Bicep',
		guide: bicep,
		labelVN: 'Bắp tay',
		guideVN: bicepVN,
	},
	'bust': {
		id: 'bust',
		label: 'bust',
		guide: bust,
		labelVN: 'Ngực',
		guideVN: bustVN,
	},
	'crothdepth': {
		id: 'crothdepth',
		label: 'croth depth',
		guide: crothDepth,
		labelVN: 'Hạ đáy',
		guideVN: crothDepthVN,
	},
	'crothlength': {
		id: 'crothlength',
		label: 'croth Length',
		guide: crothLength,
		labelVN: 'Dài đầm',
		guideVN: crothLengthVN,
	},
	'fullarmhole': {
		id: 'fullarmhole',
		label: 'full armhole',
		guide: fullArmHole,
		labelVN: 'Vòng sát nách',
		guideVN: fullArmHoleVN,
	},
	'highhip': {
		id: 'highhip',
		label: 'high hip',
		guide: highHip,
		labelVN: 'Vòng hông',
		guideVN: highHipVN,
	},
	'hip': {
		id: 'hip',
		label: 'Hip',
		guide: hip,
		labelVN: 'Mông',
		guideVN: hipVN,
	},
	'neck': {
		id: 'neck',
		label: 'Neck',
		guide: neck,
		labelVN: 'Vòng cổ',
		guideVN: neckVN,
	},
	'pantlength': {
		id: 'pantlength',
		label: 'pant length',
		guide: pantLength,
		labelVN: 'Dài quần',
		guideVN: pantLengthVN,
	},
	'shouldertowaistfront': {
		id: 'shouldertowaistfront',
		label: 'shoulder to waist front',
		guide: shoulderToWaistFront,
		labelVN: 'Hạ eo trước',
		guideVN: shoulderToWaistFrontVN,
	},
	'shouldertowaistback': {
		id: 'shouldertowaistback',
		label: 'shoulder to waist back',
		guide: shoulderToWaistBack,
		labelVN: 'Hạ eo sau',
		guideVN: shoulderToWaistBackVN,
	},
	'shoulder': {
		id: 'shoulder',
		label: 'Shoulder',
		guide: shoulder,
		labelVN: 'Vai',
		guideVN: shoulderVN,
	},
	'sleeve': {
		id: 'sleeve',
		label: 'sleeve',
		guide: sleeve,
		labelVN: 'Dài tay',
		guideVN: sleeveVN,
	},
	'thigh': {
		id: 'thigh',
		label: 'thigh',
		guide: thigh,
		labelVN: 'Bắp đùi',
		guideVN: thighVN,
	},
	'dresslength': {
		id: 'dresslength',
		label: 'top dress length',
		guide: topDressLength,
		labelVN: 'Dài áo đầm',
		guideVN: topDressLengthVN,
	},
	'waist': {
		id: 'waist',
		label: 'Waist',
		guide: waist,
		labelVN: 'Eo',
		guideVN: waistVN,
	},
};

export const ONLINE_MEASUREMENTS = [
	{
		style: 'dress',
		msmts: [
			MEASUREMENTS_STYLES['shoulder'],
			MEASUREMENTS_STYLES['sleeve'],
			MEASUREMENTS_STYLES['fullarmhole'],
			MEASUREMENTS_STYLES['bicep'],
			MEASUREMENTS_STYLES['bust'],
			MEASUREMENTS_STYLES['waist'],
			MEASUREMENTS_STYLES['shouldertowaistfront'],
			MEASUREMENTS_STYLES['shouldertowaistback'],
			MEASUREMENTS_STYLES['hip'],
			MEASUREMENTS_STYLES['crothdepth'],
			MEASUREMENTS_STYLES['dresslength'],
			MEASUREMENTS_STYLES['thigh'],
			MEASUREMENTS_STYLES['highhip'],
		],
	},
	{
		style: 'shirts',
		msmts: [
			MEASUREMENTS_STYLES['shoulder'],
			MEASUREMENTS_STYLES['sleeve'],
			MEASUREMENTS_STYLES['fullarmhole'],
			MEASUREMENTS_STYLES['bicep'],
			MEASUREMENTS_STYLES['bust'],
			MEASUREMENTS_STYLES['waist'],
			MEASUREMENTS_STYLES['shouldertowaistfront'],
			MEASUREMENTS_STYLES['shouldertowaistback'],
			MEASUREMENTS_STYLES['hip'],
			MEASUREMENTS_STYLES['dresslength'],
			MEASUREMENTS_STYLES['highhip'],
		],
	},
	{
		style: 'pants',
		msmts: [
			MEASUREMENTS_STYLES['abdomen'],
			MEASUREMENTS_STYLES['hip'],
			MEASUREMENTS_STYLES['crothdepth'],
			MEASUREMENTS_STYLES['pantlength'],
			MEASUREMENTS_STYLES['thigh'],
			MEASUREMENTS_STYLES['highhip'],
		],
	},
	{
		style: 'skirts',
		msmts: [
			MEASUREMENTS_STYLES['abdomen'],
			MEASUREMENTS_STYLES['hip'],
			MEASUREMENTS_STYLES['crothdepth'],
			MEASUREMENTS_STYLES['pantlength'],
			MEASUREMENTS_STYLES['thigh'],
			MEASUREMENTS_STYLES['highhip'],
		],
	},
	{
		style: 'ao dai',
		msmts: [
			MEASUREMENTS_STYLES['shoulder'],
			MEASUREMENTS_STYLES['sleeve'],
			MEASUREMENTS_STYLES['fullarmhole'],
			MEASUREMENTS_STYLES['bicep'],
			MEASUREMENTS_STYLES['bust'],
			MEASUREMENTS_STYLES['waist'],
			MEASUREMENTS_STYLES['shouldertowaistfront'],
			MEASUREMENTS_STYLES['shouldertowaistback'],
			MEASUREMENTS_STYLES['hip'],
			MEASUREMENTS_STYLES['dresslength'],
		],
	},
	{
		style: 'others',
		msmts: [
			MEASUREMENTS_STYLES['shoulder'],
			MEASUREMENTS_STYLES['sleeve'],
			MEASUREMENTS_STYLES['fullarmhole'],
			MEASUREMENTS_STYLES['bicep'],
			MEASUREMENTS_STYLES['bust'],
			MEASUREMENTS_STYLES['waist'],
			MEASUREMENTS_STYLES['shouldertowaistfront'],
			MEASUREMENTS_STYLES['shouldertowaistback'],
			MEASUREMENTS_STYLES['hip'],
			MEASUREMENTS_STYLES['dresslength'],
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
		textVN: 'Quản lý đơn hàng',
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
		labelVN: 'Tên',
		value: '',
		isRequired: true
	},
	{
		id: 'phone',
		label: 'Phone number',
		labelVN: 'Số điện thoại',
		value: '',
		isRequired: true
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
		labelVN: 'Địa chỉ',
		value: '',
		isRequired: true
	},
	{
		id: 'notes',
		label: 'notes',
		labelVN: 'Ghi chú',
		value: '',
	},
];

// About us Page

export const ABOUT_CONTENT = [
	{
		title: 'Who We Are',
		titleVN: 'Chúng tôi là ai?',
		content: `Tailor Wings - The place for connecting the skilled tailors with the modern consumers. We would love to celebrate diversity of each individual by made-to-order all your fashion product. 
		Our (almost) zero-waste sustainable manufacturing model offers unparalleled choice without harming the Earth. At the same time it brings worthy remuneration for the tailor who actually created it.`,
		contentVN: `Tailor Wings - Nơi kết nối những Thợ may tay nghề cao với khách hàng thông thái. Chúng tôi muốn tôn vinh sự đa dạng của mỗi cá nhân bằng việc chỉ may theo số đo và yêu cầu của từng khách hàng. Với bất kỳ sản phẩm có thể may nào, Tailor Wings sẽ đem tới sự hài lòng cho bạn.
		Mô hình sản xuất bền vững (hầu như) không chất thải của chúng tôi mang đến sự lựa chọn tuyệt vời mà không gây hại cho môi trường. Đồng thời mang lại những đãi ngộ xứng đáng cho những người thợ may tận tụy đã thực sự tạo ra sản phẩm giúp bạn đẹp mỗi ngày. `,
		image: about_team,
	},
	{
		title: `The Problem`,
		titleVN: 'Vấn đề',
		content: `Overproduction in the fashion industry is the cause behind many global problems, from wasted CO2 to excess items being landfilled or burned.
		The violations of workers’ rights in garment and textile factories because of excessive overtime work, sometimes forced or not paid at the correct rate, productivity pressure and a lack of fire safety regulations.`,
		contentVN: `Sản xuất hàng loạt và dư thừa trong ngành công nghiệp thời trang là nguyên nhân của nhiều vấn đề toàn cầu, từ lượng CO2 thải ra vượt mức đến các mặt hàng dư thừa bị chôn lấp hoặc đốt ngoài môi trường.
		Tình trạng vi phạm quyền của người lao động trong các nhà máy dệt may do làm thêm giờ quá nhiều, đôi khi bị ép buộc hoặc trả lương không đúng mức, áp lực năng suất và thiếu các quy định về an toàn lao động.`,
		image: about_polution,
	},
	{
		title: `Our Vision`,
		titleVN: `Tầm nhìn`,
		content: `The growing of “to be different” demand of consumer cannot be met in the way that traditional fashion distribution has done - which has caused serious environmental damage to date. 
		We pursue sustainable fashion by being a leader of custom and also re-distribute value to stakeholders by the sharing economy model. 
		Thereby our women they are not only beautiful because the clothes are made for herself, but she is more beautiful because of her responsible actions for the environment and society in where her live.`,
		contentVN: `Nhu cầu “trở nên khác biệt” ngày càng tăng của người tiêu dùng không thể được đáp ứng theo cách mà chuỗi cung ứng thời trang truyền thống đã  và đang làm - điều đã gây ra thiệt hại nghiêm trọng tới môi trường cho đến nay.
		Do đó, Tailor Wings theo đuổi mô hình thời trang bền vững bằng cách trở thành người đi đầu trong lĩnh vực tùy biến và cá nhân hóa sản phẩm thời trang. Đồng thời phân phối lại giá trị cho các bên liên quan dựa trên mô hình kinh tế chia sẻ.
		Nhờ vậy, phụ nữ chúng ta không chỉ đẹp vì những bộ quần áo được may cho chính mình, mà cô ấy đẹp hơn vì những hành động có trách nhiệm với môi trường và xã hội nơi chúng ta sống.`,
		image: about_vision,
	},
];

// Faq

export const FAQ_TITLE = {
	title: 'Frequently asked questions',
	titleVN: 'CÂU HỎI THƯỜNG GẶP',
	subtitle: ``
};

export const FAQ_CONTENT = [
	{
		question: `HOW LONG DOES ORDER TAKE?`,
		answer: `Depending on the complexity of any customizations and/or special fabrics associated with the order.
			-Not In A Rush: 8 - 12 days
			-Standard: 5 - 7  days
			-Express: 3 - 4 days
			-VIP: 2 - 3 days
		Orders are delivered Monday to Saturday.
		
		Please note: orders are not shipped and/or delivered on weekends or holidays.`,
	},
	{
		question: `Can I cancel my Essentials or Premium plan subscription at any time?`,
		answer: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Blanditiis nesciunt animi quam repellat et quaerat dolorum ipsa? Voluptates perferendis repudiandae consequatur debitis veritatis, assumenda perspiciatis quisquam itaque voluptatibus aliquid nam.`,
	},
	{
		question: `Can I cancel my Essentials or Premium plan subscription at any time?`,
		answer: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Blanditiis nesciunt animi quam repellat et quaerat dolorum ipsa? Voluptates perferendis repudiandae consequatur debitis veritatis, assumenda perspiciatis quisquam itaque voluptatibus aliquid nam.`,
	},
	{
		question: `Can I cancel my Essentials or Premium plan subscription at any time?`,
		answer: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Blanditiis nesciunt animi quam repellat et quaerat dolorum ipsa? Voluptates perferendis repudiandae consequatur debitis veritatis, assumenda perspiciatis quisquam itaque voluptatibus aliquid nam.`,
	},
];
