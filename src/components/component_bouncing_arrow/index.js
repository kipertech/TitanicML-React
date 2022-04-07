import './index.css';

// Libraries
import { useContext } from "react";
import { ReactImageTint } from 'react-image-tint';

// Images
import ArrowImage from '../../images/image_arrow_down.png';

// Configs
import { ThemeContext } from '../../configs/config_context';

const BouncingArrow = () =>
{
    const theme = useContext(ThemeContext);

    return(
        <div className="arrow bounce">
            <ReactImageTint src={ArrowImage} alt={'down'} color={theme.main}/>
        </div>
    )
}

export default BouncingArrow;
