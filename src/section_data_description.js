import React, { useEffect } from 'react';
import { CodeBlock, dracula } from "react-code-blocks";

import { Text, View } from "./components";

const GLOBAL = require('./configs/config_global');

export default function DataDescription(props)
{
    const { df, testDF } = props;

    useEffect(() =>
    {
        const rowToTake = 2;

        const headerStyle = {
            align: 'center',
            fill: { color: ['gray'] },
            font: { size: 14, color: "white" },
            line: { color: "black", width: 1 }
        }
        const cellStyle = {
            align: ['center'],
            line: { color: "black", width: 1 }
        }

        // Train Dataset
        df.head(rowToTake).plot("div1").table({
            config: {
                tableHeaderStyle: Object.assign({}, headerStyle, { fill: { color: [GLOBAL.COLOR.BASIC.UI_BLUE, GLOBAL.COLOR.BASIC.UI_GREEN] } }),
                tableCellStyle: cellStyle
            },
            layout: {
                title: `First ${rowToTake} rows in the Titanic (Train Dataset) - Total: ${df.shape[1]} Features and ${df.shape[0] - 1} Rows`,
                color: GLOBAL.COLOR.BASIC.RED
            }
        });

        // Test Dataset
        testDF.head(rowToTake).plot('div2').table({
            config: {
                tableHeaderStyle: headerStyle,
                tableCellStyle: cellStyle
            },
            layout: {
                title: `First ${rowToTake} rows in the Titanic (Test Dataset) - Total: ${testDF.shape[1]} Features and ${testDF.shape[0] - 1} Rows`
            }
        });
    }, []);

    const codeBlock = `import * as dfd from 'danfojs';
        dfd
            .readCSV(dataPath)
            .then((result) => result.head(2).print());`
    ;

    // region MAIN RENDER FUNCTION
    return(
        <View style={{ alignSelf: 'stretch', flexWrap: 'wrap' }}>
            <Text style={{ fontWeight: 'bold', fontSize: 24, marginTop: 24, color: 'blue' }}>
                Data Description
            </Text>

            <Text style={{ fontSize: 14, marginTop: 16, marginBottom: 16, width: '100%', lineHeight: '24px' }}>
                <b>PassengerId</b>: just an index to identify each passenger.{'\n'}
                <b>Pclass</b> (Ticket Class): first (1), second (2), and third (3) class tickets were used. This is an ordinal integer feature.{'\n'}
                <b>Name</b>: the name of the passenger. The names also contain titles and some persons might share the same surname; indicating family relations.{'\n'}
                <b>Sex</b>: an indicator whether the passenger was female or male. This is a categorical text string feature.{'\n'}
                <b>Age</b>: the integer age of the passenger. There are NaN values in this column.{'\n'}
                <b>SibSp</b>: another ordinal integer feature describing the number of siblings or spouses travelling with each passenger.{'\n'}
                <b>Parch</b>: another ordinal integer features that gives the number of parents or children travelling with each passenger.{'\n'}
                <b>Ticket</b>: a character string of variable length that gives the ticket number.{'\n'}
                <b>Fare</b>: a float feature showing how much each passenger paid for their rather memorable journey.{'\n'}
                <b>Cabin</b>: the cabin number of each passenger. There are a lot of NaN in this column. This is another string feature.{'\n'}
                <b>Embarked</b>: the port of embarkation as a categorical character value.{'\n'}
            </Text>

            {/* Code Block */}
            <CodeBlock
                text={codeBlock.replace(/ {8}/g, '')}
                language={'javascript'}
                showLineNumbers={true}
                startingLineNumber={1}
                theme={dracula}
                wrapLines={true}
            />

            {/* Data Table */}
            <div id='div1'/>

            {/* Test Data Table */}
            <div id='div2'/>
        </View>
    );
    // endregion
}
