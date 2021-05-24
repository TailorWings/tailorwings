import React from 'react';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import TailorRoundTag from '../../../components/Tag/TailorRoundTag';
import TailorSquareTag from '../../../components/Tag/TailorSquareTag';
import { FABRIC_TYPES } from '../../../constants';
import { modifyPrice } from '../../../services/Functions/commonFunctions';

function TailorOrder(props) {
	/*------------------------------*/
	const { id, rqmt, customer, offers, orderDate, isTailored, status } = props.order;
	/*------------------------------*/
	let pickedOffer = offers?.length > 0 ? offers.find((offer) => offer.picked) : null;
	const isOffer = offers?.some((offer) => offer?.tailor?.id === props.tailor?.id);
	/*------------------------------*/
	return (
		<div className="tailor-order">
			<Link to={`/tailor/detail/${id}?t=${props.type}`} className="tailor-order-top">
				<div className="left">
					{rqmt?.designFiles?.length > 0 ? (
						<img src={rqmt?.designFiles[0]} alt="rqmt" />
					) : (
						<Fragment />
					)}
				</div>
				<div className="right">
					<div className="right__wrapper">
						<h3>{customer?.name || ''}</h3>
						<div className="right__tags">
							{rqmt?.fabric?.type ? (
								<TailorRoundTag
									text={FABRIC_TYPES.find((type) => type.id === rqmt.fabric.type)?.name || ''}
								/>
							) : (
								<Fragment />
							)}
							{rqmt?.designStyle ? <TailorRoundTag text={rqmt?.designStyle} /> : <Fragment />}
						</div>
					</div>
				</div>
			</Link>
			<div className="tailor-order-bottom">
				<div className="-wrapper">
					<TailorSquareTag title="Số lượng thợ may đã báo giá" value={offers?.length || 0} />
				</div>
				{orderDate && (
					<div className="-wrapper">
						<TailorSquareTag title="Ngày đặt may" value={orderDate} />
					</div>
				)}
				{pickedOffer?.wage && (
					<div className="-wrapper">
						<TailorSquareTag
							title="Giá đã báo"
							value={modifyPrice(parseInt(pickedOffer.wage) * 1000) + ' đ'}
						/>
					</div>
				)}
				{pickedOffer?.fabricNumber && (
					<div className="-wrapper">
						<TailorSquareTag title="Lượng vải cần" value={pickedOffer.fabricNumber + 'm'} />
					</div>
				)}
			</div>
			{props.onTailorDone && status === 'tailoring' ? (
				<div
					className={`tailor-order-btn ${isTailored ? '--disabled' : ''}`}
					onClick={isTailored ? () => {} : () => props.onTailorDone(id)}
				>
					<span>{isTailored ? 'Đã may xong' : 'May xong'}</span>
				</div>
			) : (
				<Fragment />
			)}
			{status === 'finding' &&
				(isOffer ? (
					<div className={`tailor-order-btn ${isOffer ? '--disabled' : ''}`}>
						<span>Đã báo giá </span>
					</div>
				) : (
					<Link
						to={`/tailor/detail/${id}?t=${props.type}`}
						className={`tailor-order-btn ${isOffer ? '--disabled' : ''}`}
					>
						<span>Báo giá</span>
					</Link>
				))}
		</div>
	);
}

export default TailorOrder;
