import { ABOUT_CONTENT } from '../../constants';

function AboutUsPage() {
	return (
		<div className="l-about-us">
			{ABOUT_CONTENT &&
				ABOUT_CONTENT.map((content, index) => {
					return (
						<div key={index} className={`about-us-content ${index % 2 === 0 ? '' : '--reverse'}`}>
							<div className="-wrapper">
								<div className="about-us-content__text">
									<div className="-text-box">
										<h2>{content.title}</h2>
										<pre>{content.content}</pre>
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
