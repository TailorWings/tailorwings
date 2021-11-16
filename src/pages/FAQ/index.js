import React from 'react';
import Accordion from '../../components/Accordion';
import { FAQ_CONTENT, FAQ_TITLE } from '../../constants';
import { useTranslation } from 'react-i18next';

function FaqPage() {
	const { t, i18n } = useTranslation();
	const isENG = i18n.language == 'en';
	return (
		<div className="l-faq">
			<div className="faq-title">
				<h1>{isENG ? FAQ_TITLE.title : FAQ_TITLE.titleVN}</h1>
				{/* <p>{FAQ_TITLE?.subtitle || ''}</p> */}
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
					<Accordion
						title={isENG ? 'HOW LONG DOES ORDER TAKE?' : 'ĐƠN MAY THƯỜNG MẤT BAO LÂU?'}
						isActive={false}
					>
						<div className="faq-content__answer">
							<p>
								{isENG
									? 'Depending on the complexity of any customizations and/or special fabrics associated with the order.'
									: 'Tùy thuộc vào mức độ phức tạp của thiết kế và/ hoặc các loại vải liên quan đến đơn đặt hàng thời gian để hoàn tất đơn hàng là:'}
							</p>
							<ul>
								<li>{isENG ? 'Not In A Rush: 8 - 12 days' : 'Không gấp: 8-12 ngày'}</li>
								<li>{isENG ? 'Standard: 5 - 7 days' : 'Tiêu chuẩn: 5-7 ngày'}</li>
								<li>{isENG ? 'Express: 3 - 4 days' : 'Nhanh: 3 - 4 ngày'}</li>
								<li>{isENG ? 'VIP: 2 - 3 days' : 'VIP: 2-3 ngày'}</li>
							</ul>
							<p>
								{isENG
									? 'Orders are delivered Monday to Saturday.'
									: 'Đơn đặt hàng được giao từ thứ Hai đến thứ Bảy.'}
							</p>
							<i>
								{isENG
									? 'Please note: orders are not shipped and/or delivered on weekends or holidays.'
									: 'Xin lưu ý: đơn đặt hàng không được giao vào Chủ nhật hoặc ngày lễ.'}
							</i>
						</div>
					</Accordion>
					<Accordion
						title={isENG ? 'DO YOU SHIP INTERNATIONALLY?' : 'CÓ THỂ GIAO HÀNG QUỐC TẾ KHÔNG?'}
						isActive={false}
					>
						<div className="faq-content__answer">
							<p>
								{isENG
									? 'Yes! Any country outside of Vietnam will be charged a $30 shipping fee. Please contact the customer service team for more detail.'
									: 'Có! Mọi quốc gia ngoài Việt Nam đơn hàng sẽ bị tính phí vận chuyển $30( dưới 2kg). Vui lòng liên hệ với chúng tôi để biết thêm chi tiết.'}
							</p>
							<p>
								{isENG
									? 'Your order may be required to pay customs and import duties upon arrival of the goods into your country. Tailor Wings is not responsible for any taxes or duties the customs office may charge you, and payment is necessary to release your order from customs.'
									: 'Đơn đặt hàng của bạn có thể được yêu cầu thanh toán thuế hải quan và thuế nhập khẩu khi hàng hóa đến đất nước của bạn. Tailor Wings không chịu trách nhiệm về bất kỳ loại thuế hoặc nghĩa vụ nào mà cơ quan hải quan có thể tính cho bạn, và việc thanh toán là cần thiết để giải phóng đơn hàng của bạn khỏi hải quan.'}
							</p>
							<p>
								{isENG
									? 'Please check your local customs office for more information as customs policies and import duties vary from country to country.'
									: 'Vui lòng kiểm tra văn phòng hải quan địa phương của bạn để biết thêm thông tin vì chính sách hải quan và thuế nhập khẩu sẽ khác nhau giữa các quốc gia.'}
							</p>
						</div>
					</Accordion>
					<Accordion
						title={isENG ? 'HOW CAN I TRACK MY ORDER?' : 'LÀM SAO ĐỂ KIỂM TRA TÌNH TRẠNG ĐƠN HÀNG?'}
						isActive={false}
					>
						<div className="faq-content__answer">
							<p>
								{isENG
									? 'You will receive an email or messege once your order is ready to ship.'
									: 'Bạn sẽ nhận được email hoặc tin nhắn thông báo khi đơn hàng sẵn sàng giao đi.'}
							</p>
						</div>
					</Accordion>
					<Accordion
						title={isENG ? 'WHAT IS OUR RETURNS POLICY?' : 'CHÍNH SÁCH TRẢ HÀNG NHƯ THẾ NÀO?'}
						isActive={false}
					>
						<div className="faq-content__answer">
							<p>
								{isENG
									? `Our clothing is made-to-order, just for you and no one else. Should you decide to
								return your order, we charge a small Zero Waste Fee ($25 per item)
								which will be deducted from your refund. We charge this fee because we don’t build
								inventory into our up front pricing, therefore offering you the lowest pricing
								possible for made-to-order clothing. Your Zero Waste Fee will help us reduce the
								impact of excess stock on the environment.`
									: 'Quần áo của chúng tôi được sản xuất theo đơn đặt hàng, chỉ dành cho bạn chứ không phải ai khác. Nếu bạn quyết định trả lại đơn đặt hàng của mình, chúng tôi sẽ tính một khoản phí "Không rác thải" là (25USD cho mỗi mặt hàng) sẽ được khấu trừ vào khoản tiền hoàn lại của bạn. Chúng tôi tính phí này bởi vì chúng tôi đã cấp cho bạn mức giá thấp nhất có thể cho quần áo may theo nhu cầu riêng. Phí Không Rác thải của bạn sẽ giúp chúng tôi giảm tác động của lượng hàng dư thừa đối với môi trường.'}
							</p>
							<p>
								{isENG
									? 'Returns must be received within 30 days of delivery.'
									: 'Tiền hoàn trả sẽ được thực hiện trong vòng 30 ngày kể từ ngày giao hàng.'}
							</p>
							<i>
								{isENG
									? `Please note that any item to be returned must be in new, unused and resalable
								condition, with the DO NOT REMOVE tag still attached in the same place as originally
								sent.`
									: 'Xin lưu ý rằng bất kỳ mặt hàng nào được trả lại phải trong tình trạng mới, chưa qua sử dụng và có thể bán lại, đồng thời tem tag vẫn được gắn ở vị trí như đã gửi ban đầu.'}
							</i>
						</div>
					</Accordion>
					<Accordion
						title={isENG ? 'HOW DO I RETURN AN ITEM?' : 'LÀM SAO ĐỂ TRẢ LẠI HÀNG?'}
						isActive={false}
					>
						<div className="faq-content__answer">
							<ul>
								<li>
									{isENG
										? `Please email us via email address : info.tailorwings@gmail.com your
									reason why you are returning the item. This will help us improve your next
									experience with us . We will then process the return for you.`
										: 'Vui lòng gửi email cho chúng tôi qua địa chỉ email: info.tailorwings@gmail.com về lý do bạn trả lại hàng. Điều này sẽ giúp chúng tôi cải thiện trải nghiệm tiếp theo của bạn với chúng tôi. Sau đó, chúng tôi sẽ xử lý việc trả lại hàng cho bạn.'}
								</li>
								<li>
									{isENG
										? `After will receive an email to confirm your return has started, please :`
										: 'Sau khi nhận được một email để xác nhận đồng ý việc trả hàng, vui lòng:'}
								</li>
								<li>
									{isENG
										? `Package the item(s) on the package `
										: `Đóng gói (các) mặt hàng vào bao bì gốc đính kèm cùng một bản sao của hóa đơn gốc bên trong gói hàng.`}
								</li>
								<li>
									{isENG ? 'Include a copy of the original bill inside your return package' : ''}
								</li>
								<li>
									{isENG
										? `Take the package to the nearest Post Office for drop-off. Be sure to send your
									package within the 30-day period`
										: 'Mang gói hàng đến Bưu điện gần nhất. Hãy đảm bảo gửi gói hàng của bạn trong khoảng thời gian 30 ngày.'}
								</li>
							</ul>
							<i>
								{isENG
									? `Any customs and import duties paid are non-refundable. Please note that any item to
								be returned must be in new, unused and resalable condition.`
									: 'Bất kỳ hải quan và thuế nhập khẩu đã trả là không hoàn lại. Xin lưu ý rằng bất kỳ mặt hàng nào được trả lại phải ở trong tình trạng mới, chưa qua sử dụng và có thể bán lại.'}
							</i>
						</div>
					</Accordion>
					<Accordion
						title={isENG ? 'WHAT IF THE ITEM IS FAULTY?' : 'NẾU SẢN PHẨM CÓ LỖI?'}
						isActive={false}
					>
						<div className="faq-content__answer">
							<p>
								{isENG
									? `We stand behind our product! If for some reason, you feel as though the item is
								faulty, please email us at info.tailorwings@gmail.com with 3-4 large
								well lit photos of the item, along with your order number and we will contact you
								with any next steps.`
									: 'Chúng tôi nỗ lực để tạo ra sản phẩm tốt nhất cho bạn! Nếu vì lý do nào đó, bạn cảm thấy mặt hàng bị lỗi, vui lòng gửi email cho chúng tôi theo địa chỉ info.tailorwings@gmail.com kèm theo 3-4 bức ảnh lớn đủ ánh sáng của vấn đề trên sản phẩm, cùng với số đơn đặt hàng của bạn và chúng tôi sẽ liên hệ với bạn để thực hiện bước tiếp theo.'}
							</p>
						</div>
					</Accordion>
					<Accordion
						title={isENG ? 'CAN I CANCEL MY ORDER?' : 'TÔI CÓ THỂ HỦY ĐƠN HÀNG KHÔNG?'}
						isActive={false}
					>
						<div className="faq-content__answer">
							<p>
								{isENG
									? `Yes! You are able to cancel your order within 24 hours of purchase. If you would
								like to cancel your order, please contact us immediately at
								info.tailorwings@gmail.com with your cancellation request and order
								number.`
									: 'Có nhé! Bạn có thể hủy đơn hàng của mình trong vòng 24 giờ sau khi đặt hàng. Nếu bạn muốn hủy đơn đặt hàng của mình, vui lòng liên hệ ngay với chúng tôi tại info.tailorwings@gmail.com với yêu cầu hủy và số đơn đặt hàng của bạn.'}
							</p>
						</div>
					</Accordion>
					<Accordion
						title={
							isENG
								? 'DO YOU HAVE A PHONE NUMBER I CAN CALL?'
								: 'TAILOR WINGS CÓ HỖ TRỢ QUA ĐIỆN THOẠI KHÔNG?'
						}
						isActive={false}
					>
						<div className="faq-content__answer">
							<p>
								{isENG
									? `We don’t offer customer service support over the phone, but please don’t
								misunderstand this as a lack of interest! We focus on providing fast and high
								quality responses by email or chat via our Facebook page, so you’re always talking
								to a human that can help first-hand.`
									: 'Chúng tôi không cung cấp dịch vụ hỗ trợ khách hàng qua điện thoại, nhưng xin đừng hiểu nhầm điều này là thiếu quan tâm! Chúng tôi tập trung vào việc cung cấp phản hồi nhanh chóng và chất lượng cao qua email hoặc trò chuyện qua trang Facebook của chúng tôi, vì vậy, bạn luôn có thể trò chuyện với một người có thể giúp đỡ tận tình.'}
							</p>
						</div>
					</Accordion>
					<Accordion title={isENG?"HOW I TAKE MEASUREMENTS BY MYSELF?": "LÀM THẾ NÀO TÔI TỰ ĐO ĐƯỢC?"} isActive={false}>
						<div className="faq-content__answer">
							<p>
								{isENG? "Please visit this instruction video :":"Vui lòng truy cập video hướng dẫn này:"}
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
