import { Backdrop, CircularProgress, makeStyles } from "@material-ui/core";
import { FunctionComponent, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { setOrderDetail } from "../../../../app/ReduxSlices/commonSlice";
import { NavFooter } from "../../../../components/Footer/NavFooter/NavFooter";
import MaterialAlert from "../../../../components/MaterialAlert";
import { updateDocument } from "../../../../services/API/firebaseAPI";
import { BodyMeasurement } from "../body/Body";
import { ProductMeasurement } from "../product/Product";


const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

type MeasurementOnlineProps = {
}
export const MeasurementOnline: FunctionComponent<MeasurementOnlineProps> = (props: MeasurementOnlineProps) => {
    const { t } = useTranslation();
    const history = useHistory();
    const dispatch = useDispatch();
    const classes = useStyles();
    const orderDetail = useSelector((state) => (state as any).common.orderDetail);
    const currentCustomer = useSelector((state) => (state as any).common.currentCustomer);
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMsg, setAlertMsg] = useState('');
    const [submitedCount, setsubmitedCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [isBodyValid, setisBodyValid] = useState(false);
    const [isProductValid, setisProductValid] = useState(false);
    const [productMeasurement, setProductMeasurement] = useState({});
    const [bodyMeasurement, setBodyMeasurement] = useState({});
    // let isBodyValid = false;
    function updateBodyStatus(val: boolean) {
        console.log('Body valid = ', val)
        if (isBodyValid != val) {
            setisBodyValid(val);
        }

    }
    function updateProductStatus(val: boolean) {
        console.log('Product valid = ', val)
        if (isProductValid != val) {
            setisProductValid(val);
        }
    }

    async function nextClicked() {
        setsubmitedCount(submitedCount + 1);

        if (!isBodyValid || !isProductValid) {
            let invalidList = [];
            if (!isBodyValid) {
                invalidList.push('Body');
            }
            if (!isProductValid) {
                invalidList.push('Product');
            }
            setAlertMsg(`${invalidList.join(' and ')} measurement ${invalidList.length > 1 ? 'are' : 'is'} invalid`);
            setAlertOpen(true);
        } else {
            const action_setOrderDetail = setOrderDetail({ ...orderDetail, msmt: { ...productMeasurement } });
		    dispatch(action_setOrderDetail);
            if (currentCustomer) {
                setLoading(true);
                try {
                    await updateDocument('customers', currentCustomer.id, 'bodyMeasurement', bodyMeasurement);
                    setLoading(false);
                } catch (error) {
                    console.error(error);
                    setLoading(false);
                }
            }
            history.push(`/summary?method=online`);
        }
    }


    return <div className="msmt-online-container">
        <Backdrop
            className={classes.backdrop} open={loading}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
        <div className="container">
            <BodyMeasurement
                submitedCount={submitedCount}
                setFormStatus={updateBodyStatus}
                setMeasurement={setBodyMeasurement}
            ></BodyMeasurement>
            <div style={{ 'marginTop': '48px' }}>
                <ProductMeasurement submitedCount={submitedCount}
                    setFormStatus={updateProductStatus}
                    setMeasurement={setProductMeasurement}></ProductMeasurement>
            </div>
        </div>
        <NavFooter className='mt-99px' backLabel={t('back')} nextLabel={t('personalize')}
            onBackClicked={() => history.push('/fabric')}
            onNextClicked={nextClicked}
        ></NavFooter>
        <MaterialAlert
            open={alertOpen}
            setOpen={setAlertOpen}
            content={alertMsg}
            serverity="error"
        />
        {/* <Popup show={popupShow} setPopupShow={setPopupShow}>
            <OnlineMsmtContent onButtonClick={confirmSave} />
        </Popup> */}
    </div>
}
