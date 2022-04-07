import React, { useEffect } from 'react';

import { Text, View } from "./components";

const GLOBAL = require('./configs/config_global');

export default function FeatureAnalysis(props)
{
    useEffect(() => {

    }, []);

    // region MAIN RENDER FUNCTION
    return(
        <View style={{ alignSelf: 'stretch', flexWrap: 'wrap' }}>
            <Text style={{ fontWeight: 'bold', fontSize: 24, marginTop: 24, color: 'blue' }}>
                Feature Analysis
            </Text>

            <Text style={{ fontWeight: 'bold', fontSize: 14, marginTop: 24 }}>
                To be added here...
            </Text>
        </View>
    );
    // endregion
}
