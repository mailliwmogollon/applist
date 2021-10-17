export const parseData = (querySnapshot) =>
  querySnapshot.docs.reduce((acc, doc) => {
    const { productName, userToken, timeFrame, lastPurchaseDate } = doc.data();
    return [
      ...acc,
      { id: doc.id, productName, userToken, timeFrame, lastPurchaseDate },
    ];
  }, []);
