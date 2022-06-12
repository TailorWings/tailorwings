import { Box } from "@material-ui/core";
import { FunctionComponent } from "react";
import arrow from './arrow.png';

interface MeasurementInputProps {
    className?: string;
    label: string;
    value?: any;
    onChange?: (newValue: any) => void;
}

export const MeasurementInput: FunctionComponent<MeasurementInputProps> = (props: MeasurementInputProps) => {
    var onChange = props.onChange ?? ((_: any) => { });
    return <Box display="flex" flexDirection='column' className={`msmt-input-container ${props.className??''}`}>
        <span className="label">{props.label}</span>
        <div className="input-with-suffix">
            <input value={props.value ?? ''} onChange={(e) => onChange(e.target.value)}></input>
            <div className="suffix">
                <span>cm</span>
                <img className="arrow-icon" src={arrow} />
            </div>
        </div>
    </Box>
}