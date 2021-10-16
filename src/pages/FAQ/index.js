import React from 'react';
import Accordion from '../../components/Accordion';
import { FAQ_CONTENT, FAQ_TITLE } from '../../constants';

function FaqPage() {
	return (
		<div className="l-faq">
			<div className="faq-title">
				<h1>{FAQ_TITLE?.title || ''}</h1>
				<p>{FAQ_TITLE?.subtitle || ''}</p>
			</div>
			<div className="faq-content">
				{/* {FAQ_CONTENT &&
					FAQ_CONTENT.map((content, index) => {
						return (
							<div key={index} className="faq-content__question">
								<Accordion title={content?.question || ''} isActive={false}>
									<div className="faq-content__answer">
										<p>{content?.answer || ''}</p>
									</div>
								</Accordion>
							</div>
						);
					})} */}

				<div className="faq-content__question">
					<Accordion title="HOW LONG DOES ORDER TAKE?" isActive={false}>
						<div className="faq-content__answer">
							<p>
								Depending on the complexity of any customizations and/or special fabrics associated
								with the order.{' '}
							</p>
							<ul>
								<li>Not In A Rush: 8 - 12 days</li>
								<li>Standard: 5 - 7 days</li>
								<li>Express: 3 - 4 days</li>
								<li>VIP: 2 - 3 days</li>
							</ul>
							<p>Orders are delivered Monday to Saturday.</p>
							<i>Please note: orders are not shipped and/or delivered on weekends or holidays.</i>
						</div>
					</Accordion>
					<Accordion title="DO YOU SHIP INTERNATIONALLY?" isActive={false}>
						<div className="faq-content__answer">
							<p>
								Yes! Any country outside of Vietnam will be charged a $30 shipping fee. Please
								contact the customer service team for more detail.
							</p>
							<p>
								Your order may be required to pay customs and import duties upon arrival of the
								goods into your country. Tailor Wings is not responsible for any taxes or duties the
								customs office may charge you, and payment is necessary to release your order from
								customs.
							</p>
							<p>
								Please check your local customs office for more information as customs policies and
								import duties vary from country to country.
							</p>
						</div>
					</Accordion>
					<Accordion title="HOW CAN I TRACK MY ORDER?" isActive={false}>
						<div className="faq-content__answer">
							<p>You will receive an email or messege once your order is ready to ship.</p>
						</div>
					</Accordion>
					<Accordion title="WHAT IS OUR RETURNS POLICY?" isActive={false}>
						<div className="faq-content__answer">
							<p>
								Our clothing is made-to-order, just for you and no one else. Should you decide to
								return your order, we charge a small <strong>Zero Waste Fee</strong> ($25 per item)
								which will be deducted from your refund. We charge this fee because we don’t build
								inventory into our up front pricing, therefore offering you the lowest pricing
								possible for made-to-order clothing. Your Zero Waste Fee will help us reduce the
								impact of excess stock on the environment.
							</p>
							<p>Returns must be received within 30 days of delivery.</p>
							<i>
								Please note that any item to be returned must be in new, unused and resalable
								condition, with the DO NOT REMOVE tag still attached in the same place as originally
								sent.
							</i>
						</div>
					</Accordion>
					<Accordion title="HOW DO I RETURN AN ITEM?" isActive={false}>
						<div className="faq-content__answer">
							<ul>
								<li>
									Please email us via email address : <span>info.tailorwings@gmail.com</span> your reason why you
									are returning the item. This will help us improve your next experience with us .
									We will then process the return for you.
								</li>
								<li>After will receive an email to confirm your return has started, please :</li>
								<li>Package the item(s) on the package </li>
								<li>Include a copy of the original bill inside your return package</li>
								<li>
									Take the package to the nearest Post Office for drop-off. Be sure to send your
									package within the 30-day period
								</li>
							</ul>
							<i>
								Any customs and import duties paid are non-refundable. Please note that any item to
								be returned must be in new, unused and resalable condition.
							</i>
						</div>
					</Accordion>
					<Accordion title="WHAT IF THE ITEM IS FAULTY?" isActive={false}>
						<div className="faq-content__answer">
							<p>
								We stand behind our product! If for some reason, you feel as though the item is
								faulty, please email us at <span>info.tailorwings@gmail.com</span> with 3-4 large
								well lit photos of the item, along with your order number and we will contact you
								with any next steps.
							</p>
						</div>
					</Accordion>
					<Accordion title="CAN I CANCEL MY ORDER?" isActive={false}>
						<div className="faq-content__answer">
							<p>
								Yes! You are able to cancel your order within 24 hours of purchase. If you would
								like to cancel your order, please contact us immediately at{' '}
								<span>info.tailorwings@gmail.com</span> with your cancellation request and order
								number.
							</p>
						</div>
					</Accordion>
					<Accordion title="DO YOU HAVE A PHONE NUMBER I CAN CALL?" isActive={false}>
						<div className="faq-content__answer">
							<p>
								We don’t offer customer service support over the phone, but please don’t
								misunderstand this as a lack of interest! We focus on providing fast and high
								quality responses by email or chat via our Facebook page, so you’re always talking
								to a human that can help first-hand.
							</p>
						</div>
					</Accordion>
					<Accordion title="HOW I TAKE MEASUREMENTS BY MYSELF?" isActive={false}>
						<div className="faq-content__answer">
							<p>
								Please visit this instruction video :{' '}
								<a
									href="https://www.youtube.com/channel/UCiYh4Ls6M36nYAdx5u36xkw"
									target="_blank"
									rel="noreferrer"
								>
									Tailor Wings Official
								</a>
							</p>
						</div>
					</Accordion>
				</div>
			</div>
		</div>
	);
}

export default FaqPage;
