import { Box, Grid } from "@material-ui/core";
import { Fragment, FunctionComponent, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import Swiper from 'react-id-swiper';
import Slider from "../../../../components/Slider";
import { BODY_METRICS } from "../../constants/measurement";
import { MeasurementInput } from "../input/MeasurementInput";
import bodyGuide from './body_guide.png';
import downloadIcon from './download.png';
import { useWindowSize } from "../../../../hooks/WindowResizeHook";

type BodyMeasurementProps = {
    setMetric?: (metrics: any) => void;
    setFormStatus?: (isValid: boolean) => void;
    // setErrors?: (errors: any) => void;
    submitedCount?: number;
    setAPIState?: (state: 'loading' | 'complete' | 'error', data?: any) => void;
}
export const BodyMeasurement: FunctionComponent<BodyMeasurementProps> = (props: BodyMeasurementProps) => {
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
    // const orderDetail = useSelector((state) => (state as any).common.orderDetail);
    const currentCustomer = useSelector((state) => (state as any).common.currentCustomer);
    const [dataModel, setDataModel] = useState(initModel({}));
    const { register, reset, handleSubmit, getValues, setValue, formState: { errors, isValid }, trigger } = useForm({
        defaultValues: { ...dataModel },
        mode: 'all',
        'reValidateMode': 'onChange'
    });
    const [isShowMoreClicked, setIsShowMoreClicked] = useState(false);
    const [itemsToShow, setItemsToShow] = useState(isShowMoreClicked ? BODY_METRICS.length : 4);

    let isSubmited = (submitedCount ?? 0) > 0;


    /// EFFECTS
    useEffect(() => {
        if (isShowMoreClicked) {
            setItemsToShow(BODY_METRICS.length);
        } else {
            setItemsToShow(4);
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
    function getLatestBodyMetrics() {
        setDataModel(currentCustomer.bodyMetric);
    }

    function hasBodyMetric() {
        return Object.keys(currentCustomer?.bodyMetric ?? {}).length > 0;
    }

    return <form onSubmit={handleSubmit(submit)}>
        <div className="msmt-body-container">
            <Box display="flex" justifyContent='center'><div className="msmt-category">{t('bodyMeasurement')}</div></Box>
            <Box display="flex" justifyContent='center' style={{ 'marginTop': '14px' }}><div className="msmt-progress"></div></Box>
            <Grid className="height-weight-container" container spacing={3}>
                <Grid className="weight-input"  item md={3} xs={6}>
                    <div className="body-input">
                        <MeasurementInput
                            className={isSubmited && errors.weight != null ? 'has-error' : ''}
                            label={t('weight')}
                            {...registerFn('weight')}
                            value={dataModel.weight}
                            onChange={(val) => updateModel('weight', val)}
                        ></MeasurementInput>
                    </div>
                </Grid>
                <Grid className="height-input" item md={3} xs={6}>
                    <div className="body-input height">
                        <MeasurementInput
                            className={isSubmited && errors.height != null ? 'has-error' : ''}
                            label={t('height')}
                            {...registerFn('height')}
                            value={dataModel.height}
                            onChange={(val) => updateModel('height', val)}
                        ></MeasurementInput>
                    </div>
                </Grid>
                <Grid className="get-your-latest-measurement-container" container item md={6} xs={12} alignItems="flex-end">
                    {hasBodyMetric() ? <div className="get-your-latest-measurement" onClick={() => getLatestBodyMetrics()}>
                        <img className="download-icon" src={downloadIcon} />
                        <span className="text">{t('getYourLatestMeasurement')}</span>
                    </div> : <Fragment/>}
                </Grid>
            </Grid>
            {isMobile ? mobileUI(): desktopUI()}
        </div>
    </form >

    function mobileUI() {
        return <div style={{'marginTop': '32px'}}><Slider swiperRef={swiperRef}>
            <Swiper {...params} ref={swiperRef}>
                {BODY_METRICS.map((metric, i) =>
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
                            <img src={bodyGuide} />
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
                    var metric = BODY_METRICS[i]; return <Grid key={i} item md={3}>
                        <div>
                            <MeasurementInput
                                className={isSubmited && errors[metric] != null ? 'has-error' : ''}
                                label={`${i + 1}. ${t(metric)}`}
                                {...registerFn(metric)}
                                onChange={(val) => updateModel(metric, val)}
                                value={dataModel[metric]}></MeasurementInput>
                        </div>
                        <div className="metric-image">
                            <img src={bodyGuide} />
                        </div>
                        <div className="metric-description">
                            {t(metric + 'Description')}
                        </div>
                    </Grid>;
                })}
            </Grid>
            <Box display='flex' justifyContent='center'>
                <div onClick={() => setIsShowMoreClicked(!isShowMoreClicked)} className="show-more">{t(isShowMoreClicked ? 'showLess' : 'showMore')} {!isShowMoreClicked ? <span>&nbsp;({BODY_METRICS.length - itemsToShow})</span> : <Fragment />}</div>
            </Box>
        </Box>;
    }
}

function initModel(existingValues: any) {
    existingValues = existingValues || {};
    const bodyModel: { [key: string]: number | null; } = {
        'height': null,
        'weight': null
    };
    BODY_METRICS.forEach(m => bodyModel[m] = existingValues[m] ?? '');

    return bodyModel;
}
