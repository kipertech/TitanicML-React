import React, { useState, useEffect } from 'react';
import * as dfd from 'danfojs';
import {
    CodeBlock,
    dracula,
    atomOneDark
} from "react-code-blocks";

import { Text, View } from "./components";

const GLOBAL = require('./configs/config_global');

export default function MissingData(props)
{
    const { df } = props;

    const [totalDF, setTotalDF] = useState([]);

    useEffect(() => {
        let rawColumns = df.ctypes.index,
            missingCountArr = rawColumns.map((colName) => df[colName].isNa().values.filter((value) => value).length);

        // Generate missing value DataFrame
        let indexArr = [],
            dataArr = [],
            totalMissingArr = [];

        missingCountArr.forEach((count, index) => {
            if (count > 1)
            {
                indexArr.push(rawColumns[index]);
                dataArr.push([((count / (df.shape[0] - 1)) * 100).toFixed(2) + '%']);
                totalMissingArr.push({
                    name: rawColumns[index],
                    count,
                    countPercentage: ((count / (df.shape[0] - 1)) * 100).toFixed(2) + '%'
                });
            }
        });

        setTotalDF(totalMissingArr);

        // Plot this one out
        let missingDF = new dfd.DataFrame(dataArr, { index: indexArr, columns: ['Percentage'] });
        missingDF.plot('divMissing').bar({
            layout: {
                title: `Missing values across Features (Train Dataset)`,
                yaxis: {
                    title: 'Percentage'
                },
                xaxis: {
                    title: 'Feature'
                }
            }
        });
    }, []);

    const codeBlock =
`let rawColumns = df.ctypes.index,
      missingCountArr = rawColumns.map((colName) => df[colName].isNa().values.filter((value) => value).length),
      indexArr = [],
      dataArr = [];

missingCountArr.forEach((count, index) => {
    if (count > 1)
    {
        indexArr.push(rawColumns[index]);
        dataArr.push([((count / (df.shape[0] - 1)) * 100).toFixed(2) + '%']);
    }
});

// Generate missing value DataFrame
let missingDF = new dfd.DataFrame(dataArr, { index: indexArr, columns: ['Percentage'] });
missingDF.plot('divMissing').bar();
`
    ;

    // region MAIN RENDER FUNCTION
    return(
        <View style={{ alignSelf: 'stretch', flexWrap: 'wrap' }}>
            <Text style={{ fontWeight: 'bold', fontSize: 24, marginTop: 24, marginBottom: 24, color: 'blue' }}>
                Identifying Missing Values
            </Text>

            {/* Code Block */}
            <View style={{ marginBottom: 24 }}>
                <CodeBlock
                    text={codeBlock}
                    language={'javascript'}
                    showLineNumbers={true}
                    startingLineNumber={1}
                    theme={dracula}
                    wrapLines={true}
                />
            </View>

            {totalDF.map((item) => (
                <Text style={{ fontSize: 14, marginTop: 4, width: '100%', lineHeight: '24px' }}>
                    <b>{item.name}</b>: {item.count} ({item.countPercentage})
                </Text>
            ))}

            {/* Missing Chart */}
            <div id='divMissing'/>

            {/* Description */}
            <Text style={{ fontWeight: 'bold', fontSize: 14, marginTop: 16 }}>
                We can see that nearly 80% of the Cabin values are missing, thus it is safe to say that we can remove this feature from our model since it would not make a large impact.
            </Text>

            <Text style={{ fontSize: 14, marginTop: 8, marginBottom: 32 }}>
                Age on the other hand, takes up only about 20%, we can fill in the missing values with something so that we can continue our calculation with this feature in our model.
            </Text>
        </View>
    );
    // endregion
}
