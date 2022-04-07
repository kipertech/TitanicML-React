import React, { useState, useEffect } from 'react';
import * as dfd from 'danfojs';

import { Text, View } from "./components";
import { CodeBlock, dracula } from "react-code-blocks";

const GLOBAL = require('./configs/config_global');

export default function SurvivedDistribution(props)
{
    const { df } = props;

    const [totalDF, setTotalDF] = useState(null);

    useEffect(() => {
        let survivedCount = df['Survived'].values.filter((item) => Number(item) === 1).length,
            notSurvivedCount = df.shape[0] - 1 - survivedCount;

        // Plot Pie Chart
        let pieDF = new dfd.DataFrame({
            Survived: [survivedCount, notSurvivedCount],
            Type: ['Yes', 'No']
        });

        pieDF.plot('divSurvivalDistributionPie').pie({
            config: { labels: 'Type' },
            layout: {
                width: 400,
                height: 600,
                margin: { "t": 0, "b": 0, "l": 0, "r": 0 }
            }
        });

        // Plot additional Bar Chart for count
        let barDF = new dfd.DataFrame([[survivedCount], [notSurvivedCount]], { index: ['Yes', 'No'], columns: ['Survived Count'] });
        barDF.plot('divSurvivalDistributionBar').bar({
            layout: {
                width: 400,
                xaxis: {
                    title: 'Survived'
                },
                yaxis: {
                    title: 'Count'
                },
                marker: {
                    color: "#fcba03"
                }
            }
        });
    }, []);

    const codeBlock =
`let survivedCount = df['Survived'].values.filter((item) => Number(item) === 1).length,
       notSurvivedCount = df.shape[0] - 1 - survivedCount;

// Plot Pie Chart
let pieDF = new dfd.DataFrame({ Survived: [survivedCount, notSurvivedCount], Type: ['Yes', 'No'] });
pieDF.plot('divSurvivalDistributionPie').pie();

// Plot additional Bar Chart for count
let barDF = new dfd.DataFrame([[survivedCount], [notSurvivedCount]], { index: ['Yes', 'No'], columns: ['Survived Count'] });
barDF.plot('divSurvivalDistributionBar').bar();
`;

    // region MAIN RENDER FUNCTION
    return(
        <View style={{ alignSelf: 'stretch', flexWrap: 'wrap' }}>
            <Text style={{ fontWeight: 'bold', fontSize: 24, marginTop: 24, color: 'blue' }}>
                Distribution of Survival
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

            {/* Plots */}
            <View style={{ flexDirection: 'row', alignSelf: 'stretch', justifyContent: 'center' }}>
                {/* Pie Chart */}
                <div id='divSurvivalDistributionPie'/>

                {/* Bar Chart */}
                <div id='divSurvivalDistributionBar' style={{ marginLeft: 32 }}/>
            </View>

            {/* Description */}
            <Text style={{ fontWeight: 'bold', fontSize: 14, marginTop: 16 }}>
                From the 2 charts above we can see that many Passenger are unable to survived since the survival count is only near 40% of the total passenger aboard the Titanic. We need to drill down more to get better insights from the dataset and see which categories (features) of the passenger are able to survive.
            </Text>

            <Text style={{ fontSize: 14, marginTop: 8, marginBottom: 32 }}>
                We can try to check the survived and dead rate by using the different features of the dataset like Fare, Ticket Class, Age, etc.
            </Text>
        </View>
    );
    // endregion
}
