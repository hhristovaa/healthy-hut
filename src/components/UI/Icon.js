import { IonIcon, IonItem } from '@ionic/react';
import * as iconName from 'ionicons/icons';

const Icon = props => {
    return <IonIcon icon={iconName} className={props.className}/>
}

export default Icon;