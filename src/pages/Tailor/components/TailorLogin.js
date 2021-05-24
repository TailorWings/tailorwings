import { useState } from 'react';
import { useDispatch } from 'react-redux';
import MediumButton from '../../../components/Button/MediumButton';
import TextInput from '../../../components/Input/TextInput';
import { fetchCondition } from '../../../services/API/firebaseAPI';
import { setTailor } from '../../../app/ReduxSlices/tailorSlice';

function TailorLogin() {
	/*------------------------------*/
	const [form, setForm] = useState({
		username: '',
		password: '',
	});
	const [formError, setFormError] = useState({});
	const [isLoginError, setIsLoginError] = useState(false);
	const dispatch = useDispatch();
	/*------------------------------*/
	function onFormChange(e) {
		let value = e.target.value;
		let id = e.target.id;

		setForm({
			...form,
			[id]: value,
		});
	}
	/*------------------------------*/
	function formCheck() {
		let errorObj = {};
		for (const key in form) {
			const elem = form[key];
			if (!elem) {
				errorObj[key] = 'Vui lòng không để trống!';
			}
		}
		setFormError(errorObj);
		return errorObj;
	}
	async function onLogin() {
		let errors = formCheck();

		if (Object.keys(errors).length === 0) {
			let res = await fetchCondition('tailors', 'username', '==', form.username);
			console.log('res :>> ', res);

			if (res?.length === 1) {
				if (res[0].password === form.password) {
					dispatch(setTailor(res[0]));
					setIsLoginError(false);
				} else {
					setIsLoginError(true);
				}
			} else {
                setIsLoginError(true);
            }
		}
	}
	/*------------------------------*/
	return (
		<div className="tailor-login">
			<h2>Đăng nhập</h2>
			{isLoginError && <span className="tailor-login__error">Sai tài khoản hoặc mật khẩu</span>}
			<TextInput
				label="Tài khoản"
				value={form.username}
				id="username"
				onChange={onFormChange}
				errors={formError.username}
			/>
			<TextInput
				label="Mật khẩu"
				value={form.password}
				id="password"
				onChange={onFormChange}
				type="password"
				errors={formError.password}
			/>
			<div className="tailor-login__btn" onClick={onLogin}>
				<MediumButton isActive text="Đăng nhập" />
			</div>
			<span className="tailor-login__contact">Liên hệ: 08668xxxx</span>
		</div>
	);
}

export default TailorLogin;
