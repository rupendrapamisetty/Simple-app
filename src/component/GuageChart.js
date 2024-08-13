import React, { useEffect, useRef, useState } from 'react';
import ml5 from 'ml5';
import TeachableMachine from './TeachableMachine';
import { useInterval } from '../util';

let classifier;

const GaugeChart = () => {
  const videoRef = useRef();

  const [gaugeData, setGaugeData] = useState([0.5, 0.5]);
  const [shouldClassify, setShouldClassify] = useState(false);

  useEffect(() => {
    const loadClassifier = async () => {
      try {
        classifier = await ml5.imageClassifier('./my-model/model.json');
        // console.log('Model Loaded!');
        // console.log("classifier",classifier);
        
        navigator.mediaDevices
          .getUserMedia({ video: true, audio: false })
          .then(stream => {
            videoRef.current.srcObject = stream;
            videoRef.current.play();
          })
          .catch(err => console.error('Error accessing webcam:', err));
      } catch (error) {
        // console.error('Error loading model:', error);
      }
    };

    loadClassifier();
  }, []);

  useInterval(() => {
    if (classifier && shouldClassify && videoRef.current) {
      classifier.classify(videoRef.current, (error, results) => {
        if (error) {
          // console.error('Error during classification:', error);
          return;
        }
        // console.log('Classification results:', results);
        results.sort((a, b) => b.label.localeCompare(a.label));
        setGaugeData(results.map(entry => entry.confidence));
      });
    }
  }, 500);

  return (
    <React.Fragment>
      <h1>
        Is Roopa there? <br />
        <small>
          [{gaugeData[0].toFixed(2)}, {gaugeData[1].toFixed(2)}]
        </small>
      </h1>
      <TeachableMachine data={gaugeData} />
      <button onClick={() => setShouldClassify(!shouldClassify)}>
        {shouldClassify ? 'Stop classifying' : 'Start classifying'}
      </button>
      <video
        ref={videoRef}
        style={{ transform: 'scale(-1, 1)' }}
        width='300'
        height='150'
      />
    </React.Fragment>
  );
};

export default GaugeChart;
