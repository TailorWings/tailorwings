import React from 'react';
import MediumButton from '../../components/Button/MediumButton';
import emailjs from 'emailjs-com';

function TestEmail() {
	/*------------------------------*/
	function sendMail() {
		emailjs
			.send(
				'service_gmail',
				'template_new_requirement',
				{ cusName: 'Thien', email: 'hoangkimnguyen1998@gmail.com' },
				'user_Y5bXAigZ1M1XXTVlViAmO'
			)
			.then(
				(result) => {
					console.log(result.text);
				},
				(error) => {
					console.log(error.text);
				}
			);
	}
	/*------------------------------*/
	return (
		<div style={{ padding: '50px' }} onClick={sendMail}>
			<MediumButton text="Send mail" />
		</div>
	);
}

export default TestEmail;


