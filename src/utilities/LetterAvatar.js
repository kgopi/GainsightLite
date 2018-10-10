/**
 * Created by kgopi on 2/6/18.
 */

import React from 'react';
import {Avatar} from 'react-native-elements';

export function getLetterAvatar(name){
    let colours = [
            "#DB2940", "#BD287F", "#98085C", "#760397",
            "#C7650E", "#089836", "#16A085", "#1188A1",
            "#085898", "#390898", "#3498DB", "#431ED9",
            "#1abc9c", "#2ecc71", "#3498db", "#9b59b6",
            "#16a085", "#27ae60", "#2980b9", "#8e44ad",
            "#f1c40f", "#e67e22", "#e74c3c", "#f39c12", "#d35400"
        ],

        nameSplit = String(name).toUpperCase().split(' '),
        initials;

    if (nameSplit.length == 1) {
        initials = nameSplit[0] ? nameSplit[0].charAt(0):'?';
    } else {
        initials = nameSplit[0].charAt(0) + nameSplit[1].charAt(0);
    }
    
    let charIndex = (initials == '?' ? 72 : initials.charCodeAt(0)) - 64;
    let colourIndex = charIndex % 20;

    return (
        <Avatar
            small
            rounded
            overlayContainerStyle={{backgroundColor: colours[colourIndex - 1]}}
            title={initials}
            activeOpacity={0.7}
        />
    );
}
