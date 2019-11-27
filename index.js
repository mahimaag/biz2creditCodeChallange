const customers = require('./Customer.json');

/**
 * @param object, Latitude and longitude of customer
 * @param object Latitude and longitude of Destination point(in this case Dublin)
 * @returns distance between the specified points in number
 */
function distance(checkPoint, centerPoint) {
    var ky = 40000 / 360;
    var kx = Math.cos(Math.PI * centerPoint.latitude / 180.0) * ky;
    var dx = Math.abs(centerPoint.longitude - checkPoint.longitude) * kx;
    var dy = Math.abs(centerPoint.latitude - checkPoint.latitude) * ky;
    return Math.sqrt(dx * dx + dy * dy);
}

//This function will calculate the distance between customer and dublin one by one and will return customer's name and UserID
function findCustomersInRange(destinationPoints, desiredDistanceInKm) {
    const matchedCustomer = customers.map(customer => {
        const { name, user_id: userID } = customer;
        if (distance(customer, destinationPoints) <= desiredDistanceInKm) {
            return {
                name,
                userID,
            };
        }
    }).filter(item => item!== undefined).sort((a, b) => a.userID - b.userID);
    return matchedCustomer
}

const dublinPoints = { latitude: 53.339428, longitude: -6.257664 };
const customerInDesiredDistance = findCustomersInRange(dublinPoints, 100);
console.log('customer to send order in 100 km range from Dublin', customerInDesiredDistance);