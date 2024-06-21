import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  InterstitialAd,
  TestIds,
} from '@react-native-admob/admob';
const AdContext = createContext();

export const AdProvider = ({ children }) => {

  const [adLoaded, setAdLoaded] = useState(false);
  const [interstitialAd, setInterstitialAd] = useState(null);
  const interstitial = InterstitialAd.createAd(TestIds.INTERSTITIAL);

  useEffect(() => {
    setInterstitialAd(interstitial);

    const subscriptions = [
      interstitial.addEventListener('adLoaded', () => {
        setAdLoaded(true);
        console.log(`ad loaded`)
      }),
    ];

    return () => subscriptions.forEach(sub => sub.remove());
  }, []);


  const openAd = () => {
    if (adLoaded) {
      interstitialAd?.show();
      setInterstitialAd(interstitial);
      return
    } else {
      console.log('Not adLoaded');
      return
    }
  };

  return (
    <AdContext.Provider value={{ openAd }}>
      {children}
    </AdContext.Provider>
  );
};

export const useModal = () => {
  return useContext(AdContext);
};