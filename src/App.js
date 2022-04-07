import './App.css';

import React, { useEffect, useState } from 'react';
import {
    View,
    Text
} from './components';
import * as dfd from 'danfojs';
import DataDescription from "./section_data_description";
import MissingData from "./section_missing_values";
import SurvivedDistribution from "./section_survived_distribution";
import FeatureAnalysis from "./section_feature_analysis";
import Lottie from 'react-lottie';

import LoadingLottie from './lotties/lottie_searching.json';

const GLOBAL = require('./configs/config_global');

function App()
{
    // region Data Loading
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [df, setDF] = useState({});
    const [testDF, setTestDF] = useState({});

    useEffect(() => {
        setTimeout(() => {
            Promise.all([
                dfd.readCSV('https://storage.googleapis.com/kagglesdsdata/competitions/3136/26502/train.csv?GoogleAccessId=web-data@kaggle-161607.iam.gserviceaccount.com&Expires=1649563698&Signature=UgGDbFB6ErcTKADFFxWcvFLzzkvfYyx%2FX14YlDvZ8MfNS12s66rfHzye4%2FYbswT0r3hgsmfkfUdAKV4LIDrNhmnsT0eI8gR7l2E8q9YFl5VQFiaS9An2eSal%2BtEeT54gPtsCprl0NCsVDwA9Fs7r1Zjvdol65quyo1StXNkgVf08o7H5rWis0sfc71YqKjh8i4XfHZ1xqE%2B5KCchH8M3%2BFQeSIsNpxinVbGMw4LQ5iZ82NPlCKa5Lg5QFsuOV7AT3K0cNYwOl7G9CLmIcZ%2Fi%2BmDRbkN%2BNcIqASwjfJlZiJfH6bYWXZPk9tVfqty6RUQEFnbizcd%2BV71G9SXWHvdJ%2Bw%3D%3D&response-content-disposition=attachment%3B+filename%3Dtrain.csv'),
                dfd.readCSV('https://storage.googleapis.com/kagglesdsdata/competitions/3136/26502/test.csv?GoogleAccessId=web-data@kaggle-161607.iam.gserviceaccount.com&Expires=1649608900&Signature=oExe%2BYqUrHXtRcdQdUlMAaPuHx6I2A0mctPbtSgUuKIXrdgI0UvnJI%2BAOXh3E4Qu%2BaxbnEm7%2BCiQ5R7xNvK%2B2UeHTZPujSGT5vtiVN8xUqsVQdMHnbC5dMD8X47fohX0DPoSq9G%2FpEyT7JVUYAKh1Ytci6Fg8%2FvWj1cb6xoyUqUgDto9lR4czEM%2FyAZ4z5pLx6Y1o6V1c2c00lLdHcT6NVO1nKOn6mxFSmNQ2OCV93vV6SId6%2F60Szi6nuxSSbJhwLp65iFk1jWkZQhZHxTPnAN2%2BenxfRfrHbYV9uymjXwGZLyoaSmu3ut%2FPRkKQHh9reAcj1bdQQAfdswVx3f3xg%3D%3D&response-content-disposition=attachment%3B+filename%3Dtest.csv')
            ])
                .then((result) => {
                    setLoading(false);
                    setError('');
                    setDF(result[0]);
                    setTestDF(result[1]);
                })
                .catch((error) => {
                    setLoading(false);
                    setError(error.message);
                });
        }, 3500);
    }, []);
    // endregion

    return(
        <View style={{ flex: '1 1 auto', padding: 32, paddingBottom: 32 }}>
            {/* Title and Loading State */}
            <Text style={{ fontWeight: 'bold', fontSize: 32, marginTop: 24, marginBottom: 24, color: 'black', alignSelf: 'center' }}>
                Sunset SAS - Titanic ML Competition
            </Text>

            {/* Data Description */}
            {
                isLoading ?
                    <View style={{ flex: '1 1 auto', alignItems: 'center', justifyContent: 'center', paddingTop: 32 }}>
                        <Lottie
                            options={{
                                loop: true,
                                autoplay: true,
                                animationData: LoadingLottie,
                                rendererSettings: {
                                    preserveAspectRatio: 'xMidYMid slice'
                                }
                            }}
                            height={300}
                            width={300}
                            isStopped={false}
                        />

                        <Text style={{ fontSize: 18, color: GLOBAL.COLOR.MAIN }}>
                            Loading data from Kaggle...
                        </Text>
                    </View>
                    :
                    <View style={{ flex: '1 1 auto', width: 1000, alignSelf: 'center' }}>
                        <DataDescription df={df} testDF={testDF}/>
                        <MissingData df={df} testDF={testDF}/>
                        <SurvivedDistribution df={df} testDF={testDF}/>
                        <FeatureAnalysis df={df} testDF={testDF}/>
                    </View>
            }

            <Text style={{ fontFamily: 'monospace', fontSize: 13, lineHeight: '20px', marginTop: 100, textAlign: 'center', alignSelf: 'center' }}>
                A masterpiece by Phat Pham.{'\n'}
                Made with ♥ in 2022.
            </Text>
        </View>
    );
}

export default App;
