const { google } = window;

const priceCenterCoordinates = '32.8797,-117.2362';
const DistanceMatrixService = new google.maps.DistanceMatrixService();

/**
 * Gets the duration of a trip on an average day from address to Price Center
 * @param address - the address to get duration (from address to Price Center)
 * @return - There are two return options:
 *           1) the duration (type google.maps.Duration has a string and number
 *           representation of the duration, where the number is in seconds), OR
 *           2) undefined if there were zero results (no route could be found to UCSD
 *           with transit options)
 * @error - throws an error if the address is not recognizable by Google
 */
const getDuration = async (
  address: string,
): Promise<google.maps.Duration | undefined> => {
  return new Promise((resolve, reject) => {
    DistanceMatrixService.getDistanceMatrix(
      {
        origins: [address],
        destinations: [priceCenterCoordinates],
        travelMode: google.maps.TravelMode.TRANSIT,
        transitOptions: {
          arrivalTime: new Date(),
          modes: [google.maps.TransitMode.BUS],
        },
        unitSystem: google.maps.UnitSystem.IMPERIAL,
      },
      (response, status) => {
        if (status === google.maps.DistanceMatrixStatus.OK) {
          // check the resulting element for success or failure
          const result = response.rows[0].elements[0];
          const Statuses = google.maps.DistanceMatrixElementStatus;
          if (result.status === Statuses.OK) {
            resolve(result.duration);
          } else if (result.status === Statuses.ZERO_RESULTS) {
            resolve(undefined);
          } else if (result.status === Statuses.NOT_FOUND) {
            reject(result.status);
          }
        } else {
          console.error(`The getDuration failed, with status: ${status}`);
          reject(status);
        }
      },
    );
  });
};

const testGetDuration = async () => {
  const tests = [
    '9775 Genesee Ave, San Diego, CA 92121',
    '4313 Cozzens Ct, San Diego, CA 92122',
    '4588 Robbins St, San Diego, CA 92122',
    '11645 Thistle Hill Pl, San Diego, CA 92130',
    '28466 Foothill Dr, Agoura Hills, CA 91301',
  ];

  tests.forEach((address) => {
    getDuration(address).then((result) => {
      console.log(`The result for the address ${address} is:`);
      console.log(result);
    });
  });
};

export { getDuration, testGetDuration };
