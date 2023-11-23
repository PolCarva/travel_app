export const calculateDistance = (locationA, locationB) => {
  const lat1 = locationA.latitude;
  const lng1 = locationA.longitude;
  const lat2 = locationB.lat;
  const lng2 = locationB.lng;

  // Fórmula de la distancia euclidiana entre dos puntos en un plano
  const distance = Math.sqrt(
    Math.pow(lat2 - lat1, 2) + Math.pow(lng2 - lng1, 2)
  );

  return distance;
};

export const getDistance = async (origin, destination) => {
  return new Promise((resolve, reject) => {
    const directionsService = new google.maps.DirectionsService();
    directionsService.route(
      {
        origin: origin,
        destination: destination,
        travelMode: google.maps.TravelMode.WALKING,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          const walkingTime = result.routes[0].legs[0].duration.text;
          resolve(walkingTime);
        } else {
          resolve("No Data Found");
        }
      }
    );
  });
};

export const shuffleArray = (array) => {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}