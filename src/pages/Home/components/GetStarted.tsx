import { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import Title from "../../../components/Title";
import { useHistory } from 'react-router';
import LargeButton from "../../../components/Button/LargeButton";
import "./GetStarted.scss";

type GetStartedProps = {
};

export const GetStarted: FunctionComponent<GetStartedProps> = (props: GetStartedProps) => {
    const { t } = useTranslation();
    const history = useHistory();
    return <div className="get-started">
        <div className="c-home-how-it-work__title">
            <Title title={t('mainTitle')} subtitle={t('mainSubTitle')} textStyle="bigCenter" />
        </div>
        <div onClick={() => history.push('requirement')}>
            <LargeButton text={t('getStarted')} />
        </div>
    </div>
}
