import React, { useEffect } from 'react';
import * as dfd from 'danfojs';

import { Text, View } from "./components";
import { CodeBlock, dracula } from "react-code-blocks";

const GLOBAL = require('./configs/config_global');

export default function FeatureAnalysis(props)
{
    useEffect(() => {
        const { df } = props;

        // Age vs. Survival Rate
        df.plot('divAgeSurvivedScatter').violin({
            config: { x: 'Survived', y: 'Age' }, layout: { title: 'Age vs. Survival Count' }
        });

        // Sex vs. Survival Rate
        let sexArr = df['Sex'].values, survivedArr = df['Survived'].values, data = [],
            sexCountArr = df['Sex'].valueCounts().values.filter((item) => item > 1);

        sexArr.forEach((item, index) => item && data.push([item, survivedArr[index]]));

        let groupedDF = new dfd.DataFrame(data, { columns: ['Sex', 'Survived'] }).groupby(['Sex']).sum();
        groupedDF = groupedDF.addColumn('Total', sexCountArr);

        let maleSurvived = groupedDF['Survived_sum'].values[0],
            femaleSurvived = groupedDF['Survived_sum'].values[1];

        // Plot the chart
        new dfd.DataFrame(
            { 'Yes': [maleSurvived, femaleSurvived], 'No': [sexCountArr[0] - maleSurvived, sexCountArr[1] - femaleSurvived] },
            { index: ['Male', 'Female'] }
        ).plot("divSexSurvivedBar").bar({ layout: { title: 'Sex vs. Survival Count' } });
    }, []);

    const codeBlock =
`df.plot('divAgeSurvivedScatter').violin({
    config: { x: 'Survived', y: 'Age' }, layout: { title: 'Age vs. Survival Count' }
});`
    ;

    const codeBlock2 =
`let sexArr = df['Sex'].values, survivedArr = df['Survived'].values, data = [],
       sexCountArr = df['Sex'].valueCounts().values.filter((item) => item > 1);

sexArr.forEach((item, index) => item && data.push([item, survivedArr[index]]));

let groupedDF = new dfd.DataFrame(data, { columns: ['Sex', 'Survived'] }).groupby(['Sex']).sum();
groupedDF = groupedDF.addColumn('Total', sexCountArr);

let maleSurvived = groupedDF['Survived_sum'].values[0],
      femaleSurvived = groupedDF['Survived_sum'].values[1];

// Plot the chart
new dfd.DataFrame(
    { 'Yes': [maleSurvived, femaleSurvived], 'No': [sexCountArr[0] - maleSurvived, sexCountArr[1] - femaleSurvived] },
    { index: ['Male', 'Female'] }
).plot("divSexSurvivedBar").bar({ layout: { title: 'Sex vs. Survival Count' } });`
    ;

    // region MAIN RENDER FUNCTION
    return(
        <View style={{ alignSelf: 'stretch', flexWrap: 'wrap' }}>
            <Text style={{ fontWeight: 'bold', fontSize: 24, marginTop: 24, color: 'blue' }}>
                Feature Analysis
            </Text>

            {/* Code Block */}
            <View style={{ marginBottom: 24, marginTop: 24 }}>
                <CodeBlock
                    text={codeBlock}
                    language={'javascript'}
                    showLineNumbers={true}
                    startingLineNumber={1}
                    theme={dracula}
                    wrapLines={true}
                />
            </View>

            <View id={'divAgeSurvivedScatter'}/>

            {/* Code Block 2 */}
            <View style={{ marginBottom: 24, marginTop: 24 }}>
                <CodeBlock
                    text={codeBlock2}
                    language={'javascript'}
                    showLineNumbers={true}
                    startingLineNumber={1}
                    theme={dracula}
                    wrapLines={true}
                />
            </View>

            <View id={'divSexSurvivedBar'}/>

            {/* Description */}
            <Text style={{ fontWeight: 'bold', fontSize: 14, marginTop: 16 }}>
                We can see one clear thing is that female has much higher chance of surviving.
            </Text>

            <Text style={{ fontSize: 14, marginTop: 8, marginBottom: 32 }}>
                We already saw this in the movie as women and children are prioritized to get to lifeboats.
            </Text>
        </View>
    );
    // endregion
}
