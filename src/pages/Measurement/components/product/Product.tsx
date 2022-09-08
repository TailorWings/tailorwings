import { Box, Grid } from "@material-ui/core";
import { Fragment, FunctionComponent, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import Swiper from 'react-id-swiper';
import { useSelector } from "react-redux";
import Slider from "../../../../components/Slider";
import { useWindowSize } from "../../../../hooks/WindowResizeHook";
import { PRODUCT_METRICS, STYLE_PRODUCT_METRICS_MAP } from "../../constants/measurement";
import { MeasurementInput } from "../input/MeasurementInput";

type ProductMeasurementProps = {
    setMetric?: (metrics: any) => void;
    setFormStatus?: (isValid: boolean) => void;
    submitedCount?: number;
}
export const ProductMeasurement: FunctionComponent<ProductMeasurementProps> = (props: ProductMeasurementProps) => {
    const swiperRef: any = useRef(null);
    const [width, height]  = useWindowSize();
    const isMobile = width < 769;
    const params: any = {
        slidesPerView: 1.2,
        slidesPerColumn: 1,
        spaceBetween: 5,
        slidesPerColumnFill: 'row',
        lazy: true,
        rebuildOnUpdate: true,
        // navigation: {
        // 	nextEl: '.swiper-button-next',
        // 	prevEl: '.swiper-button-prev',
        // },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        on: {},
    };
    
    const { t } = useTranslation();
    const { submitedCount, setFormStatus, setMetric } = props;
    /// STATES
    const orderDetail = useSelector((state) => (state as any).common.orderDetail);
    const currentCustomer = useSelector((state) => (state as any).common.currentCustomer);
    const ProductMetricList = getProductMetrics(orderDetail.designStyle);
    const [dataModel, setDataModel] = useState(initModel({}, ProductMetricList));
    const { register, reset, handleSubmit, getValues, setValue, formState: { errors, isValid }, trigger } = useForm({
        defaultValues: { ...dataModel },
        mode: 'all',
        'reValidateMode': 'onChange'
    });
    const [isShowMoreClicked, setIsShowMoreClicked] = useState(false);
    const [itemsToShow, setItemsToShow] = useState(isShowMoreClicked ? ProductMetricList.length : Math.min(4, ProductMetricList.length));

    let isSubmited = (submitedCount ?? 0) > 0;



    /// EFFECTS
    useEffect(() => {
        if (isShowMoreClicked) {
            setItemsToShow(ProductMetricList.length);
        } else {
            setItemsToShow(Math.min(ProductMetricList.length, 4));
        }
    }, [isShowMoreClicked]);

    useEffect(() => {
        isSubmited = (submitedCount ?? 0) > 0;
        if ((submitedCount ?? 0) > 0) {
            validate();
        }
    }, [submitedCount]);

    useEffect(() => {
        Object.keys(dataModel).forEach(k => setValue(k, dataModel[k], { shouldValidate: true }));
        validate();
        setMetric?.call(this, getValues());
    }, [dataModel]);


    async function validate() {
        return new Promise<boolean>(async (resolve, _) => {
            if (Object.values(dataModel).some(v => !v || v <= 0) && !isShowMoreClicked && isSubmited) {
                setIsShowMoreClicked(true);
                setTimeout(async () => {
                    // wait for all input registered
                    resolve(await updateFormValidation());
                });
            } else {
                resolve(await updateFormValidation());
            }
        });
    }
    async function updateFormValidation() {
        const rs = await trigger();
        setFormStatus?.call(null, rs);
        return rs;
    }

    async function updateModel(name: string, value: number) {
        let model = { ...dataModel };
        model[name] = value;
        setDataModel(model);

    }
    function submit() {
        // (formRef.current! as HTMLFormElement).submit();
    }
    function registerFn(field: string) {
        return register(field, {
            required: true, valueAsNumber: true, validate: (value) => {
                return value > 0;
            }
        });
    }

    return <div className="msmt-product-container">
        <Box display="flex" justifyContent='center'><div className="msmt-category">{t('productMeasurement')}</div></Box>
        <Box display="flex" justifyContent='center' style={{ 'marginTop': '14px' }}><div className="msmt-progress"></div></Box>
        {isMobile ? mobileUI() : desktopUI()}



    </div>

    function mobileUI() {
        return <div style={{'marginTop': '32px'}}><Slider swiperRef={swiperRef}>
            <Swiper {...params} ref={swiperRef}>
                {ProductMetricList.map((metric, i) =>
                    <div key={i}>
                        <div>
                            <MeasurementInput
                                className={isSubmited && errors[metric] != null ? 'has-error' : ''}
                                label={`${i + 1}. ${t(metric)}`}
                                {...registerFn(metric)}
                                onChange={(val) => updateModel(metric, val)}
                                value={dataModel[metric]}></MeasurementInput>
                        </div>
                        <div className="metric-image">
                        <img src={'/assets/images/Product_Measurement/' + metric + '.png'} />
                        </div>
                        <div className="metric-description">
                            {t(metric + 'Description')}
                        </div>
                    </div>
                )}
            </Swiper>
        </Slider>
        </div>
    }

    function desktopUI() {
        return <Box className="body-metric-container">
            <Grid container spacing={3}>
                {Array(itemsToShow).fill(1).map((_, i) => {
                    var metric = ProductMetricList[i]; return <Grid key={i} item md={3}>
                        <div>
                            <MeasurementInput
                                className={isSubmited && errors[metric] != null ? 'has-error' : ''}
                                label={`${i + 1}. ${t(metric)}`}
                                {...registerFn(metric)}
                                onChange={(val) => updateModel(metric, val)}
                                value={dataModel[metric]}></MeasurementInput>
                        </div>
                        <div className="metric-image">
                        <img src={'/assets/images/Product_Measurement/' + metric + '.png'} />
                        </div>
                        <div className="metric-description">
                            {t(metric + 'Description')}
                        </div>
                    </Grid>;
                })}
            </Grid>
            <Box display='flex' justifyContent='center'>
                <div onClick={() => setIsShowMoreClicked(!isShowMoreClicked)} className="show-more">{t(isShowMoreClicked ? 'showLess' : 'showMore')} {!isShowMoreClicked ? <span>&nbsp;({ProductMetricList.length - itemsToShow})</span> : <Fragment />}</div>
            </Box>
        </Box>;
    }
}

function initModel(existingValues: any, metricList: string[]) {
    existingValues = existingValues || {};
    const model: { [key: string]: number | null; } = {
    };
    metricList.forEach(m => model[m] = existingValues[m] ?? '');

    return model;
}
function getProductMetrics(style: string): string[] {
    return STYLE_PRODUCT_METRICS_MAP[style] ?? PRODUCT_METRICS;
}