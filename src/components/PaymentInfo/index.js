import React from 'react';
import PropTypes from 'prop-types';
import masterCardIcon from '../../assets/images/mastercard.png';
import paypalIcon from '../../assets/images/paypal.png';
import CodIcon from '../../assets/images/yandex.png';
import SmallButton2 from '../Button/SmallButton2';
import tickSquareIcon from '../../assets/icons/tick-square.svg';

const TEST_PAYMENT_INFO = [
	{
		method: 'masterCard',
		icon: masterCardIcon,
		value: '****3192',
		active: false,
	},
	{
		method: 'paypal',
		icon: paypalIcon,
		value: '****3192',
		active: true,
	},
	{
		method: 'CodIcon',
		icon: CodIcon,
		value: 'Casd On Delivery',
		active: false,
	},
];

PaymentInfo.propTypes = {
	buttonText: PropTypes.string,
};

PaymentInfo.defaultProps = {
	buttonText: '',
};

function PaymentInfo(props) {
	const { buttonText } = props;

	return (
		<div className="c-payment-info">
			{TEST_PAYMENT_INFO.map((info, index) => {
				return (
					<div key={index} className="c-payment-info__method">
						<img className="c-payment-info__icon" src={info.icon} alt={info.method.toLowerCase()} />
						<span className="c-payment-info__value">{info.value}</span>
						{info.active ? (
							<img src={tickSquareIcon} alt="tick-quare-icon" className="c-payment-info__tick" />
						) : (
							<SmallButton2 text={buttonText} />
						)}
					</div>
				);
			})}
		</div>
	);
}

export default PaymentInfo;
