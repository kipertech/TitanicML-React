import React, { useEffect } from 'react';
import * as dfd from 'danfojs';

import { Text, View } from "./components";
import { CodeBlock, dracula } from "react-code-blocks";

const GLOBAL = require('./configs/config_global');

export default function FeatureAnalysis(props)
{
    useEffect(() =>
    {
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

        // Fill missing values for "Age"
        const ageMedian = df['Age'].median();

        // Create groups of Age
        // 0-12 -> Children; 13-20 -> Teenager; 21-40 -> Adult; 41+ -> Elder
        let ageGroupArr = df['Age'].values.map((age) => {
            let cAge = age;
            if (!cAge) cAge = ageMedian;

            if (cAge <= 12) return('Children');
            else if (cAge > 12 && cAge <= 20) return('Teenager');
            else if (cAge > 20 && cAge <= 40) return('Adult');
            else return('Elder');
        });

        ageGroupArr.pop();
        let newSurvivedArr = df['Survived'].values.slice(0);
        newSurvivedArr.pop();

        let ageGroupDF = new dfd.DataFrame({ 'AgeGroup': ageGroupArr, 'Survived': newSurvivedArr }),
            ageIndex = ageGroupDF['AgeGroup'].valueCounts().index,
            ageGroupCountArr = ageGroupDF['AgeGroup'].valueCounts().values,
            ageGroupSurvivalCountArr = ageGroupDF.groupby(['AgeGroup']).sum()['Survived_sum'].values;

        // Change the order to Children - Teenager - Adult - Elder
        let newAgeIndex = [ageIndex[2], ageIndex[3], ageIndex[0], ageIndex[1]],
            newAgeGroupCountArr = [ageGroupCountArr[2], ageGroupCountArr[3], ageGroupCountArr[0], ageGroupCountArr[1]],
            newAgeGroupSurvivalCountArr = [ageGroupSurvivalCountArr[2], ageGroupSurvivalCountArr[3], ageGroupSurvivalCountArr[0], ageGroupSurvivalCountArr[1]];

        // Create new DataFrame for plotting the lines
        let lineDF = new dfd.DataFrame({
            'Survived': newAgeGroupSurvivalCountArr,
            'Died': newAgeGroupSurvivalCountArr.map((item, index) => newAgeGroupCountArr[index] - item)
        }, { index: newAgeIndex });

        // Plot the line chart
        lineDF.plot('divSexSurvivedLine').line();
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

    const codeBlock3 =
`// Fill missing values for "Age"
const ageMedian = df['Age'].median();

// Create groups of Age
// 0-12 -> Children; 13-20 -> Teenager; 21-40 -> Adult; 41+ -> Elder
ageGroupArr = df['Age'].values.map((age) => {
    let cAge = age;
    if (!cAge) cAge = ageMedian;

    if (cAge <= 12) return('Children');
    else if (cAge > 12 && cAge <= 20) return('Teenager');
    else if (cAge > 20 && cAge <= 40) return('Adult');
    else return('Elder');
});
`;

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

            {/* Description */}
            <Text style={{ fontWeight: 'bold', fontSize: 14, marginTop: 16 }}>
                This chart looks cook but seems like very hard to interpret at the same time...
            </Text>

            <Text style={{ fontSize: 14, marginTop: 8, marginBottom: 32 }}>
                We should try to put the ages into smaller number of groups and plot the chart again (in a different form of chart).
            </Text>

            {/* Code Block 3 */}
            <View style={{ marginBottom: 24, marginTop: 24 }}>
                <CodeBlock
                    text={codeBlock3}
                    language={'javascript'}
                    showLineNumbers={true}
                    startingLineNumber={1}
                    theme={dracula}
                    wrapLines={true}
                />
            </View>

            <View id={'divSexSurvivedLine'}/>

            {/* Description */}
            <Text style={{ fontWeight: 'bold', fontSize: 14, marginTop: 16 }}>
                From the above chart, we can see that the Adult group has the highest chance of survival
            </Text>

            <Text style={{ fontSize: 14, marginTop: 8, marginBottom: 32 }}>
                But they also have the highest number of dead...?
            </Text>

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
