// import React from 'react';

// function HomePage() {
// 	function setUpRecaptcha() {
// 		window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
// 		// window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
// 		// 	size: 'invisible',
// 		// 	callback: (response) => {
// 		// 		// reCAPTCHA solved, allow signInWithPhoneNumber.
// 		// 		console.log('captcha resolved :>> ');
// 		// 		onSignInSubmit();
// 		// 	},
// 		// });
// 	}

// 	function onSignInSubmit(e) {
// 		e.preventDefault();
// 		setUpRecaptcha();
// 		const phoneNumber = '+840866687710';
// 		const appVerifier = window.recaptchaVerifier;
// 		console.log('phoneNumber :>> ', phoneNumber);
// 		console.log('appVerifier :>> ', appVerifier);
// 		firebase
// 			.auth()
// 			.signInWithPhoneNumber(phoneNumber, appVerifier)
// 			.then((confirmationResult) => {
// 				// SMS sent. Prompt user to type the code from the message, then sign the
// 				// user in with confirmationResult.confirm(code).
// 				window.confirmationResult = confirmationResult;
// 				console.log('window.confirmationResult :>> ', window.confirmationResult);
// 				var code = window.prompt('Enter OTP');
// 				confirmationResult
// 					.confirm(code)
// 					.then((result) => {
// 						// User signed in successfully.
// 						const user = result.user;
// 						console.log('user :>> ', user);
// 						// ...
// 						console.log('User is signed in');
// 					})
// 					.catch((error) => {
// 						// User couldn't sign in (bad verification code?)
// 						// ...
// 					});
// 			})
// 			.catch((error) => {
// 				// Error; SMS not sent
// 				// ...
// 				console.log('error :>> ', error);
// 			});
// 	}

// 	return (
// 		<div>
// 			<h2>Phone login</h2>
// 			<form onSubmit={onSignInSubmit}>
// 				<div>
// 					<label>Email address</label>
// 					<input type="text" />
// 				</div>
// 				<button>Submit</button>
// 				<div className="recaptcha" id="recaptcha-container"></div>
// 			</form>
// 		</div>
// 	);
// }

// export default HomePage;
