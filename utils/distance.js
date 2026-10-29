function haversineDistance(lat1, lon1, lat2, lon2, options = { unit: 'km' }) {
    const R = 6371; // Earth's mean radius in kilometers

    // Convert degrees to radians
    const toRad = (value) => (value * Math.PI) / 180;

    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);

    const rLat1 = toRad(lat1);
    const rLat2 = toRad(lat2);

    // Haversine formula
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(rLat1) * Math.cos(rLat2) * 
        Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in km

    // Return unit conversion if requested
    if (options.unit === 'miles') return distance * 0.621371;
    if (options.unit === 'meters') return distance * 1000;
    
    return distance;
}


module.exports = {haversineDistance};