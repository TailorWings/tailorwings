import { Fragment, FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import { MEASUREMENT_UNIT_MAP } from "../../Measurement/constants/measurement";

type OrderMeasurementInfoProps = {
    order: any;
}
export const OrderMeasurementInfo: FunctionComponent<OrderMeasurementInfoProps> = (props: OrderMeasurementInfoProps) => {
    const bodyMeasurement = props.order.bodyMeasurement || props.order.bodyMetric;
    const productMeasurement = props.order.productMeasurement || props.order.msmt;
    const { t } = useTranslation();
    return <Fragment>
        {bodyMeasurement ? <div className="c-admin-order__info --msmt">
            <p>{t('bodyMeasurement')}</p>
            <div className="c-msmt-form">
                <div className='c-msmt-form__list c-msmt-form__display-one-item'>
                    {Object.keys(bodyMeasurement).map((metricKey, i) =>
                        <div key={i} className="c-msmt-form__item">
                            <div className="c-text-input">
                                <label className="c-text-input__wrapper">
                                    <span className="c-text-input__suffix">({
                                        MEASUREMENT_UNIT_MAP[metricKey] ?? 'cm'
                                    })</span>
                                    <input type="text" className="c-text-input__field" maxLength={3} placeholder="" value={bodyMeasurement[metricKey]} />
                                </label>
                                <label htmlFor="text-input-Abdomen" className="c-text-input__label">{t(metricKey)}</label>
                            </div>
                        </div>)}
                </div>
            </div>
        </div> : <Fragment />}
        {
            productMeasurement ? <div className="c-admin-order__info --msmt">
                <p>{t('productMeasurement')}</p>
                <div className="c-msmt-form">
                    <div className='c-msmt-form__list c-msmt-form__display-one-item'>
                        {Object.keys(productMeasurement).map((metricKey, i) =>
                            <div key={i} className="c-msmt-form__item">
                                <div className="c-text-input">
                                    <label className="c-text-input__wrapper">
                                        <span className="c-text-input__suffix">({
                                        MEASUREMENT_UNIT_MAP[metricKey] ?? 'cm'
                                    })</span>
                                        <input type="text" className="c-text-input__field" maxLength={3} placeholder="" value={productMeasurement[metricKey]} />
                                    </label>
                                    <label htmlFor="text-input-Abdomen" className="c-text-input__label">{t(metricKey)}</label>
                                </div>
                            </div>)}
                    </div>
                </div>
            </div> : <Fragment />
        }
    </Fragment>

}

