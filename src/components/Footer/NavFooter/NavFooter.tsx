import { FunctionComponent } from "react";
import { ReactComponent as ArrowBackIcon } from './backIcon.svg';
import { ReactComponent as ArrowNextIcon } from './nextIcon.svg';

interface NavFooterProps {
    className?: string;
    backDisabled?: boolean;
    nextDisabled?: boolean;
    backLabel?: string;
    nextLabel?: string;
    onBackClicked?: () => void;
    onNextClicked?: () => void;
}

export const NavFooter: FunctionComponent<NavFooterProps> = (props: NavFooterProps) => {

    return <div className={`nav-footer-container ${props.className ?? ''}`}>
        <div className="nav-footer">
            <button className="nav-footer-button btn-back" onClick={() => props.onBackClicked?.call(this)}>
                <ArrowBackIcon />
                <span className="btn-text ml-12px">{props.backLabel}</span>
            </button>
            <button className="nav-footer-button btn-next" onClick={() => props.onNextClicked?.call(this)}>
                <span className="btn-text mr-12px">{props.nextLabel}</span>
                <ArrowNextIcon />
            </button>
        </div>
        {/* <div className="nav-footer-space"></div> */}
    </div>
}