import { ABOUT_CONTENT } from '../../constants';
import { useTranslation } from 'react-i18next';

function AboutUsPage() {
	const { t, i18n } = useTranslation();
	const isENG = i18n.language == 'en';
	return (
		<div className="l-about-us">
			{ABOUT_CONTENT &&
				ABOUT_CONTENT.map((content, index) => {
					return (
						<div key={index} className={`about-us-content ${index % 2 === 0 ? '' : '--reverse'}`}>
							<div className="-wrapper">
								<div className="about-us-content__text">
									<div className="-text-box">
										<h2>{isENG ? content.title : content.titleVN}</h2>
										<pre>{isENG ? content.content : content.contentVN}</pre>
									</div>
								</div>
								<div className="about-us-content__image">
									{content?.image && <img src={content?.image} alt="content" />}
								</div>
							</div>
						</div>
					);
				})}
		</div>
	);
}

export default AboutUsPage;
